declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

import Vue from 'vue';
import { DiContainer } from 'vue-di-container';

declare module 'vue/types/vue' {
  interface Vue {
    $di: DiContainer;
  }
}
