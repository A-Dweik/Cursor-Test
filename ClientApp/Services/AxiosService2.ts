import { ErrorHandler } from './errorHandler';
import axios, { AxiosInstance } from 'axios';
import { Service } from 'vue-di-container';

@Service()
export default class AxiosService2 {

    public axiosInstance: AxiosInstance;
    constructor() {
        const config = {
            baseURL: 'http://localhost:40000/applications/dashboard',
        };
        this.axiosInstance = axios.create(config);
        this.axiosInstance.interceptors.request.use(
            (axiosRequestConfig) => axiosRequestConfig,
            (error) => ErrorHandler.errorResponseHandler(error),
        );

        this.axiosInstance.interceptors.response.use(
            (axiosResponse) => axiosResponse,
            (error) => {
                ErrorHandler.errorResponseHandler(error);
            },
        );
    }
}


