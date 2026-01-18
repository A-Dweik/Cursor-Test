import AxiosService from '@/Services/AxiosService';
import LoaderService from '@/Services/LoaderService';
import { Inject, Service } from 'vue-di-container';
import Phone from './Models/Phone';
import { Toaster } from './toast';

@Service()
export default class PhoneService {
    @Inject(AxiosService) public axiosService!: AxiosService;
    @Inject(LoaderService) public loaderService!: LoaderService;

    public async getAllPhones(): Promise<Phone[]> {
        try {
            this.loaderService.ShowLoader();
            const url = 'api/phones';
            const result = await this.axiosService.axiosInstance.get<Phone[]>(url);
            this.loaderService.HideLoader();
            return result.data;
        } catch (exception) {
            this.loaderService.HideLoader();
            Toaster.error('حدث خطأ في تحميل البيانات');
            return [];
        }
    }

    public async getPhoneById(id: number): Promise<Phone | null> {
        try {
            this.loaderService.ShowLoader();
            const url = `api/phones/${id}`;
            const result = await this.axiosService.axiosInstance.get<Phone>(url);
            this.loaderService.HideLoader();
            return result.data;
        } catch (exception) {
            this.loaderService.HideLoader();
            Toaster.error('حدث خطأ في تحميل البيانات');
            return null;
        }
    }

    public async createPhone(phone: Phone): Promise<boolean> {
        try {
            this.loaderService.ShowLoader();
            const url = 'api/phones';
            await this.axiosService.axiosInstance.post(url, phone);
            this.loaderService.HideLoader();
            Toaster.success('تم إضافة الهاتف بنجاح');
            return true;
        } catch (exception) {
            this.loaderService.HideLoader();
            Toaster.error('حدث خطأ في إضافة الهاتف');
            return false;
        }
    }

    public async updatePhone(id: number, phone: Phone): Promise<boolean> {
        try {
            this.loaderService.ShowLoader();
            const url = `api/phones/${id}`;
            await this.axiosService.axiosInstance.put(url, phone);
            this.loaderService.HideLoader();
            Toaster.success('تم تحديث الهاتف بنجاح');
            return true;
        } catch (exception) {
            this.loaderService.HideLoader();
            Toaster.error('حدث خطأ في تحديث الهاتف');
            return false;
        }
    }

    public async deletePhone(id: number): Promise<boolean> {
        try {
            this.loaderService.ShowLoader();
            const url = `api/phones/${id}`;
            await this.axiosService.axiosInstance.delete(url);
            this.loaderService.HideLoader();
            Toaster.success('تم حذف الهاتف بنجاح');
            return true;
        } catch (exception) {
            this.loaderService.HideLoader();
            Toaster.error('حدث خطأ في حذف الهاتف');
            return false;
        }
    }

    public async searchPhones(query: string): Promise<Phone[]> {
        try {
            this.loaderService.ShowLoader();
            const url = `api/phones/search?query=${encodeURIComponent(query)}`;
            const result = await this.axiosService.axiosInstance.get<Phone[]>(url);
            this.loaderService.HideLoader();
            return result.data;
        } catch (exception) {
            this.loaderService.HideLoader();
            Toaster.error('حدث خطأ في البحث');
            return [];
        }
    }
}
