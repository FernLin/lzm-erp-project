import swal from 'sweetalert2';
import Vue from 'vue';
function isBrowser() {
	return typeof window !== 'undefined';
}
const VueSweetalert2 = function() {};
VueSweetalert2.install = function(Vue) {
	// 1. adding a global method or property
	const _swal = isBrowser()
		? swal
		: function() {
				return Promise.resolve();
		  };

	Vue.swal = _swal;

	// 4. add the instance method
	if (!Vue.prototype.hasOwnProperty('$swal')) {
		Object.defineProperty(Vue.prototype, '$swal', {
			get: function get() {
				return _swal;
			}
		});
	}
};

Vue.use(VueSweetalert2);
export const Swal = swal;
