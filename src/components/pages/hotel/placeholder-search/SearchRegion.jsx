import Input from '@/components/ui/custom/form/Input';
import { memo, useState, useRef, useEffect } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/components/ui/popover';
import { useQuery } from '@tanstack/react-query';
import { getDataRequest } from '@/lib/helpers/axiosRequest';
import HotelIconSvg from '@/assets/svg/hotels/hotel-icon.svg?react';
import CityIconSvg from '@/assets/svg/hotels/city-icon.svg?react';
import RegionIconSvg from '@/assets/svg/hotels/region-icon.svg?react';
import AirportIconSvg from '@/assets/svg/hotels/airport-icon.svg?react';
import { MdOutlineAssuredWorkload } from 'react-icons/md';
import useDeepCompareEffect from '@/hooks/utils/useDeepCompareEffect';
import { LoadingCircle } from '@/components/ui/custom/spinner/LoadingCircle';

export const SearchRegion = memo(({ setSearchData, initialQ }) => {
  const inputRef = useRef(null);
  const triggerRef = useRef(null);

  const [showPopover, setShowPopover] = useState(undefined);
  const [q, setQ] = useState(initialQ ? initialQ : '');
  const [focused, setFocused] = useState(false);
  const [triggerWidth, setTriggerWidth] = useState(320);
  const [selectedItem, setSelectedItem] = useState(null);

  const onSetTriggerWidth = () => {
    setTriggerWidth(triggerRef.current?.clientWidth || 320);
  };

  useEffect(() => {
    onSetTriggerWidth();
    window.addEventListener('resize', () => {
      onSetTriggerWidth();
    });

    return () =>
      window.removeEventListener('resize', () => {
        onSetTriggerWidth();
      });
  }, []);

  const { data: searchResult, isFetching } = useQuery({
    queryKey: ['/v1/user/hotels/search-preview', { q }],
    queryFn: ({ signal }) => {
      return getDataRequest('/v1/user/hotels/search-preview', {
        query: { q },
        axiosOptions: { signal }
      });
    },
    enabled: q.length > 2,
    placeholderData: {
      regions: [],
      hotels: []
    }
  });
  const getCurrentStatus = () => {
    if (isFetching) {
      return 'loading';
    }
    if (
      q?.length < 3 &&
      !searchResult?.regions?.length &&
      !searchResult?.hotels?.length
    ) {
      return 'keep-typing';
    }
    if (
      q?.length >= 3 &&
      !searchResult?.regions?.length &&
      !searchResult?.hotels?.length
    ) {
      return 'no-result';
    }
    return 'has-result';
  };
  const status = getCurrentStatus();

  const onKeyDown = (e) => {
    ['ArrowDown', 'ArrowUp'].includes(e.key) && e.preventDefault();
  };
  const onKeyUp = (e) => {
    if (status !== 'has-result') return;

    if (!['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) {
      return;
    }

    const items = Object.entries(searchResult).reduce((acc, [key, items]) => {
      const result = items.map((item) => ({ type: key, item }));
      return acc.concat(result);
    }, []);
    if (!items?.length) {
      return setSelectedItem(null);
    }

    if (e.key === 'Enter' && selectedItem) {
      return onSearchResultSet(selectedItem);
    }

    const selectedItemIndex = items.findIndex(
      (item) =>
        item?.type === selectedItem?.type &&
        item?.item?.id === selectedItem?.item?.id
    );

    if (e.key === 'ArrowDown') {
      const nextIndex =
        selectedItemIndex >= items.length - 1 ? 0 : selectedItemIndex + 1;
      setSelectedItem(items[nextIndex]);
    }
    if (e.key === 'ArrowUp') {
      const nextIndex =
        selectedItemIndex <= 0 ? items.length - 1 : selectedItemIndex - 1;
      setSelectedItem(items[nextIndex]);
    }
  };

  useDeepCompareEffect(() => {
    const getSelectedItem = () => {
      if (!searchResult?.regions?.length && !searchResult?.hotels?.length) {
        return null;
      }

      let item = null;
      if (selectedItem?.type) {
        const data = searchResult[selectedItem?.type];
        if (data?.length) {
          item = data.find((item) => item?.id === selectedItem?.item?.id);
        }
      }
      if (!item) {
        if (searchResult?.regions?.length) {
          item = { type: 'regions', item: searchResult?.regions[0] };
        } else if (searchResult?.hotels?.length) {
          item = { type: 'hotels', item: searchResult?.hotels[0] };
        }
      }

      return item;
    };
    setSelectedItem(getSelectedItem());
  }, [searchResult]);

  const onSearchResultSet = (item) => {
    setSearchData((oldData) => {
      return {
        ...oldData,
        hotelOrRegion: item
      };
    });
    setQ(item?.item?.name);
    setShowPopover(false);
  };

  return (
    <Popover
      className="w-full"
      open={showPopover}
      onOpenChange={setShowPopover}
    >
      <PopoverTrigger
        ref={triggerRef}
        asChild
      >
        <div className="w-full xl:w-[320px]">
          <Input
            ref={inputRef}
            value={q}
            label="Destination"
            placeholder="Start typing..."
            onChange={() => setQ(inputRef.current.value)}
            onFocus={() => {
              setTimeout(() => {
                setFocused(true);
              }, 500);
            }}
            onBlur={() => setFocused(false)}
            onClick={(e) => focused && e.stopPropagation()}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
          />
        </div>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        onOpenAutoFocus={() => {
          setTimeout(() => {
            inputRef.current.focus();
          }, 5);
        }}
        sideOffset={2}
        asChild
      >
        <div
          className="shadow-google"
          style={{ width: `${triggerWidth}px` }}
        >
          {status === 'keep-typing' && (
            <div className="flex-center w-full py-6 text-center font-medium">
              Please start typing to load results...
            </div>
          )}

          {status === 'no-result' && (
            <div className="flex-center w-full py-6 text-center font-medium">
              No result for current search...
            </div>
          )}

          {status === 'loading' && (
            <div className="flex-center w-full py-6 text-center font-medium">
              <LoadingCircle />
            </div>
          )}

          {status === 'has-result' && (
            <div className="space-y-4">
              {searchResult?.regions?.length > 0 && (
                <div className="flex flex-col gap-0">
                  <div className="mb-2 text-sm font-bold text-muted-foreground">
                    Regions
                  </div>
                  {(searchResult.regions || []).map((region) => (
                    <div
                      key={region.id}
                      className={`inline-flex cursor-pointer gap-3 truncate rounded-md px-1 py-1 hover:bg-primary/20 ${selectedItem?.type === 'regions' && selectedItem?.item?.id === region?.id ? 'bg-primary/20' : ''}`}
                      onClick={() =>
                        onSearchResultSet({
                          type: 'regions',
                          item: region
                        })
                      }
                    >
                      {region?.type === 'Airport' ? (
                        <AirportIconSvg />
                      ) : region?.type === 'Province (State)' ? (
                        <RegionIconSvg />
                      ) : (
                        <CityIconSvg />
                      )}

                      <div className="truncate text-sm">{region?.name}</div>
                    </div>
                  ))}
                </div>
              )}

              {searchResult?.hotels?.length > 0 && (
                <div className="flex flex-col gap-2">
                  <div className="text-sm font-bold text-muted-foreground">
                    Hotels
                  </div>
                  {(searchResult.hotels || []).map((hotel) => (
                    <div
                      key={hotel.id}
                      className={`flex-start cursor-pointer gap-3 rounded-md px-1 py-1 hover:bg-primary/20 ${selectedItem?.type === 'hotels' && selectedItem?.item?.id === hotel?.id ? 'bg-primary/20' : ''}`}
                      onClick={() =>
                        onSearchResultSet({
                          type: 'hotels',
                          item: hotel
                        })
                      }
                    >
                      <HotelIconSvg className="w-max" />

                      <div className="flex-1 truncate text-sm">
                        <div className="w-full truncate">{hotel?.name}</div>
                        <div className="inline-flex gap-2 text-xs text-muted-foreground">
                          <MdOutlineAssuredWorkload />
                          <div>{`Halalness ${hotel?.halal_ratings_percentage}%`}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
});

SearchRegion.displayName = 'SearchRegion';
