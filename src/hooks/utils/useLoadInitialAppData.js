import { getDataRequest } from '@/lib/helpers/axiosRequest';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setHotelCountries } from '@/store/reducers/hotels';
// import { setAuthUser } from '@/store/reducers/auth';
// import useHttpRequest from '@/hooks/http/useHttpRequest';

const useLoadInitialAppData = () => {
  const dispatch = useDispatch();
  // const { getData: getAuthUserRequest } = useHttpRequest('/v1/user/auth/user');

  // load auth user data
  // useEffect(() => {
  //   const getAuthUser = async () => {
  //     const user = await getAuthUserRequest({ hideToast: true });
  //     dispatch(setAuthUser(user ? user : null));
  //   };
  //   getAuthUser();
  // }, [dispatch, getAuthUserRequest]);

  // load countries
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const countries = await getDataRequest('/v1/misc/countries');
        dispatch(setHotelCountries(countries));
      } catch (error) {
        dispatch(setHotelCountries(null));
      }
    };
    loadCountries();
  }, [dispatch]);
};

export default useLoadInitialAppData;
