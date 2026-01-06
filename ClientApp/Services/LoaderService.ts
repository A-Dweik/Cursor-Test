import { Service } from 'vue-di-container';

@Service()
export default class LoaderService {
    public ShowLoader(): void {
        window.ShowLoader();
    }
    public HideLoader(): void {
        window.HideLoader();
    }
}
