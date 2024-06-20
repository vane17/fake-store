import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  CreateAxiosDefaults,
} from 'axios';
import { HttpException } from './http-exception';

export class HttpService {
  // private static instance: HttpService;
  public axios: AxiosInstance;

  constructor(config?: CreateAxiosDefaults<any>) {
    this.axios = axios.create(config);
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axios.get<T>(url, config);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      throw new HttpException(err.response?.data, err.response?.status);
    }
  }

  async post<T = any>(
    url: string,
    data?: { [key: string]: any },
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await this.axios.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      throw new HttpException(err.response?.data, err.response?.status);
    }
  }

  async patch<T = any>(
    url: string,
    data?: { [key: string]: any },
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await this.axios.patch<T>(url, data, config);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      throw new HttpException(err.response?.data, err.response?.status);
    }
  }

  async delete<T = any>(url: string, config: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axios.delete<T>(url, config);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      throw new HttpException(err.response?.data, err.response?.status);
    }
  }
}
