import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export default abstract class AxiosService {
  protected axiosInstance: AxiosInstance;

  constructor(baseUrl: string, authToken: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    });
  }

  protected async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.get(endpoint, config);
    return this.handleResponse(response);
  }

  protected async post<T>(endpoint: string, body: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.post(endpoint, body, config);
    return this.handleResponse(response);
  }

  protected async put<T>(endpoint: string, body: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.put(endpoint, body, config);
    return this.handleResponse(response);
  }

  protected async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.delete(endpoint, config);
    return this.handleResponse(response);
  }

  private handleResponse<T>(response: AxiosResponse<T>): T {
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(response.statusText);
    }
  }
}
