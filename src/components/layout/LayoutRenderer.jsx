import { useState, useEffect } from 'react';
import { redirect, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import routes from '@/router/routes';
import AppLayoutRenderer from './AppLayoutRenderer';
import FullLayoutRenderer from './FullLayoutRenderer';
import useLoadInitialAppData from '@/hooks/utils/useLoadInitialAppData';
import useHttpRequest from '@/hooks/http/useHttpRequest';
import { setAuthUser } from '@/store/reducers/auth';

const LayoutRenderer = () => {
  const dispatch = useDispatch();
  const { getData: getAuthUserRequest } = useHttpRequest('/v1/user/auth/user');

  const location = useLocation();
  const [layout, setLayout] = useState('app');

  // load initial Data to load of the app;
  useLoadInitialAppData();

  useEffect(() => {
    const resolveLayout = () => {
      const route = routes.find((route) => route.path === location.pathname);
      if (!route) return 'app';
      return route?.layout || 'app';
    };
    setLayout(resolveLayout());
  }, [location.pathname]);

  useEffect(() => {
    const getAuthUser = async () => {
      const route = routes.find((route) => route.path === location.pathname);
      const user = await getAuthUserRequest({ hideToast: true });

      dispatch(setAuthUser(user ? user : null));

      if (user) {
        if (route?.redirectIfLoggedIn) redirect('/');
      } else {
        if (route?.requireAuth) redirect('/login');
      }
    };
    getAuthUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return layout === 'full' ? (
    <>
      <FullLayoutRenderer />
    </>
  ) : (
    <>
      <AppLayoutRenderer />
    </>
  );
};

export default LayoutRenderer;
