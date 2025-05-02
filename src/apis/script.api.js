import axiosClient from '../config/api';

export const getScript = (fungiId) => {
  return axiosClient.get(`/script/${fungiId}`);
};

export const getRules = (fungiId) => {
  return axiosClient.get(`/rule/${fungiId}`);
};

export const addScript = (data) => {
  return axiosClient.post(`/script`, data);
};

export const addRule = (data) => {
  return axiosClient.post(`/rule`, data);
};
