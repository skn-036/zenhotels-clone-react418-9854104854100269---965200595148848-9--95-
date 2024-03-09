import { memo, useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/components/ui/popover';
import { HiChevronDown } from 'react-icons/hi';
import { cn } from '@/lib/utils';
import { v4 } from 'uuid';
import { Button } from '@/components/ui/Button';
import { arrayFromNumber } from '@/lib/helpers/commonHelpers';

const room = { id: v4(), adults: 2, children: [] };

const SearchGuest = memo(({ className, setSearchData, initialData }) => {
  const [open, setOpen] = useState(undefined);
  const [childAgePopoverOpen, setChildAgePopoverOpen] = useState(
    initialData?.length ? initialData.map(() => undefined) : [undefined]
  );

  const [guests, setGuests] = useState(
    initialData ? initialData : [{ ...room, id: v4() }]
  );

  const totalRooms = guests.length;
  const totalGuests = guests.reduce((acc, room) => {
    return acc + parseInt(room.adults) + room?.children.length;
  }, 0);

  const addRoom = () => {
    setGuests((guests) => {
      const updatedGuests = [...guests, { ...room, id: v4() }];
      setSearchData((oldVal) => ({ ...oldVal, guests: updatedGuests }));
      return updatedGuests;
    });
    setChildAgePopoverOpen((oldVal) => [...oldVal, undefined]);
  };

  const removeRoom = (room, index) => {
    if (guests.length <= 1) return;
    setGuests((guests) => {
      const updatedGuests = guests.filter((r) => r.id !== room.id);
      setSearchData((oldVal) => ({ ...oldVal, guests: updatedGuests }));
      return updatedGuests;
    });
    setChildAgePopoverOpen((oldVal) => oldVal.filter((_, i) => i !== index));
  };

  const updateRoom = (updatingRoom) => {
    setGuests((guests) => {
      const updatedGuests = guests.map((room) => {
        if (room.id === updatingRoom.id) return updatingRoom;
        return room;
      });
      setSearchData((oldVal) => ({ ...oldVal, guests: updatedGuests }));
      return updatedGuests;
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
              'flex h-12 w-full flex-col gap-0 rounded border border-border pb-[8px] pl-4 pr-4 pt-[3px] shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-0 hover:border-primary group-data-[state=open]:border-primary group-data-[state=open]:ring-2 group-data-[state=open]:ring-primary group-data-[state=open]:ring-offset-0',
              className
            )}
          >
            <div className="text-start text-xs text-muted-foreground">
              {`${totalRooms} room${totalRooms > 1 ? 's' : ''}`}
            </div>

            <div className="flex-between h-5 w-full font-semibold text-muted-foreground">
              <div>{`${totalGuests} guest${totalGuests > 1 ? 's' : ''}`}</div>
              <HiChevronDown
                size={20}
                className="mt-1 transition duration-300 group-data-[state=open]:rotate-180"
              />
            </div>
          </div>
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={2}
        className="w-[380px] max-w-full shadow-google"
      >
        <div className="w-full divide-y divide-border">
          {guests.map((room, index) => (
            <div
              key={room.id}
              className="space-y-3 pb-4 pt-4 first:pt-0 last:pb-0"
            >
              <div className="flex-between">
                <div className="text-xl font-semibold">{`Room ${index + 1}`}</div>
                {index > 0 && (
                  <div
                    className="cursor-pointer font-medium text-primary"
                    onClick={() => removeRoom(room, index)}
                  >
                    Remove
                  </div>
                )}
              </div>

              <div className="flex-start gap-4">
                <div className="flex flex-col gap-1">
                  <div className="text-xs font-medium text-muted-foreground">
                    Adults
                  </div>
                  <div className="flex-start w-max gap-0 rounded-md border border-border text-base">
                    <div
                      className={`flex-center size-9 ${room.adults > 1 ? 'cursor-pointer' : ''}`}
                      onClick={
                        room.adults > 1
                          ? () =>
                              updateRoom({ ...room, adults: room.adults - 1 })
                          : () => null
                      }
                    >
                      -
                    </div>
                    <div className={`flex-center size-9`}>{room?.adults}</div>
                    <div
                      className={`flex-center size-9 cursor-pointer`}
                      onClick={() =>
                        updateRoom({ ...room, adults: room.adults + 1 })
                      }
                    >
                      +
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-1">
                  <div className="text-xs font-medium text-muted-foreground">
                    Adults
                  </div>

                  <div className="flex-start flex-wrap gap-2">
                    <Popover
                      open={childAgePopoverOpen[index]}
                      onOpenChange={(open) =>
                        setChildAgePopoverOpen((oldVal) =>
                          oldVal.map((val, i) => (i === index ? open : val))
                        )
                      }
                    >
                      <PopoverTrigger>
                        <div className="flex-center size-9 rounded-md border border-border text-lg font-bold text-muted-foreground">
                          +
                        </div>
                      </PopoverTrigger>
                      <PopoverContent
                        className="max-w-[164px] py-1"
                        align="start"
                        sideOffset={2}
                      >
                        {arrayFromNumber(17, true).map((childAge) => (
                          <div
                            key={childAge}
                            className="cursor-pointer rounded-md px-2 py-0 hover:bg-primary/20"
                            onClick={() => {
                              updateRoom({
                                ...room,
                                children: [...room.children, childAge]
                              });
                              setChildAgePopoverOpen((oldVal) =>
                                oldVal.map((val, i) =>
                                  i === index ? false : val
                                )
                              );
                            }}
                          >
                            {`${childAge} year${childAge > 1 ? 's' : ''}`}
                          </div>
                        ))}
                      </PopoverContent>
                    </Popover>

                    {room.children.map((childAge, index) => (
                      <div
                        key={index}
                        className="flex-center h-9 gap-1 rounded-md bg-gray-100 px-2"
                      >
                        <div>{`${childAge} year${childAge > 1 ? 's' : ''}`}</div>
                        <span
                          className="cursor-pointer font-medium"
                          onClick={() =>
                            updateRoom({
                              ...room,
                              children: room.children.filter(
                                (_, i) => i !== index
                              )
                            })
                          }
                        >
                          x
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex-between mt-4">
          <div
            className="shrink-0 cursor-pointer text-base font-bold text-secondary"
            onClick={() => addRoom()}
          >
            +Add a room
          </div>

          <Button
            className="flex-center h-12 w-[144px] px-10 xl:w-max"
            onClick={() => setOpen(false)}
          >
            Done
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
});

SearchGuest.displayName = 'SearchGuest';

export default SearchGuest;
