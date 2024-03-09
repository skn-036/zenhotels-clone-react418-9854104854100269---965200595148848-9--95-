import { memo, useState } from 'react';
import { Form } from '@/components/ui/form';

import { useForm } from 'react-hook-form';
import { SearchRegion } from './SearchRegion';
import { Button } from '@/components/ui/Button';
import SearchGuest from './SearchGuests';
import { v4 } from 'uuid';

export const HotelSearchPlaceholder = memo(({ initialSearchData }) => {
  const [searchData, setSearchData] = useState(
    initialSearchData
      ? initialSearchData
      : {
          hotelOrRegion: null,
          guests: [{ id: v4(), adults: 2, children: [] }]
        }
  );

  const form = useForm({
    defaultValues: searchData ? searchData : {}
  });

  console.log(searchData);
  return (
    <Form
      className="h-full w-full"
      {...form}
    >
      <form
        className="flex w-full flex-col gap-4 text-sm xl:flex-row"
        onSubmit={(e) => e.preventDefault()}
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
            <div className="w-full min-w-[144px]">
              <SearchGuest
                setSearchData={setSearchData}
                initialData={searchData.guests}
              />
            </div>
          </div>

          <div className="max-w-full">
            <Button className="flex-center h-12 w-full min-w-[144px] px-10 xl:w-max">
              Search
            </Button>
          </div>
          {/* submit button */}
        </div>
      </form>
    </Form>
  );
});

HotelSearchPlaceholder.displayName = 'HotelSearchPlaceholder';
