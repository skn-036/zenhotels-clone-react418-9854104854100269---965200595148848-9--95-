import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import {
  getDataRequest,
  saveDataRequest,
  updateDataRequest,
  deleteDataRequest
} from '@/lib/helpers/axiosRequest';

const useReactQueryRequest = (path, queryKey = []) => {
  if (!queryKey || !queryKey?.length) {
    queryKey = [path];
  }

  const queryClient = useQueryClient();

  const getData = (options = {}, reactQueryOptions = {}) => {
    const response = useQuery({
      queryKey,
      queryFn: ({ signal }) =>
        getDataRequest(path, {
          ...options,
          axiosOptions: {
            ...(options?.axiosOptions || {}),
            signal
          }
        }),
      ...reactQueryOptions
    });

    return { ...response };
  };

  const saveData = (params = {}, options = {}, reactQueryOptions = {}) => {
    const response = useMutation({
      mutationKey: queryKey,
      mutationFn: (variables) => {
        console.log('variables', variables);
        return saveDataRequest(path, params, {
          ...options,
          axiosOptions: {
            ...(options?.axiosOptions || {}),
            signal: variables?.signal
          }
        });
      },
      ...reactQueryOptions
    });

    return { ...response };
  };

  const updateData = (
    params = {},
    id = null,
    options = {},
    reactQueryOptions = {}
  ) => {
    const response = useMutation({
      mutationKey: queryKey,
      mutationFn: (variables) => {
        return updateDataRequest(path, params, id, {
          ...options,
          axiosOptions: {
            ...(options?.axiosOptions || {}),
            signal: variables?.signal
          }
        });
      },
      ...reactQueryOptions
    });

    return { ...response };
  };

  const deleteData = (id = null, options = {}, reactQueryOptions = {}) => {
    const response = useMutation({
      mutationKey: queryKey,
      mutationFn: (variables) => {
        return deleteDataRequest(path, id, {
          ...options,
          axiosOptions: {
            ...(options?.axiosOptions || {}),
            signal: variables?.signal
          }
        });
      },
      ...reactQueryOptions
    });

    return { ...response };
  };

  return {
    queryKey,
    queryClient,
    getData,
    saveData,
    updateData,
    deleteData
  };
};

export default useReactQueryRequest;
