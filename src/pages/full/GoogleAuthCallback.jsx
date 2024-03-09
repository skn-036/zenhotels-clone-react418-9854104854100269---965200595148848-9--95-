import Spinner from '@/components/ui/custom/spinner/Spinner';
import useRouteQuery from '@/hooks/router/useRouteQuery';
import { useEffect } from 'react';
const GoogleAuthCallback = () => {
  const query = useRouteQuery();

  const onRedirectToParent = () => {
    redirectToParent(null, query ? query : {});
  };

  const redirectToParent = (error, query) => {
    window.opener.postMessage(
      { type: 'google-auth-redirect', error, query },
      '*'
    );
    window.close();
  };

  useEffect(() => {
    onRedirectToParent();
  }, []);
  return (
    <div className="w-full h-screen flex-center">
      <Spinner />
    </div>
  );
};

export default GoogleAuthCallback;
