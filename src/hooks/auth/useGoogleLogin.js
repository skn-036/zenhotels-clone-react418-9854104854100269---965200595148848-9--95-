import { openNewWindow } from '@/lib/helpers/windowHelpers';
import useHttpRequest from '@/hooks/http/useHttpRequest';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';

const useGoogleLogin = () => {
  const dispatch = useDispatch();
  const { getData: getOauthUrlRequest } = useHttpRequest(
    '/v1/user/auth/google/get-auth-url'
  );
  const { getData: googleLoginOrSignupRequest } = useHttpRequest(
    '/v1/user/auth/google/login-from-code'
  );

  const loginEventProcessing = useRef(false);
  const eventSucceeded = useRef(false);

  const openGoogleOauthWindow = async () => {
    const response = await getOauthUrlRequest();
    eventSucceeded.current = false;

    return new Promise((resolve) => {
      if (!response?.url)
        return resolve({
          error: true,
          message: 'Failed to get google auth url. Please try again later.'
        });

      openNewWindow(response.url, 520, 580, (closed) => {
        if (!eventSucceeded.current && closed) {
          setTimeout(() => {
            resolve(null);
            removeLoginCallbackListener(resolve);
            loginEventProcessing.current = false;
          }, 200);
        }
      });
      addLoginCallbackListener(resolve);
    });
  };

  const onOauthRedirectSuccess = async (event, resolve) => {
    if (loginEventProcessing.current) return;
    const { data } = event;

    if (data?.type !== 'google-auth-redirect') return;

    eventSucceeded.current = true;
    if (data?.error) {
      removeLoginCallbackListener(resolve);
      return resolve({
        error: true,
        message: 'Failed to process login. Please try again later.'
      });
    }

    loginEventProcessing.current = true;
    removeLoginCallbackListener(resolve);

    if (!data?.query?.code) {
      removeLoginCallbackListener(resolve);
      return resolve({
        error: true,
        message: 'Failed to get auth code. Please try again later.'
      });
    }
    const response = await googleLoginOrSignupRequest({
      query: { code: data?.query?.code }
    });

    if (response?.access_token) {
      dispatch({ type: 'auth/setAccessToken', payload: response.access_token });
      dispatch({ type: 'auth/setAuthUser', payload: response?.data });
    }
    loginEventProcessing.current = false;
    return resolve(response);
  };

  const addLoginCallbackListener = (resolve) => {
    window.addEventListener(
      'message',
      (event) => onOauthRedirectSuccess(event, resolve),
      false
    );
  };

  const removeLoginCallbackListener = (resolve) => {
    window.removeEventListener(
      'message',
      (event) => onOauthRedirectSuccess(event, resolve),
      false
    );
  };

  return { openGoogleOauthWindow };
};

export default useGoogleLogin;
