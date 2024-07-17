import { createContext, useContext } from 'react';

export const ValidatePaymentMethodContext = createContext(undefined);

export const useValidatePaymentMethod = () => {
  return useContext(ValidatePaymentMethodContext);
};
