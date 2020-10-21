import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store/index';
import './style/reset.scss';
import './plugins/day';
import "./plugins/element";
import './plugins/sweetalert2';
import _ from './utils/lodash';
window._ = _;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
