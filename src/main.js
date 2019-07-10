import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import projectAxios from './assets/js/projectAxios';
import apis from './assets/js/apiConfig';

axios.defaults.baseURL = 'http://localhost:3000/';

Vue.prototype.projectAxios = projectAxios(apis);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
