import Vue from 'vue';
import {
	Input,
	Button,
	Message,
	Icon,
	Checkbox,
	Loading,
} from 'element-ui';
// import '../style/element-variables.scss';

Vue.use(Input);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Checkbox);
Vue.use(Loading);
Vue.prototype.$message = Message;
