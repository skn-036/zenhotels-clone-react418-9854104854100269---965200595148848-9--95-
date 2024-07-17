import { memo, useState } from 'react';
import { Form } from '@/components/ui/form';

import { useForm } from 'react-hook-form';
import { SearchRegion } from './SearchRegion';
import SearchDate from './SearchDate';
import { Button } from '@/components/ui/Button';
import SearchGuest from './SearchGuests';
import { v4 } from 'uuid';
import { addDays } from 'date-fns';
import { toast } from 'react-toastify';

export const HotelSearchPlaceholder = memo(
  ({ initialSearchData, onSearch }) => {
    const [searchData, setSearchData] = useState(
      initialSearchData
        ? initialSearchData
        : {
            hotelOrRegion: null,
            guests: [{ id: v4(), adults: 2, children: [] }],
            checkin: addDays(new Date(), 4),
            checkout: addDays(new Date(), 5)
          }
    );

    const form = useForm({
      defaultValues: searchData ? searchData : {}
    });

    const onFormSubmit = (event) => {
      event.preventDefault();

      if (!searchData?.hotelOrRegion) {
        toast.error('Please select a region or hotel');
        return;
      }
      if (typeof onSearch === 'function') onSearch(searchData, event);
    };

    return (
      <Form
        className="h-full w-full"
        {...form}
      >
        <form
          className="flex w-full flex-col gap-4 text-sm xl:flex-row"
          onSubmit={(event) => onFormSubmit(event)}
        >
          <div className="">
            {/* region search */}
            <SearchRegion
              setSearchData={setSearchData}
              initialQ={searchData?.region?.name ?? ''}
            />
          </div>

          <div className="flex flex-1 flex-col gap-4 xl:flex-row">
            {/* date and guests */}
            <div className="flex flex-1 flex-col gap-4 md:flex-row">
              {/* guests */}
              <div className="w-full max-w-[144px]">
                <SearchGuest
                  setSearchData={setSearchData}
                  initialData={searchData.guests}
                />
              </div>

              {/* date selection */}
              <div className="flex-1">
                <SearchDate
                  searchData={searchData}
                  setSearchData={setSearchData}
                />
              </div>
            </div>

            <div className="max-w-full">
              <Button
                type="submit"
                className="flex-center h-12 w-full min-w-[144px] px-10 xl:w-max"
              >
                Search
              </Button>
            </div>
            {/* submit button */}
          </div>
        </form>
      </Form>
    );
  }
);

HotelSearchPlaceholder.displayName = 'HotelSearchPlaceholder';
