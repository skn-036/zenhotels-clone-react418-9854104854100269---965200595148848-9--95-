import { ValidatePaymentMethodContext } from '@/context/payment/validate-payment-method';
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import TapCard from './TapCard';
import { toast } from 'react-toastify';
import useHttpRequest from '@/hooks/http/useHttpRequest';

const PaymentGatewayProvider = ({ children }) => {
  const authUser = useSelector((state) => state?.auth?.authUser);
  const { getData: getPaymentInfoRequest } = useHttpRequest(
    '/v1/user/auth/payment'
  );
  const { saveData: createPaymentCustomerRequest } = useHttpRequest(
    '/v1/user/auth/payment/customer'
  );

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const paymentResolve = useRef(null);
  const customer = useRef(null);

  const isPaymentMethodVerified = async () => {
    if (!authUser?._id) {
      toast.error('Please login first');
      return false;
    }
    setLoading(() => true);

    const userPayment = await getPaymentInfoRequest({ hideToast: true });
    let paymentCustomer = userPayment?.customer;
    if (!paymentCustomer) {
      paymentCustomer = await createPaymentCustomerRequest();
    }
    if (!paymentCustomer) {
      toast.error('Failed to generate payment customer. Please try again later');
      setLoading(() => false);
      return false;
    }

    // user already has a payment method
    if (userPayment?.defaultCard?.id) {
      setLoading(() => false)
      return true;
    }

    customer.current = paymentCustomer;

    return new Promise((resolve) => {
      setShowModal(() => true);
      paymentResolve.current = resolve;
    });
  };

  const tapCardProps = {
    showModal,
    setShowModal,
    paymentResolve,
    setLoading,
    customer
  };

  return (
    <ValidatePaymentMethodContext.Provider
      value={{ isPaymentMethodVerified, loading }}
    >
      {children}
      <TapCard {...tapCardProps} />
    </ValidatePaymentMethodContext.Provider>
  );
};

export default PaymentGatewayProvider;
