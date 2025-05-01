import axiosClient from '../config/api';

export const getDiseases = (fungiId) => {
  return axiosClient.get(`/disease/${fungiId}`);
};
