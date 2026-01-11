import { Component, Vue, Prop } from 'vue-property-decorator';
import WithRender from './HouseDetailsDialog.html';
import { HouseModel } from '@/Models/HouseModel';

@WithRender
@Component({})
export default class HouseDetailsDialog extends Vue {
    @Prop({ required: true }) public show!: boolean;
    @Prop({ required: true }) public house!: HouseModel | null;

    public close() {
        this.$emit('close');
    }

    public getStatusClasses(status: string): string {
        const baseClasses = 'status--text status--rounded';
        switch (status) {
            case 'available': return `${baseClasses} status--green`;
            case 'rented': return `${baseClasses} status--blue`;
            case 'maintenance': return `${baseClasses} status--orange`;
            default: return baseClasses;
        }
    }

    public getStatusText(status: string): string {
        switch (status) {
            case 'available': return 'متاح';
            case 'rented': return 'مؤجر';
            case 'maintenance': return 'صيانة';
            default: return status;
        }
    }
}
