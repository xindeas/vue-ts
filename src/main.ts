import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// import Rx from 'rxjs/Rx'
// import VueRx from 'vue-rx'
// Vue.use(VueRx)

import '@/assets/css/element-variable.scss'
import '@/assets/css/index.scss'

Vue.config.productionTip = false;

Vue.prototype.$store = store

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
