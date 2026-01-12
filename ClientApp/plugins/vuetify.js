import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify, {
  rtl: true,
  iconfont: 'mdi',
  theme: {
    primary: '#2196F3',     // Bright Blue
    secondary: '#1565C0',   // Dark Blue
    accent: '#42A5F5',      // Light Blue
    error: '#FF5252',       // Red (keep for errors)
    info: '#03A9F4',        // Sky Blue
    success: '#00BCD4',     // Cyan Blue
    warning: '#FFC107',     // Amber (for warnings)
  },
});
