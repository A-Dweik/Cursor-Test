import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';  // CRITICAL: Use compiled CSS, NOT stylus!

Vue.use(Vuetify, {
  rtl: true, // Enable RTL for Arabic support
  iconfont: 'mdi', // CRITICAL: Required for Material Design Icons to work
  theme: {
    primary: '#1976D2',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
  },
});
