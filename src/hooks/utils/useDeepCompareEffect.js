import { useEffect, useRef } from 'react';
import isEqual from 'lodash/isEqual';

const useDeepCompareEffect = (callback, dependencies = []) => {
  const currentDependenciesRef = useRef();

  useEffect(() => {
    if (!isEqual(currentDependenciesRef.current, dependencies)) {
      callback();
      currentDependenciesRef.current = dependencies;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

export default useDeepCompareEffect;
