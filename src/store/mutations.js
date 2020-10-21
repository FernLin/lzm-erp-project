// 同步操作，直接变更state
const mutations = {
	setToken: (state, token) => {
		state.admin_token = token;
	},
	setLoginUsername: (state, username) => {
		state.username = username;
	},
	setLoginPassword: (state, password) => {
		state.password = password;
	},
};

export default mutations;
