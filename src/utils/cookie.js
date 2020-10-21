import Cookie from 'js-cookie';
import dayjs from '../plugins/day';
import store from '../store/index';
import { RefreshToken } from '../api/userControl';
const key = 'admin';
const refreshTimeKey = `${key}_refresh_time`;
const tokenKey = `${key}_token`;
const refreshTokenKey = `${key}_refresh_token`;
const loginUsernameKey = `${key}_username`;
const loginPasswordKey = `${key}_password`;
// 获取过期时间
function getExpiresTime(minute) {
	return dayjs().add(minute / 24 / 60 / 60, 'day').$d;
}

// 存储指定的cookie
export function setCookie(name, value, minute = 43200) {
	return Cookie.set(name, value, { expires: getExpiresTime(minute) });
}

// 获取指定的cookie
export function getCookie(name) {
	return Cookie.get(name);
}

// 清除指定的cookie
export function removeCookie(name) {
	return Cookie.remove(name);
}

// 存储登录用户信息
export function setLoginUserInfo(params) {
	const time = new Date().getTime();
	const res = params.res;
	localStorage.setItem(refreshTimeKey, time);
	localStorage.setItem(loginUsernameKey, params.username);
	localStorage.setItem(loginPasswordKey, params.password);
	setCookie(tokenKey, `${res.tokenHead}${res.token}`);
	setCookie(refreshTokenKey, `${res.tokenHead}${res.token}`);
	store.commit('setToken', `${res.tokenHead}${res.token}`);
	store.commit('setLoginUsername', params.username);
	store.commit('setLoginPassword', params.password);
}

// 清除登录用户信息
export function removeLoginInfo() {
	localStorage.removeItem(refreshTimeKey);
	localStorage.removeItem(loginUsernameKey);
	localStorage.removeItem(loginPasswordKey);
	removeCookie(tokenKey);
	removeCookie(refreshTokenKey);
	store.commit('setToken', '');
	store.commit('setLoginUsername', '');
	store.commit('setLoginPassword', '');
}

// 刷新并保存token
const refreshAndSaveToken = async () => {
	try {
		const refresh_token = getCookie(refreshTokenKey);
		if (!refresh_token) {
			return false;
		}
		const res = await RefreshToken();
		if (res) {
			setLoginUserInfo({
				res,
				username: localStorage.getItem(loginUsernameKey),
				password: localStorage.getItem(loginPasswordKey)
			});
			return true;
		}
		return false;
	} catch (error) {
		console.log(error);
		return false;
	}
};

// 判断储存的token是否有效
export const isTokenEnable = async () => {
	const refreshTokenTime = Number(localStorage.getItem(refreshTimeKey));
	const currentTime = new Date().getTime();
	if (currentTime - refreshTokenTime > 1000 * 60 * 60 * 24) {
		const refreshResult = await refreshAndSaveToken();
		return refreshResult;
	} else {
		return getCookie(tokenKey);
	}
};
