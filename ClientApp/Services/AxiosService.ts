import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Inject, Service } from 'vue-di-container';
import { LoaderService } from './LoaderService';
import { ErrorHandler } from './errorHandler';

@Service()
export class AxiosService {
  public axios: AxiosInstance;

  @Inject(LoaderService)
  private loaderService!: LoaderService;

  @Inject(ErrorHandler)
  private errorHandler!: ErrorHandler;

  constructor() {
    this.axios = axios.create({
      baseURL: '/',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.axios.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        this.loaderService.show();
        return config;
      },
      (error: AxiosError) => {
        this.loaderService.hide();
        return Promise.reject(error);
      }
    );

    this.axios.interceptors.response.use(
      (response: AxiosResponse) => {
        this.loaderService.hide();
        return response;
      },
      (error: AxiosError) => {
        this.loaderService.hide();
        this.errorHandler.handleError(error);
        return Promise.reject(error);
      }
    );
  }
}
