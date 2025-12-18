import { Service } from 'vue-di-container';

@Service()
export class LoaderService {
  private loadingCount: number = 0;

  public show(): void {
    this.loadingCount += 1;
    if (typeof document !== 'undefined') {
      document.body.classList.add('loading');
    }
  }

  public hide(): void {
    if (this.loadingCount > 0) {
      this.loadingCount -= 1;
    }

    if (this.loadingCount === 0 && typeof document !== 'undefined') {
      document.body.classList.remove('loading');
    }
  }
}
