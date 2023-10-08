import env from '@/config/env';
import { message } from 'antd';
import axios, { AxiosError, AxiosResponse } from 'axios';
import errorCatcher, { Response } from './errorCatcher';

//合并AxiosRequestConfig
declare module 'axios' {
  export interface AxiosRequestConfig {
    noToken?: boolean;
    noValidate?: boolean;
    noGlobalMessage?: boolean;
  }
}

const requestInstance = axios.create({
  baseURL: env.SERVICE_API,
  timeout: 15000,
});

export const abortControllerList: AbortController[] = [];

requestInstance.interceptors.request.use((requestConfig) => {
  //token
  if (requestConfig.noToken) {
    const itabToken = localStorage.getItem('itabToken');
    if (!itabToken) {
      message.error('请重新登陆');
    }
    requestConfig.headers.set('itabToken');
  }

  return requestConfig;
});

requestInstance.interceptors.response.use(
  (response) => {
    const config = response.config;
    const data = response.data as Response;
    if (!config.noValidate) {
      //validate
      if (data.code === 0 || data.status !== 1)
        errorCatcher(false, response, config.noGlobalMessage);
    }
    return response;
  },
  (error: AxiosError) => {
    if (error.message === 'cancel') {
      throw error;
    }
    errorCatcher(
      true,
      error.response as AxiosResponse<Response>,
      error.config?.noGlobalMessage,
    );
    return;
  },
);

export default requestInstance;
