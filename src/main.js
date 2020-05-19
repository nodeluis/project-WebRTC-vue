import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, Axios);

Vue.config.productionTip = false;

import VueSocketIO from 'vue-socket.io';
 
Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://192.168.1.5:8000',
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },
    //options: { path: "/my-app/" } //Optional options
}));

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
