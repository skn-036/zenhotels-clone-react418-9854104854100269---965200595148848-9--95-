import { useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/components/ui/popover';

const Notification = () => {
  const [nofifications] = useState([]);

  return (
    <Popover>
      <PopoverTrigger>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <path
            fill="#034762"
            d="M18.6595 14.3544C18.7134 14.4099 18.7652 14.4632 18.8143 14.5148C19.0598 14.7728 19.1687 15.0821 19.1666 15.3846C19.1625 16.0417 18.6355 16.6667 17.853 16.6667H12.3578C12.4499 16.9273 12.5 17.2078 12.5 17.5C12.5 18.8807 11.3807 20 10 20C8.6193 20 7.50001 18.8807 7.50001 17.5C7.50001 17.2078 7.55014 16.9273 7.64227 16.6667H2.14701C1.36457 16.6667 0.837904 16.0417 0.833402 15.3846C0.831356 15.0821 0.94021 14.7732 1.18574 14.5148C1.23485 14.4632 1.28662 14.4099 1.34052 14.3544C2.15443 13.5167 3.45571 12.1773 3.45571 8.33333C3.45571 5.22035 5.68516 2.72837 8.69132 2.11699V1.28205C8.69132 0.574119 9.27732 0 10 0C10.7227 0 11.3087 0.574119 11.3087 1.28205V2.11699C14.3149 2.72837 16.5443 5.22035 16.5443 8.33333C16.5443 12.1773 17.8456 13.5167 18.6595 14.3544Z"
          ></path>
        </svg>
      </PopoverTrigger>

      <PopoverContent align="end">
        <div className="space-y-4">
          <h4 className="font-bold text-2xl">Notifications</h4>
          <div className="flex-center min-h-48">
            <div>No notifications yet...</div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Notification;
