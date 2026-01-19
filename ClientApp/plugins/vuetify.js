import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify, {
  rtl: true,
  iconfont: 'mdi',
  theme: {
    primary: '#006C35',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#D32F2F',
    info: '#1976D2',
    success: '#006C35',
    warning: '#F57C00',
  },
});
