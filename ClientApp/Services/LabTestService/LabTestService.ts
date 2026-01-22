import AxiosService from '@/Services/AxiosService';
import LoaderService from '@/Services/LoaderService';
import { Inject, Service } from 'vue-di-container';
import LabTestModel from './LabTestModel';

@Service()
export default class LabTestService {
    @Inject(AxiosService) public axiosService!: AxiosService;
    @Inject(LoaderService) public loaderService!: LoaderService;

    public async getLabTests(): Promise<LabTestModel[]> {
        try {
            this.loaderService.ShowLoader();
            // Mock data for demonstration
            const mockTests: LabTestModel[] = [
                {
                    id: 1,
                    name: 'فحص الدم الشامل (CBC)',
                    category: 'تحاليل دم',
                    price: 80,
                    duration: 15,
                    requiresFasting: false,
                    availableDays: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'],
                    availableTimeSlots: [
                        { id: 1, time: '07:00', isAvailable: true },
                        { id: 2, time: '08:00', isAvailable: true },
                        { id: 3, time: '09:00', isAvailable: true },
                        { id: 4, time: '10:00', isAvailable: true },
                    ],
                    description: 'فحص شامل لخلايا الدم البيضاء والحمراء والصفائح الدموية',
                    preparationInstructions: 'لا يتطلب صيام'
                },
                {
                    id: 2,
                    name: 'فحص السكر التراكمي (HbA1c)',
                    category: 'تحاليل دم',
                    price: 120,
                    duration: 10,
                    requiresFasting: false,
                    availableDays: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'],
                    availableTimeSlots: [
                        { id: 5, time: '07:00', isAvailable: true },
                        { id: 6, time: '08:00', isAvailable: true },
                        { id: 7, time: '09:00', isAvailable: true },
                        { id: 8, time: '10:00', isAvailable: false },
                    ],
                    description: 'قياس متوسط مستوى السكر في الدم خلال الأشهر الثلاثة الماضية',
                    preparationInstructions: 'لا يتطلب صيام'
                },
                {
                    id: 3,
                    name: 'فحص الدهون الثلاثية والكوليسترول',
                    category: 'تحاليل دم',
                    price: 150,
                    duration: 15,
                    requiresFasting: true,
                    availableDays: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'],
                    availableTimeSlots: [
                        { id: 9, time: '07:00', isAvailable: true },
                        { id: 10, time: '08:00', isAvailable: true },
                        { id: 11, time: '09:00', isAvailable: false },
                    ],
                    description: 'قياس مستوى الدهون والكوليسترول في الدم',
                    preparationInstructions: 'يتطلب صيام 12 ساعة قبل الفحص'
                },
                {
                    id: 4,
                    name: 'فحص وظائف الكلى',
                    category: 'تحاليل دم',
                    price: 100,
                    duration: 15,
                    requiresFasting: true,
                    availableDays: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'],
                    availableTimeSlots: [
                        { id: 12, time: '07:00', isAvailable: true },
                        { id: 13, time: '08:00', isAvailable: true },
                        { id: 14, time: '09:00', isAvailable: true },
                    ],
                    description: 'فحص شامل لوظائف الكلى وقياس مستوى الكرياتينين واليوريا',
                    preparationInstructions: 'يفضل الصيام 8 ساعات قبل الفحص'
                },
                {
                    id: 5,
                    name: 'فحص وظائف الكبد',
                    category: 'تحاليل دم',
                    price: 110,
                    duration: 15,
                    requiresFasting: true,
                    availableDays: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'],
                    availableTimeSlots: [
                        { id: 15, time: '07:00', isAvailable: true },
                        { id: 16, time: '08:00', isAvailable: true },
                        { id: 17, time: '09:00', isAvailable: true },
                    ],
                    description: 'فحص شامل لوظائف الكبد وقياس مستوى الإنزيمات',
                    preparationInstructions: 'يفضل الصيام 8 ساعات قبل الفحص'
                },
                {
                    id: 6,
                    name: 'فحص فيتامين د (Vitamin D)',
                    category: 'تحاليل فيتامينات',
                    price: 180,
                    duration: 10,
                    requiresFasting: false,
                    availableDays: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'],
                    availableTimeSlots: [
                        { id: 18, time: '07:00', isAvailable: true },
                        { id: 19, time: '08:00', isAvailable: true },
                        { id: 20, time: '09:00', isAvailable: true },
                        { id: 21, time: '10:00', isAvailable: true },
                    ],
                    description: 'قياس مستوى فيتامين د في الدم',
                    preparationInstructions: 'لا يتطلب صيام'
                }
            ];
            
            this.loaderService.HideLoader();
            return mockTests;
        } catch (exception) {
            this.loaderService.HideLoader();
            return [];
        }
    }

    public async getLabTestById(id: number): Promise<LabTestModel | null> {
        const tests = await this.getLabTests();
        return tests.find(t => t.id === id) || null;
    }
}
