import Vue from 'vue';
import {
	Input,
	Button,
	Message,
} from 'element-ui';
// import '../style/element-variables.scss';

Vue.use(Input);
Vue.use(Button);
Vue.prototype.$message = Message;
