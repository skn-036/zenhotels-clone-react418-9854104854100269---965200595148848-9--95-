import axios from 'axios';
import { isObject, isArray } from '@/lib/helpers/commonHelpers';
import { formatDate } from '@/lib/helpers/dateHelpers';
import { isValid } from 'date-fns';

const getRequestAbortController = new Map();
const saveRequestAbortController = new Map();
const updateRequestAbortController = new Map();
const deleteRequestAbortController = new Map();

export const getDataRequest = async (path = '', options = {}) => {
  let { query, callback, axiosOptions } = options;

  axiosOptions = processAbortController(
    getRequestAbortController,
    path,
    axiosOptions
  );

  try {
    let urlParams = resolveRouteQuery(query);
    const response = await axios.get(`${path}${urlParams}`, axiosOptions);
    if (typeof response === axios.AxiosError) {
      throw response;
    }

    if (typeof callback === 'function') callback(null, response);

    return response.data;
  } catch (error) {
    // console.log('axiosError', error?.code);
    if (typeof callback === 'function') callback(error, null);
    throw error;
  }
};

export const saveDataRequest = async (path = '', params = {}, options = {}) => {
  let { query, callback, axiosOptions } = options;
  axiosOptions = processAbortController(
    saveRequestAbortController,
    path,
    axiosOptions
  );

  try {
    let urlParams = resolveRouteQuery(query);
    const response = await axios.post(
      `${path}${urlParams}`,
      params,
      axiosOptions
    );
    if (typeof response === axios.AxiosError) {
      throw response;
    }

    if (typeof callback === 'function') callback(null, response);

    return response.data;
  } catch (error) {
    // console.log('axiosError', error);
    if (typeof callback === 'function') callback(error, null);
    throw error;
  }
};

export const updateDataRequest = async (
  path = '',
  params = {},
  id = null,
  options = {}
) => {
  let { query, callback, axiosOptions } = options;
  axiosOptions = processAbortController(
    updateRequestAbortController,
    path,
    axiosOptions
  );
  try {
    let urlParams = resolveRouteQuery(query);
    const response = await axios.patch(
      `${path}${id ? `/${id}` : ''}${urlParams}`,
      params,
      axiosOptions
    );
    if (typeof response === axios.AxiosError) {
      throw response;
    }

    if (typeof callback === 'function') callback(null, response);

    return response.data;
  } catch (error) {
    // console.log('axiosError', error);
    if (typeof callback === 'function') callback(error, null);
    throw error;
  }
};

export const deleteDataRequest = async (path = '', id = null, options = {}) => {
  let { query, callback, axiosOptions } = options;
  axiosOptions = processAbortController(
    deleteRequestAbortController,
    path,
    axiosOptions
  );

  try {
    let urlParams = resolveRouteQuery(query);
    const response = await axios.delete(
      `${path}${id ? `/${id}` : ''}${urlParams}`,
      axiosOptions
    );
    if (typeof response === axios.AxiosError) {
      throw response;
    }

    if (typeof callback === 'function') callback(null, response);
    if (response?.status < 300) {
      if (!response.data) return true;
      return response.data;
    }
    return false;
  } catch (error) {
    // console.log('axiosError', error);
    if (typeof callback === 'function') callback(error, null);
    throw error;
  }
};

const toJsonApiQuery = (queries, parentKeys = [], dateFormat = null) => {
  return Object.entries(queries).reduce((result, [key, value]) => {
    if (isObject(value)) {
      if (isValid(value)) {
        const queryKey = `${parentKeys.join('')}${
          parentKeys?.length ? `[${key}]` : key
        }`;

        value = dateFormat
          ? formatDate(value, dateFormat)
          : value?.toISOString();
        result = `${result}&${queryKey}=${value}`;
      } else {
        result = `${result}${toJsonApiQuery(
          value,
          parentKeys.concat([parentKeys?.length ? `[${key}]` : key]),
          dateFormat
        )}`;
      }
    } else if (isArray(value)) {
      value.forEach((arrayItem, index) => {
        if (isObject(arrayItem) || isArray(arrayItem)) {
          result = `${result}${toJsonApiQuery(
            arrayItem,
            parentKeys.concat([
              `${parentKeys?.length ? `[${key}]` : key}[${index}]`
            ]),
            dateFormat
          )}`;
        } else {
          const queryKey = `${parentKeys.join('')}${
            parentKeys?.length ? `[${key}]` : key
          }[${index}]`;
          result = `${result}&${queryKey}=${arrayItem}`;
        }
      });
    } else {
      if (value !== undefined) {
        const queryKey = `${parentKeys.join('')}${
          parentKeys?.length ? `[${key}]` : key
        }`;
        result = `${result}&${queryKey}=${value}`;
      }
    }

    return result;
  }, '');
};

export const convertToJsonApiQuery = (
  queries,
  parentKeys = [],
  dateFormat = null
) => {
  let queryString = toJsonApiQuery(queries, parentKeys, dateFormat);

  queryString = queryString?.startsWith('&')
    ? queryString?.slice(1)
    : queryString;

  return encodeURI(queryString);
};

const processAbortController = (abortController, path, axiosOptions) => {
  let signal = axiosOptions?.signal;
  if (!signal) {
    if (abortController.get(path))
      abortController.get(path)?.abort('New request triggered');

    abortController.set(path, new AbortController());
    axiosOptions = axiosOptions
      ? { ...axiosOptions, signal: abortController.get(path)?.signal }
      : { signal: abortController.get(path)?.signal };
  }

  return axiosOptions;
};

const resolveRouteQuery = (query) => {
  let urlParams = '';
  if (query && typeof query === 'string') {
    urlParams = `${query?.startsWith('?') ? '' : '?'}${query}`;
  } else if (query) {
    urlParams = `?${convertToJsonApiQuery(query)}`;
  }
  return urlParams;
};
