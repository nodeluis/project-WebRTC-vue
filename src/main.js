import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Axios from 'axios';
import VueAxios from 'vue-axios';
import VueSocketio from 'vue-socketio';

Vue.use(VueAxios, Axios);

Vue.config.productionTip = false;

Vue.use(VueSocketio, 'https://service-stream-sis719.herokuapp.com');

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
