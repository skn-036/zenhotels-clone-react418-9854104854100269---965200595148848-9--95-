import useHttpRequest from '@/hooks/http/useHttpRequest';
import { setAccessToken, setAuthUser } from '@/store/reducers/auth';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const Logout = () => {
  const dispatch = useDispatch();
  const { getData: logoutRequest } = useHttpRequest('/v1/user/auth/logout');

  const onLogout = async () => {
    await logoutRequest({
      hideToast: true,
      callback: (error, response) => {
        if (error || response?.status !== 204)
          return toast.error('Failed to logout');

        dispatch(setAccessToken(null));
        dispatch(setAuthUser(null));
      }
    });
  };

  return (
    <div
      className="flex-start gap-2 text-secondary cursor-pointer"
      onClick={onLogout}
    >
      <svg
        width="24"
        height="24"
      >
        <g fill="none">
          <ellipse
            fill="rgba(3, 71, 98, 0.4)"
            cx="12"
            cy="12"
            rx="12"
            ry="12"
          ></ellipse>
          <path
            fill="#034762"
            d="M12 4.8c3.221 0 5.833 2.686 5.833 6a6.064 6.064 0 0 1-1.865 4.398c2.17.912 3.977 2.549 5.136 4.619A11.968 11.968 0 0 1 12 24a11.973 11.973 0 0 1-9.105-4.183c1.16-2.07 2.967-3.707 5.137-4.62A6.064 6.064 0 0 1 6.166 10.8c0-3.314 2.612-6 5.834-6z"
          ></path>
        </g>
      </svg>

      <span>Log out</span>
    </div>
  );
};

export default Logout;
