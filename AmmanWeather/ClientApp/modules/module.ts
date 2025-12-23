declare module 'moment-hijri';
declare module '@t2/selectto';
declare module '@t2/data-table';
declare module '@t2/wizard';
declare module 'wizard' {
    import { Vue } from 'vue-property-decorator';
    interface WizerdFunction extends Vue {
        isLastStep: boolean;
        displayPrevButton: boolean;
        activeTabIndex: number;
        nextTab(): void;
        prevTab(): void;
        deleteFile(file: any): void;
    }
}

declare module '@t2/attach-file';
declare module '@t2/hijri-meladi-picker' {
    import { Vue } from 'vue-property-decorator';
    interface PickerType extends Vue {
        clear(): void;
    }
}
declare module 'vue-application-insights';
declare module '@t2/Viewerpdf' {
    import { Vue } from 'vue-property-decorator';
    interface ViewerpdfType extends Vue {
        open(url: string): void;
    }
  }
