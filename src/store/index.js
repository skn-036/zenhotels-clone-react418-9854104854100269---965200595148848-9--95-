import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import reducer from '@/store/reducers';
import { initializeAxios, setAxiosAuthHeader } from '@/lib/axios';

const createAppStore = async () => {
  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddlewares) => [
      ...getDefaultMiddlewares(),
      thunk,
      setAxiosAuthHeader
    ]
  });

  initializeAxios(store);

  return store;
};

export default createAppStore;
