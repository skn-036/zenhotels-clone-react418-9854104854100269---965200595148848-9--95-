import { useEffect, useState } from 'react';
import useRouteQuery from '@/hooks/router/useRouteQuery';
import useHttpRequest from '@/hooks/http/useHttpRequest';

import { omitPropsFromObject } from '@/lib/helpers/commonHelpers';
import { formatDate } from '@/lib/helpers/dateHelpers';

const generateHotelSearchPayload = (routeQuery) => {
  const payload = {
    checkin: formatDate(routeQuery.checkin, 'yyyy-MM-dd'),
    checkout: formatDate(routeQuery.checkout, 'yyyy-MM-dd'),
    guests: routeQuery.guests.map((guest) =>
      omitPropsFromObject(guest, ['id'])
    ),
    residency: 'AE',
    test_mode: true
  };

  if (routeQuery?.hotelOrRegion?.type === 'regions') {
    payload.region_id = routeQuery.hotelOrRegion?.item?.id;
  }
  if (routeQuery?.hotelOrRegion?.type === 'hotels') {
    payload.hotel_id = routeQuery.hotelOrRegion?.item?.id;
  }

  return payload;
};

const isValidPayload = (payload) => {
  return (
    payload?.checkin &&
    payload?.checkout &&
    payload?.guests?.length &&
    payload?.residency &&
    (payload?.region_id || payload?.hotel_id)
  );
};

const useHotelSearch = () => {
  const routeQuery = useRouteQuery();
  const { saveData: saveDataRequest } = useHttpRequest(
    '/v1/user/hotels/search'
  );
  const [hotelsFromServer, setHotelsFromServer] = useState([]);

  useEffect(() => {
    const payload = generateHotelSearchPayload(routeQuery);
    const getHotelsFromServer = async () => {
      if (!isValidPayload(payload)) return;
      console.log('executing getHotelsFromServer');
      const hotels = await saveDataRequest(payload, { expectsArray: true });
      setHotelsFromServer(hotels);
    };

    getHotelsFromServer();
  }, [routeQuery]);

  return {
    routeQuery,
    hotelsFromServer
  };
};

export default useHotelSearch;
