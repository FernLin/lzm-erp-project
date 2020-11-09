import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import './plugins/day';
import './plugins/element';
import './plugins/sweetalert2';
import './style/reset.scss';
import 'element-ui/packages/theme-chalk/src/display.scss';
import './style/common.scss';
import _ from './utils/lodash';
window._ = _;

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
