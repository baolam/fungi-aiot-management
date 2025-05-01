import axios from 'axios';
import { API_SERVER } from './constant';

const axiosClient = axios.create({
  baseURL: API_SERVER,
});

axiosClient.interceptors.response.use((resp) => resp.data);

export default axiosClient;
