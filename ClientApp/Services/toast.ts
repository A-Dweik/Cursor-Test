import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export class Toaster {
  constructor() {
    iziToast.settings({
      rtl: true,
      position: 'topRight',
      timeout: 5000,
      transitionIn: 'fadeInDown'
    });
  }

  public success(message: string): void {
    iziToast.success({ message });
  }

  public error(message: string): void {
    iziToast.error({ message });
  }

  public warning(message: string): void {
    iziToast.warning({ message });
  }

  public info(message: string): void {
    iziToast.info({ message });
  }
}
