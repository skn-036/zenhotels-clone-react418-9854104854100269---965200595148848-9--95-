import { createSlice } from '@reduxjs/toolkit';
const accessToken = localStorage.getItem('accessToken');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authUser: null,
    accessToken
  },
  reducers: {
    setAuthUser: (state, { payload }) => {
      localStorage.setItem(
        'authUser',
        payload ? JSON.stringify(payload) : null
      );
      state.authUser = payload;
    },
    setAccessToken: (state, { payload }) => {
      localStorage.setItem('accessToken', payload);
      state.accessToken = payload;
    }
  }
});

export const { setAuthUser, setAccessToken } = authSlice.actions;

export default authSlice.reducer;
