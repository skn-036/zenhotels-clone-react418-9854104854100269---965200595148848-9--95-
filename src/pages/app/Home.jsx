import { Banner } from '@/components/pages/home/Banner';
import { LoadingButton } from '@/components/ui/Button';
import { useValidatePaymentMethod } from '@/context/payment/validate-payment-method';

const Home = () => {
  const { isPaymentMethodVerified, loading } = useValidatePaymentMethod();

  const onVerifyPaymentMethod = async () => {
    const verified = await isPaymentMethodVerified();
    console.log('Payment method verified:', verified);
    return verified;
  };
  return (
    <div className="w-full">
      <Banner />

      <div className="w-full my-4">
        <LoadingButton loading={loading} onClick={() => onVerifyPaymentMethod()}>
          {loading ? 'Verifying...' : 'Verify Payment Method'}
        </LoadingButton>
      </div>

      <div className="h-[1200px]">4508750015741019</div>
    </div>
  );
};

export default Home;
