import { combineReducers } from 'redux';
import authReducer from '@/store/reducers/auth';
import hotelReducer from '@/store/reducers/hotels';

const reducers = combineReducers({
  auth: authReducer,
  hotel: hotelReducer
});

export default reducers;
