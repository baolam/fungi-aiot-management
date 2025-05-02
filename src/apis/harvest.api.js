import axiosClient from '../config/api';

export const getBriefHarvests = () => {
  return axiosClient.get('/harvest');
};

export const getHarvest = (harvestId) => {
  return axiosClient.get(`/harvest/${harvestId}`);
};

export const updateDisease = (data) => {
  return axiosClient.put(`/harvest/disease`, data);
};
