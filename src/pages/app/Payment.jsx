import { Button } from '@/components/ui/Button';
import { useEffect } from 'react';

const initializeTap = () => {
  const { renderTapCard, Theme, Currencies, Direction, Edges, Locale } =
    window.CardSDK;
  const { unmount } = renderTapCard('tap-card', {
    publicKey: import.meta.env.VITE_TAP_PUBLIC_KEY,
    transaction: {
      // amount: 1,
      currency: Currencies.AED
    },
    acceptance: {
      supportedBrands: ['AMERICAN_EXPRESS', 'VISA', 'MASTERCARD', 'MADA'], //Remove the ones that are NOT enabled on your Tap account
      supportedCards: 'ALL' //To accept both Debit and Credit
    },
    fields: {
      cardHolder: true
    },
    addons: {
      displayPaymentBrands: true,
      loader: true,
      saveCard: false
    },
    interface: {
      locale: Locale.EN,
      theme: Theme.LIGHT,
      edges: Edges.CURVED,
      direction: Direction.LTR
    },
    onSuccess: (response) => {
      console.log('Success', response);
    },
    onValidInput: (data) => {
      console.log('Valid Input', data);
    }
  });
  return unmount;
};
const Payment = () => {
  useEffect(() => {
    const unmount = initializeTap();
    return () => {
      unmount();
    };
  }, []);
  return (
    <div className="flex h-[calc(100vh-48px)] w-full flex-col items-center justify-center gap-3">
      <div id="tap-card"></div>
      <Button onClick={() => window.CardSDK.tokenize()}>Pay now</Button>
    </div>
  );
};

export default Payment;
