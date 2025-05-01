import axiosClient from '../config/api';

export const getScript = (fungiId) => {
  return axiosClient.get(`/script/${fungiId}`);
};

export const getRules = (fungiId) => {
  return axiosClient.get(`/rule/${fungiId}`);
};
