import axios from "axios";
import store from '../store/index';
import vm from 'vue';
// import qs from "qs";

axios.defaults.timeout = 5000; //响应时间
axios.defaults.headers.post["Content-Type"] = "application/json"; //配置请求头
axios.defaults.baseURL = "/api"; //配置接口地址

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
	(config) => {
		//在发送请求之前做某件事
		// if (config.method === "post") {
		//   config.data = qs.stringify(config.data);
		// }
		const token = store.state.admin_token;
		if (token) {
			let getToken = `Bearer ${token}`;
			config.headers.common['Authorization'] = getToken;
		}
		return config;
	},
	(error) => {
		console.log("错误的传参");
		return Promise.reject(error);
	}
);

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
	(res) => {
		const response = res.data;
		if (response && response.code === 200) {
			return response.data;
		} else {
			vm.prototype.$message({ message: response.message, type: 'error' });
			return {};
		}
	},
	(error) => {
		console.log("网络异常");
		return Promise.reject(error);
	}
);

//返回一个Promise(发送post请求)
export function fetchPost(url, params, config) {
	return new Promise((resolve, reject) => {
		axios
			.post(url, params, config)
			.then(
				(response) => {
					resolve(response);
				},
				(err) => {
					reject(err);
				}
			)
			.catch((error) => {
				reject(error);
			});
	});
}
////返回一个Promise(发送get请求)
export function fetchGet(url, param) {
	return new Promise((resolve, reject) => {
		axios
			.get(url, { params: param })
			.then(
				(response) => {
					resolve(response);
				},
				(err) => {
					reject(err);
				}
			)
			.catch((error) => {
				reject(error);
			});
	});
}
export default {
	fetchPost,
	fetchGet,
};
