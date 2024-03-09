import Logo from '@/components/layout/components/Logo';
import Notification from '@/components/layout/components/Notification';
import Authentication from '@/components/layout/components/Authentication';
import DropdownMenu from '@/components/layout/components/DropdownMenu';
import { useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { firstCharsOfString } from '@/lib/helpers/commonHelpers';
import Logout from './components/Logout';

const Header = () => {
  const authUser = useSelector((state) => state?.auth?.authUser);

  return (
    <div className="flex-between h-12 w-full px-4">
      <div className="flex-start">
        <Logo />
      </div>

      <div className="flex-end gap-6">
        {/* auth user details */}
        {authUser?._id && (
          <div className="flex-start gap-2">
            <Avatar className="h-10 w-10 rounded-full">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt={authUser?.name}
                className="rounded-full"
              />
              <AvatarFallback className="flex-center h-full w-full rounded-full bg-primary font-bold text-primary-foreground">
                {firstCharsOfString(authUser?.name || authUser?.email)}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col justify-center gap-0 text-sm">
              <span className="font-bold text-primary">{authUser?.name}</span>
              <span className="text-xs text-muted-foreground">
                {authUser?.email}
              </span>
            </div>
          </div>
        )}

        {/* love icon */}
        <a href="#">
          <svg
            width="20"
            height="20"
            viewBox="3 3 18 18"
            className="text-secondary"
          >
            <path
              fill="currentColor"
              d="M20.808 11.079C19.829 16.132 12 20.5 12 20.5s-7.829-4.368-8.808-9.421C2.227 6.1 5.066 3.5 8 3.5a4.444 4.444 0 0 1 4 2 4.444 4.444 0 0 1 4-2c2.934 0 5.773 2.6 4.808 7.579z"
            ></path>
          </svg>
        </a>

        <Notification />

        {authUser?._id ? <Logout /> : <Authentication />}

        <DropdownMenu />
      </div>
    </div>
  );
};

export default Header;
