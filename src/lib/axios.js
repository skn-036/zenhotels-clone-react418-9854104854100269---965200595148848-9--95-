import axios from 'axios';

export const initializeAxios = (store) => {
  const state = store.getState();
  const accessToken = state.auth?.accessToken;

  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
  axios.defaults.withCredentials = true;

  if (accessToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }

  axios.interceptors.response.use((response) => {
    const newAccessToken = response.headers.get('X-NEW-ACCESS-TOKEN');
    if (newAccessToken && newAccessToken !== accessToken) {
      store.dispatch({ type: 'auth/setAccessToken', payload: newAccessToken });
    }
    return response;
  });
};

export const setAxiosAuthHeader = () => (next) => (action) => {
  if (action.type === 'auth/setAccessToken') {
    const accessToken = action.payload;
    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }
  return next(action);
};
