import { getCookie } from '@/utils/cookie';
// 状态存储
const state = {
	admin_token: getCookie('admin_token') || '',
	username: localStorage.getItem('admin_username') || '',
	password: localStorage.getItem('admin_password') || '',
};

export default state;
