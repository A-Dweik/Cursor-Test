import { AxiosError } from 'axios';
import { Service } from 'vue-di-container';
import { Toaster } from './toast';

@Service()
export class ErrorHandler {
  private toaster: Toaster;

  constructor() {
    this.toaster = new Toaster();
  }

  public handleError(error: AxiosError): void {
    if (!error.response) {
      this.toaster.error('حدث خطأ في الشبكة');
      return;
    }

    const status = error.response.status;

    switch (status) {
      case 500:
        this.toaster.error('خطأ داخلي في الخادم');
        break;
      case 409:
        this.toaster.warning('حدث تعارض في العملية');
        break;
      case 401:
        this.toaster.error('غير مصرح لك بالدخول');
        break;
      case 403:
        this.toaster.error('الوصول مرفوض');
        break;
      default:
        this.toaster.error('حدث خطأ غير متوقع');
    }
  }
}
