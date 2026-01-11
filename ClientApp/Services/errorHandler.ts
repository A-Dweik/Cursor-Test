import { Toaster } from './toast';

export class ErrorHandler {
    public static errorResponseHandler(error: any) {
        if (error.response.status === 500) {
            window.HideLoader();
            Toaster.error('حدث خطا ما في النظام');
            return Promise.reject(error);
        } else if (error.response.status === 409) {
            window.HideLoader();
            Toaster.error(error.response.data);
            return Promise.reject(error);
        }
    }
}
