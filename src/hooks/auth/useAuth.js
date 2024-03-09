// import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser as onAuthUserSet } from '@/store/reducers/auth';

const useAuth = () => {
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.auth.authUser);

  const setAuthUser = (user) => {
    dispatch(onAuthUserSet(user));
  };

  return {
    authUser,
    setAuthUser
  };
};

export default useAuth;
