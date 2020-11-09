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
	Table,
	TableColumn,
	Upload,
	DatePicker,
	Row,
	Col,
	Pagination,
	Select,
	Option,
	Dialog,
	Switch,
	Radio,
	Cascader,
	Card,
	Tooltip,
	Form,
	FormItem,
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
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Upload);
Vue.use(DatePicker);
Vue.use(Row);
Vue.use(Col);
Vue.use(Pagination);
Vue.use(Select);
Vue.use(Option);
Vue.use(Dialog);
Vue.use(Switch);
Vue.use(Radio);
Vue.use(Cascader);
Vue.use(Card);
Vue.use(Tooltip);
Vue.use(Form);
Vue.use(FormItem);
Vue.prototype.$message = Message;
