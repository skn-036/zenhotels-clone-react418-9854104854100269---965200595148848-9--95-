import { useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/components/ui/popover';
import { HiChevronDown } from 'react-icons/hi';
import Login from './Login';
import Signup from './Signup';
import ForgetPassword from './ForgetPassword';
import useGoogleLogin from '@/hooks/auth/useGoogleLogin';
import { toast } from 'react-toastify';

import { cn } from '@/lib/utils';

const Authentication = () => {
  const { openGoogleOauthWindow } = useGoogleLogin();

  const [open, setOpen] = useState(undefined);
  const [tab, setTab] = useState('login');

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  });

  const [signupFormData, setSignupFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const onTabChange = (newTab) => () => {
    if (newTab === tab) return;
    setTab(newTab);
  };

  const onGoogleLoginOrSignup = async () => {
    setOpen(true);
    const response = await openGoogleOauthWindow();

    if (response?.error && response?.message) {
      toast.error(response?.message);
    }
    setOpen(undefined);
  };

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger className="group">
        <div className="flex-start gap-2 text-secondary group">
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

          <span>Log in</span>

          <HiChevronDown
            size={20}
            className="group-data-[state=open]:rotate-180 transition duration-300"
          />
        </div>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-[380px] space-y-4"
      >
        {/* header */}
        {['login', 'sign-up'].includes(tab) && (
          <div className="flex-start gap-2">
            <span
              className={cn(
                '',
                tab !== 'login' ? 'text-link cursor-pointer' : ''
              )}
              onClick={onTabChange('login')}
            >
              Login
            </span>
            <span className="text-muted-foreground">or</span>
            <span
              className={cn(
                '',
                tab !== 'sign-up' ? 'text-link cursor-pointer' : ''
              )}
              onClick={onTabChange('sign-up')}
            >
              Sign up
            </span>
          </div>
        )}

        {/* content */}
        {tab === 'login' && (
          <Login
            formData={loginFormData}
            setFormData={setLoginFormData}
            setOpen={setOpen}
          />
        )}
        {tab === 'sign-up' && (
          <Signup
            formData={signupFormData}
            setFormData={setSignupFormData}
            setOpen={setOpen}
          />
        )}
        {tab === 'forget-password' && <ForgetPassword />}

        {['login', 'sign-up'].includes(tab) && (
          <div className="flex-between px-12">
            {/* facebook */}
            <span className="cursor-pointer">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <rect
                  width="40"
                  height="40"
                  fill="#1877F2"
                  rx="8"
                ></rect>
                <path
                  fill="#fff"
                  fillRule="evenodd"
                  d="M23.974 40V24.498h4.438L29 19.156h-5.026l.008-2.674c0-1.393.137-2.14 2.212-2.14h2.775V9H24.53c-5.33 0-7.207 2.591-7.207 6.95v3.207H14v5.342h3.323V40h6.651Z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>

            {/* google */}
            <span
              className="cursor-pointer"
              onClick={onGoogleLoginOrSignup}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <rect
                  width="39"
                  height="39"
                  x=".5"
                  y=".5"
                  fill="#fff"
                  stroke="#E5E5E5"
                  rx="7.5"
                ></rect>
                <path
                  fill="#4285F4"
                  d="M32.256 20.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82Z"
                ></path>
                <path
                  fill="#34A853"
                  d="M20.766 32c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09c1.97 3.92 6.02 6.62 10.71 6.62Z"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M14.036 22.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29v-3.09h-3.98a11.86 11.86 0 0 0 0 10.76l3.98-3.09Z"
                ></path>
                <path
                  fill="#EA4335"
                  d="M20.766 12.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C26.716 9.19 24.006 8 20.766 8c-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96Z"
                ></path>
              </svg>
            </span>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Authentication;
