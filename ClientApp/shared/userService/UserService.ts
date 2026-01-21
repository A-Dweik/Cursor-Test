import AxiosService2 from '@/Services/AxiosService2';
import LoaderService from '@/Services/LoaderService';
import { Inject, Service } from 'vue-di-container';
import UserModel from './Model/UserModel';

@Service()
export default class UserService {
    @Inject(AxiosService2) public axiosService!: AxiosService2;
    @Inject(LoaderService) public loaderService!: LoaderService;

    public async getUser(): Promise<UserModel | any> {
        try {
            this.loaderService.ShowLoader();
            const url = 'api/UserInfo';
            const result = await this.axiosService.axiosInstance.get<UserModel>(url);
            this.loaderService.HideLoader();
            return result.data;
        } catch (exception) {
            return null;
        }
    }
}
