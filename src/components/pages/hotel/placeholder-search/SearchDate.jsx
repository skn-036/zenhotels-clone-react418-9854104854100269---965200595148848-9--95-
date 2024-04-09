import { memo, useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import '@/assets/css/datepicker.css';
import { formatDate } from '@/lib/helpers/dateHelpers';

const searchDate = memo(({ className, searchData, setSearchData }) => {
  const [open, setOpen] = useState(false);

  const onDateSelect = (range) => {
    const [checkin, checkout] = range;
    if (checkout) {
      setOpen(false);
    }
    setSearchData((oldData) => {
      return { ...oldData, checkin, checkout };
    });
  };
  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <button className="group w-full">
          <div
            className={cn(
              'flex h-12 w-full flex-row gap-0 divide-x divide-border rounded border border-border  shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-0 hover:divide-primary hover:border-primary group-data-[state=open]:border-primary group-data-[state=open]:ring-2 group-data-[state=open]:ring-primary group-data-[state=open]:ring-offset-0',
              className
            )}
          >
            {/* checkin */}
            <div className="flex h-full w-1/2 flex-col gap-0.5 pb-[8px] pl-4 pr-4 pt-[3px]">
              <div className="text-start text-xs text-muted-foreground">
                Check-in
              </div>

              <div className="flex-between h-5 w-full font-semibold">
                <div>{formatDate(searchData?.checkin, 'MMM d, yyyy')}</div>
              </div>
            </div>

            {/* check out */}
            <div className="flex h-full w-1/2 flex-col gap-0.5 pb-[8px] pl-4 pr-4 pt-[3px]">
              <div className="text-start text-xs text-muted-foreground">
                Check-out
              </div>

              <div className="flex-between h-5 w-full font-semibold">
                <div>{formatDate(searchData?.checkout, 'MMM d, yyyy')}</div>
              </div>
            </div>
          </div>
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="styled-datepicker no-border-date-picker h-max w-max p-0"
        align="end"
      >
        <DatePicker
          selected={searchData.checkin}
          onChange={onDateSelect}
          startDate={searchData.checkin}
          endDate={searchData.checkout}
          monthsShown={2}
          selectsRange
          inline
          swapRange
          className="border-none"
        ></DatePicker>
      </PopoverContent>
    </Popover>
  );
});

searchDate.displayName = searchDate;

export default searchDate;
