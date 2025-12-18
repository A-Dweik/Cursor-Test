import { container } from 'vue-di-container';
import { AxiosService } from '@/Services/AxiosService';

export default async function applicationInitialization(): Promise<void> {
  const resolver = (container as any).resolve ? (container as any).resolve(AxiosService) : null;
  const axiosService: AxiosService = resolver || new AxiosService();

  try {
    const response = await axiosService.axios.get('/config.json');
    (window as any).config = response.data;
  } catch (error) {
    console.error('Failed to load config.json', error);
  }
}
