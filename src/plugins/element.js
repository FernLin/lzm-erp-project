import Vue from 'vue';
import {
	Input,
	Button,
	Message,
	Icon,
	Checkbox,
	Loading,
	Menu,
	MenuItem,
	MenuItemGroup,
	Submenu,
} from 'element-ui';
import '../style/element-variables.scss';

Vue.use(Input);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Checkbox);
Vue.use(Loading);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Submenu);
Vue.prototype.$message = Message;
