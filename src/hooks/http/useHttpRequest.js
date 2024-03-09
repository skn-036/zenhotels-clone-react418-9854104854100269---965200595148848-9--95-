import { useState } from 'react';
import {
  getDataRequest,
  saveDataRequest,
  updateDataRequest,
  deleteDataRequest
} from '@/lib/helpers/axiosRequest';
import { toast } from 'react-toastify';

const useHttpRequest = (path = '') => {
  const [loading, setLoading] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [lastGetData, setLastGetData] = useState(null);

  const getData = async (options = {}) => {
    try {
      setLoading(true);
      const data = await getDataRequest(path, options);

      setLoading(false);
      setFirstLoading(false);
      setLastGetData(data);

      return data;
    } catch (error) {
      setLoading(false);
      if (error?.code === 'ERR_CANCELED') {
        return lastGetData ? lastGetData : options?.expectsArray ? [] : null;
      }
      if (options?.throw) throw error;
      return options?.expectsArray ? [] : null;
    }
  };

  const saveData = async (params = {}, options = {}) => {
    try {
      setSaving(true);
      const data = await saveDataRequest(path, params, options);

      setSaving(false);
      return data;
    } catch (error) {
      setSaving(false);
      if (!options?.hideToast) showToastFromError(error);

      if (error?.code === 'ERR_CANCELED') {
        options?.expectsArray ? [] : null;
      }
      if (options?.throw) throw error;
      return options?.expectsArray ? [] : null;
    }
  };

  const updateData = async (params = {}, id = null, options = {}) => {
    try {
      setUpdating(true);
      const data = await updateDataRequest(path, params, id, options);

      setUpdating(false);
      return data;
    } catch (error) {
      setUpdating(false);
      if (!options?.hideToast) showToastFromError(error);

      if (error?.code === 'ERR_CANCELED') {
        return options?.expectsArray ? [] : null;
      }
      if (options?.throw) throw error;
      return options?.expectsArray ? [] : null;
    }
  };

  const deleteData = async (id = null, options = {}) => {
    try {
      setDeleting(true);
      const data = await deleteDataRequest(path, id, options);

      setDeleting(false);
      return data;
    } catch (error) {
      setDeleting(false);
      if (!options?.hideToast) showToastFromError(error);

      if (error?.code === 'ERR_CANCELED') {
        return false;
      }
      if (options?.throw) throw error;
      return false;
    }
  };

  const showToastFromError = (error) => {
    if (error?.response?.data?.code === 13333) {
      toast.error(error?.response?.data?.message);
    } else if (error?.response?.data?.code === 13334) {
      toast.info(error?.response?.data?.message);
    } else if (error?.response?.data?.code === 13335) {
      let message = `${error?.response?.data?.message}`;
      message = Object.entries(
        error?.response?.data?.validationErrors || {}
      ).reduce((acc, [key, value], index) => {
        const isLastIndex =
          index >=
          Object.keys(error?.response?.data?.validationErrors || {})?.length -
            1;
        const msg = `\n${key}: ${value}${isLastIndex ? '' : ','}`;
        return `${acc}${msg}`;
      }, message);
      toast.error(message);
    }
  };

  return {
    loading,
    firstLoading,
    saving,
    updating,
    deleting,

    getData,
    saveData,
    updateData,
    deleteData
  };
};

export default useHttpRequest;
