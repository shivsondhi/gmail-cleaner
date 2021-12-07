import Vue from 'vue';
import GoogleSignInButton from 'vue-google-signin-button-directive';
import App from './App.vue';
import router from './router';

import 'bootstrap/dist/css/bootstrap.min.css';

Vue.config.productionTip = false;

new Vue({
  GoogleSignInButton,
  router,
  render(h) { return h(App); },
}).$mount('#app');
