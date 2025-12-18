import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { Service } from 'vue-di-container';

@Service()
export class TelemetryService {
  private appInsights: ApplicationInsights;

  constructor() {
    const config = (window as any).config || {};

    this.appInsights = new ApplicationInsights({
      config: {
        instrumentationKey: config.ApplicationInsightsKey || ''
      }
    });

    this.appInsights.loadAppInsights();
  }

  public trackPageView(name: string): void {
    this.appInsights.trackPageView({ name });
  }

  public trackEvent(name: string, properties?: Record<string, unknown>): void {
    this.appInsights.trackEvent({ name }, properties);
  }

  public setAuthenticatedUserContext(userId: string): void {
    if (userId) {
      this.appInsights.setAuthenticatedUserContext(userId);
    }
  }
}
