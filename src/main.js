import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import './style/reset.scss';
import "./plugins/element";
import './plugins/sweetalert2';
import _ from './utils/lodash';
window._ = _;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
