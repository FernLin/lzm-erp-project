import { Button } from "vant";
import { Field } from "vant";
import { Dialog } from "vant";
import { Notify } from "vant";
import { Checkbox } from "vant";
import { Icon } from "vant";
import Vue from "vue";
Vue.prototype.$Dialog = Dialog;
Vue.prototype.$Notify = Notify;
Vue.use(Button);
Vue.use(Field);
Vue.use(Dialog);
Vue.use(Notify);
Vue.use(Checkbox);
Vue.use(Icon);
