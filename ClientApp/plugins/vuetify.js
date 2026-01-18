import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify, {
  rtl: true,
  iconfont: 'mdi',
  theme: {
    primary: '#1B8354',
    secondary: '#424242',
    accent: '#1B8354',
    error: '#dc2626',
    success: '#1B8354',
    info: '#2563eb',
    warning: '#ea580c'
  },
});
