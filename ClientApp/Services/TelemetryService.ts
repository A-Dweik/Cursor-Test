import { Service } from 'vue-di-container';
import UserModel from '../shared/userService/Model/UserModel';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import router from '../router';

@Service()
export default class TelemetryService {
    private appInsights: ApplicationInsights;
    constructor() {
        const options: any = {
            id: window.$config.ApplicationInsights.InstrumentationKey,
            routerValue: router,
            trackInitialPageView: true,
            onAfterScriptLoaded: (data: any) => {
                data.addTelemetryInitializer(
                    (envelope: any) => {
                        envelope.data.applicationName = window.$config.ApplicationInsights.ApplicationName;
                        if (typeof (envelope.baseData) === 'string') {
                            const name = envelope.baseData;
                            envelope.baseData = {};
                            envelope.baseData.name = name;
                        }
                    });
            },
        };
        const config = options.appInsightsConfig || {};
        config.instrumentationKey = config.instrumentationKey || options.id;

        if (options.appInsights) {
            this.appInsights = options.appInsights
        } else {
            this.appInsights = new ApplicationInsights({ config })
            this.appInsights.loadAppInsights()
            if (typeof (options.onAfterScriptLoaded) === 'function') {
                options.onAfterScriptLoaded(this.appInsights)
            }
        }

        const routerlocal = options.router

        if (routerlocal) {

            if (options.trackInitialPageView !== false) {
                this.setupPageTracking(options);
            } else {
                routerlocal.onReady(() => this.setupPageTracking(options))
            }

        }
    }


    private setupPageTracking(options: any) {

        const router = options.routerValue

        const baseName = options.baseName || '(Vue App)'

        router.beforeEach((route: any, from: any, next: any) => {
            const name = baseName + ' / ' + route.name;
            this.appInsights.startTrackPage(name)
            next()
        })

        router.afterEach((r: { name: string; fullPath: string; }) => {
            const name = baseName + ' / ' + r.name;
            const url = location.protocol + '//' + location.host + r.fullPath;
            this.appInsights.stopTrackPage(name, url);
            this.appInsights.flush();
        })
    }

    public async trackEvent(userInfo: UserModel | null, eventName: string, isSuccess: boolean, serNameAr: string, serNameEn: string, serType: string) {

        let userId = 'Anonymous';
        let nationality = 'Anonymous';
        let age = 'Anonymous';
        let gender = 'Anonymous';
        if (userInfo) {
            userId = userInfo.userId;
            nationality = userInfo.nationalityName;
            age = userInfo.age.toString();
            gender = (userInfo.gender === '1' ? 'M' : 'F');
        }

        this.appInsights.trackEvent({ name: `mojCE.SamsungPhones.${eventName}` }, {
            userId: `${userId}`,
            nationality: `${nationality}`,
            age: `${age}`,
            gender: `${gender}`,
            serviceNameAr: serNameAr,
            serviceName: serNameEn,
            serviceType: serType,
            isSuccessful: isSuccess,
        });
    }
}
