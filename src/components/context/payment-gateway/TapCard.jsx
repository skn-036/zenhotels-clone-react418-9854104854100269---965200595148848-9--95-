import { useEffect, useState, useRef } from 'react';
import { LoadingButton } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';

import Spinner from '@/components/ui/custom/spinner/Spinner';
import { makeDelay } from '@/lib/helpers/commonHelpers';
import useHttpRequest from '@/hooks/http/useHttpRequest';
import { toast } from 'react-toastify';

const { renderTapCard, Theme, Direction, Edges, Locale, tokenize } =
  window.CardSDK;

const initializeTapCard = (customer, setCardLoading, onSuccess) => {
  const { unmount } = renderTapCard('tap-card', {
    publicKey: import.meta.env.VITE_TAP_PUBLIC_KEY,
    transaction: {
      amount: 1,
      currency: 'AED',
    },
    acceptance: {
      supportedBrands: ['AMERICAN_EXPRESS', 'VISA', 'MASTERCARD', 'MADA'],
      supportedCards: 'ALL' //To accept both Debit and Credit
    },
    customer: {
      id: customer?.id
    },
    fields: {
      cardHolder: true
    },
    addons: {
      displayPaymentBrands: true,
      loader: true,
      saveCard: true
    },
    interface: {
      locale: Locale.EN,
      theme: Theme.LIGHT,
      edges: Edges.CURVED,
      direction: Direction.LTR
    },
    onSuccess,
    onReady: () => {
      setCardLoading(() => false);
    }
  });

  return unmount;
};

const TapCard = ({
  showModal,
  setShowModal,
  paymentResolve,
  setLoading,
  customer
}) => {
  const { saveData: verifyCardRequest } = useHttpRequest(
    '/v1/user/auth/payment/verify-card'
  );

  const unmount = useRef(null);

  const [cardLoading, setCardLoading] = useState(false);
  const [verifyingCard, setVerifyingCard] = useState(false);

  useEffect(() => {
    if (!showModal) {
      if (unmount.current) {
        unmount.current();
        unmount.current = null;
      }
      return;
    }

    const initializeTap = async () => {
      setCardLoading(() => true);

      // delay to make the dom load first
      await makeDelay(500);

      unmount.current = initializeTapCard(
        customer.current,
        setCardLoading,
        async (token) => {
          setVerifyingCard(() => true);

          const verification = await verifyCardRequest({ token, customer: customer.current });
          setVerifyingCard(() => false);

          // card successfully verified
          if (verification?.id && verification?.status === 'VALID') {
            toast.success('Card verified successfully');
            if (paymentResolve.current) {
              paymentResolve.current(true);
              paymentResolve.current = null;
            }
            setShowModal(() => false);
            setLoading(() => false);
          }
        }
      );
    };

    initializeTap();

    return () => {
      if (unmount.current) {
        unmount.current();
        unmount.current = null;
      }
    };
  }, [showModal]);

  const onOpenChange = (open) => {
    if (!open) {
      if (paymentResolve.current) {
        paymentResolve.current(false);
        paymentResolve.current = null;
      }
      setShowModal(() => false);
      setLoading(() => false);
    }
  };
  return (
    <Dialog
      open={showModal}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="w-[420px] max-w-full">
        <DialogHeader>
          <DialogTitle>Add your visa card</DialogTitle>
          <DialogDescription>
            During payment confirmation, it may charge AED 1 to confirm the
            card. It will be refunded instantly.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="w-full">
            {cardLoading && (
              <div className="flex w-full flex-col items-center justify-center gap-2">
                <span>Loading payment gateway...</span>
                <Spinner />
              </div>
            )}

            {/* tap card will be mounted here */}
            <div
              id="tap-card"
              className={cardLoading ? '!h-px' : ''}
            ></div>
          </div>
        </div>

        <DialogFooter>
          <LoadingButton
            loading={verifyingCard}
            className="w-full"
            onClick={() => tokenize()}
          >
            {verifyingCard ? 'Verifying card' : 'Add your card'}
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TapCard;
