/* eslint-disable */
import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081',
});

api.interceptors.request.use((config: AxiosRequestConfig) => {
  config.withCredentials = true;

  return config;
});

export { api };
