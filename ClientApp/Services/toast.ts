import 'izitoast/dist/css/iziToast.min.css';
import iZtoast from 'izitoast';

export class Toaster {
    public static error(msg: string, prefix: string = 'خطأ') {
        return iZtoast.error({
            title: prefix,
            message: msg,
            position: 'bottomLeft',
            rtl: true,
        });
    }
    public static success(msg: string, prefix: string = 'نجاح') {
        return iZtoast.success({
            title: prefix,
            message: msg,
            position: 'bottomLeft',
            timeout: 10000,
            rtl: true,
        });
    }
}
