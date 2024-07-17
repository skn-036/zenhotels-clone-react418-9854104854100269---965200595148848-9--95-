import { useLocation } from 'react-router-dom';
import { parse } from 'qs';
import { useMemo } from 'react';
import { isValid } from 'date-fns';

const useRouteQuery = () => {
  const { search } = useLocation();

  return useMemo(() => {
    const convertValues = (obj) => {
      Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === 'object') {
          convertValues(obj[key]);
        } else {
          if (obj[key] === 'true') {
            obj[key] = true;
          } else if (obj[key] === 'false') {
            obj[key] = false;
          } else if (!isNaN(obj[key]) && obj[key].trim() !== '') {
            obj[key] = +obj[key];
          } else if (
            typeof obj[key] === 'string' &&
            isValid(new Date(obj[key]))
          ) {
            obj[key] = new Date(obj[key]);
          }
        }
      });
      return obj;
    };

    const query = parse(search, { ignoreQueryPrefix: true });
    return convertValues(query);
  }, [search]);
};

export default useRouteQuery;
