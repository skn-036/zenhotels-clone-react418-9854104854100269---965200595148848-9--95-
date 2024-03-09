import { Link } from 'react-router-dom';

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';

const DropdownMenu = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <svg
          width="24"
          height="24"
          className="text-secondary"
        >
          <g fill="none">
            <g
              fill="currentColor"
              transform="translate(0 3)"
            >
              <rect
                width="24"
                height="2"
                rx="1"
              ></rect>
              <rect
                width="24"
                height="2"
                y="8"
                rx="1"
              ></rect>
              <rect
                width="24"
                height="2"
                y="16"
                rx="1"
              ></rect>
            </g>
          </g>
        </svg>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="gap-3 flex flex-col"
      >
        <Link
          to="/"
          className="text-link"
        >
          About us
        </Link>

        <Link
          to="/"
          className="text-link"
        >
          Save a new promo code
        </Link>

        <Link
          to="/"
          className="text-link"
        >
          Customer support
        </Link>

        <Link
          to="/"
          className="text-link"
        >
          Help center
        </Link>

        <Link
          to="/"
          className="text-link"
        >
          Travel vlog
        </Link>

        <Link
          to="/"
          className="text-link"
        >
          For business trips
        </Link>

        <Link
          to="/"
          className="text-link"
        >
          My favourite hotels
        </Link>
      </PopoverContent>
    </Popover>
  );
};

export default DropdownMenu;
