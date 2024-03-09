import { createSlice } from '@reduxjs/toolkit';

const hotelSlice = createSlice({
  name: 'hotel',
  initialState: {
    countries: []
  },
  reducers: {
    setHotelCountries: (state, { payload }) => {
      if (Array.isArray(payload) && payload?.length) state.countries = payload;
    }
  }
});

export const { setHotelCountries } = hotelSlice.actions;
export default hotelSlice.reducer;
