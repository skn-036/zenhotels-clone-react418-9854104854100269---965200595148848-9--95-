import useHotelSearch from '@/hooks/page/hotel-search/useHotelSearch';

const HotelSearch = () => {
  const { hotelsFromServer } = useHotelSearch();
  console.log(hotelsFromServer);

  return (
    <div>
      <h1>Hotel Search</h1>
    </div>
  );
};

export default HotelSearch;
