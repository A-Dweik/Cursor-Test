import { Inject, Service } from 'vue-di-container';
import { AxiosService } from '@/Services/AxiosService';
import { UserModel } from './Model/UserModel';

@Service()
export class UserService {
  @Inject(AxiosService)
  private axiosService!: AxiosService;

  public async getUserInfo(): Promise<UserModel | null> {
    try {
      const response = await this.axiosService.axios.get<UserModel>('/api/UserInfo');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user info', error);
      return null;
    }
  }
}
