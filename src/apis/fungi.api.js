import axiosClient from '../config/api';

export const getFungiInfor = () => {
  return axiosClient.get('/fungi');
};

export const getFungiDetail = (fungiId) => {
  return axiosClient.get(`/fungi/${fungiId}`);
};
