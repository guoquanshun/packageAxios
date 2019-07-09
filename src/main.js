import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import MyAxios from './assets/js/myAxios';
import apis from './assets/js/apiConfig';

axios.defaults.baseURL = 'http://localhost:3000/';

Vue.prototype.MyAxios = MyAxios(apis);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
