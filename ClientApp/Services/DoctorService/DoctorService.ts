import AxiosService from '@/Services/AxiosService';
import LoaderService from '@/Services/LoaderService';
import { Inject, Service } from 'vue-di-container';
import DoctorModel from './DoctorModel';

@Service()
export default class DoctorService {
    @Inject(AxiosService) public axiosService!: AxiosService;
    @Inject(LoaderService) public loaderService!: LoaderService;

    public async getDoctors(): Promise<DoctorModel[]> {
        try {
            this.loaderService.ShowLoader();
            // Mock data for demonstration
            const mockDoctors: DoctorModel[] = [
                {
                    id: 1,
                    name: 'د. أحمد محمد',
                    specialization: 'طب القلب',
                    experience: 15,
                    rating: 4.8,
                    availableDays: ['الأحد', 'الاثنين', 'الأربعاء'],
                    availableTimeSlots: [
                        { id: 1, time: '09:00', isAvailable: true },
                        { id: 2, time: '10:00', isAvailable: true },
                        { id: 3, time: '11:00', isAvailable: false },
                        { id: 4, time: '14:00', isAvailable: true },
                    ],
                    description: 'استشاري أمراض القلب والشرايين مع خبرة واسعة في علاج أمراض القلب'
                },
                {
                    id: 2,
                    name: 'د. فاطمة عبدالله',
                    specialization: 'طب الأطفال',
                    experience: 12,
                    rating: 4.9,
                    availableDays: ['الأحد', 'الثلاثاء', 'الخميس'],
                    availableTimeSlots: [
                        { id: 5, time: '08:00', isAvailable: true },
                        { id: 6, time: '09:00', isAvailable: true },
                        { id: 7, time: '10:00', isAvailable: true },
                        { id: 8, time: '15:00', isAvailable: true },
                    ],
                    description: 'أخصائية طب الأطفال وحديثي الولادة'
                },
                {
                    id: 3,
                    name: 'د. خالد العمري',
                    specialization: 'الجراحة العامة',
                    experience: 20,
                    rating: 4.7,
                    availableDays: ['الاثنين', 'الأربعاء', 'الخميس'],
                    availableTimeSlots: [
                        { id: 9, time: '10:00', isAvailable: true },
                        { id: 10, time: '11:00', isAvailable: true },
                        { id: 11, time: '13:00', isAvailable: false },
                        { id: 12, time: '16:00', isAvailable: true },
                    ],
                    description: 'استشاري الجراحة العامة وجراحة المناظير'
                },
                {
                    id: 4,
                    name: 'د. سارة الزهراني',
                    specialization: 'طب الأسنان',
                    experience: 8,
                    rating: 4.6,
                    availableDays: ['الأحد', 'الثلاثاء', 'الأربعاء'],
                    availableTimeSlots: [
                        { id: 13, time: '09:00', isAvailable: true },
                        { id: 14, time: '11:00', isAvailable: true },
                        { id: 15, time: '14:00', isAvailable: true },
                        { id: 16, time: '16:00', isAvailable: true },
                    ],
                    description: 'أخصائية طب وجراحة الأسنان'
                },
                {
                    id: 5,
                    name: 'د. محمد الغامدي',
                    specialization: 'العظام',
                    experience: 18,
                    rating: 4.8,
                    availableDays: ['الاثنين', 'الثلاثاء', 'الخميس'],
                    availableTimeSlots: [
                        { id: 17, time: '08:00', isAvailable: true },
                        { id: 18, time: '10:00', isAvailable: false },
                        { id: 19, time: '13:00', isAvailable: true },
                        { id: 20, time: '15:00', isAvailable: true },
                    ],
                    description: 'استشاري جراحة العظام والمفاصل'
                },
                {
                    id: 6,
                    name: 'د. نورة القحطاني',
                    specialization: 'النساء والولادة',
                    experience: 14,
                    rating: 4.9,
                    availableDays: ['الأحد', 'الثلاثاء', 'الأربعاء', 'الخميس'],
                    availableTimeSlots: [
                        { id: 21, time: '09:00', isAvailable: true },
                        { id: 22, time: '11:00', isAvailable: true },
                        { id: 23, time: '14:00', isAvailable: true },
                        { id: 24, time: '16:00', isAvailable: true },
                    ],
                    description: 'استشارية أمراض النساء والولادة'
                }
            ];
            
            this.loaderService.HideLoader();
            return mockDoctors;
        } catch (exception) {
            this.loaderService.HideLoader();
            return [];
        }
    }

    public async getDoctorById(id: number): Promise<DoctorModel | null> {
        const doctors = await this.getDoctors();
        return doctors.find(d => d.id === id) || null;
    }
}
