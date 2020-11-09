<template>
	<div class="login-container">
		<div class="content">
			<img src="@/assets/lzm_login.png" />
			<div class="detail">
				<div class="title">
					<div>欢迎登录林棕梦ERP管理系统</div>
				</div>
				<el-input class="login-input" placeholder="请输入账号" v-model="account">
					<img slot="prefix" class="login-image" src="../assets/lzm_username.png" />
				</el-input>
				<el-input class="login-input" placeholder="请输入密码" type="password" v-model="password">
					<img slot="prefix" class="login-image" src="../assets/lzm_password.png" />
				</el-input>
				<!-- <el-checkbox v-model="remember">记住密码</el-checkbox> -->
				<el-button type="primary" style="width: 80%; margin: 0 auto" round @click="login">登录</el-button>
				<!--当前系统不需要注册账号，所以将其隐藏，需要时打开即可-->
				<!-- <div class="operate-content">
					<span>
						<span>没有账号？去</span>
						<span class="link" @click="jumpTo('register')">注册</span>
					</span>
					<span class="link" @click="jumpTo('forget')">忘记密码？</span>
				</div> -->
			</div>
		</div>
	</div>
</template>

<script>
import { UserLogin, GetUserInfo } from '../api/userControl';
import { setLoginUserInfo } from '@/utils/cookie';
export default {
	name: 'Login',
	components: {},
	data() {
		return {
			account: '',
			password: '',
			remember: false,
		};
	},
	methods: {
		async login() {
			if (!this.account) {
				this.$message.error('登录账户不能为空！');
				return;
			}
			if (!this.password) {
				this.$message.error('登录密码不能为空！');
				return;
			}
			const res = await UserLogin({ username: this.account, password: this.password });
			if (!_.isEmpty(res)) {
				setLoginUserInfo({
					res,
					username: this.account,
					password: this.password,
				});
				// 调用登录接口成功后跳转至系统主页面
				this.$router.push({ path: '/EventManagement-Carousel' });
			}
		},
		jumpTo(pageName) {
			// 跳转至对应页面
			this.$router.push({ name: pageName });
		},
	},
};
</script>
<style lang="scss" scoped>
.login-container {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	background-image: url(../assets/lzm_background.png);
	img {
		height: 700px;
	}
	.content {
		width: 600px;
		height: 350px;
		background-color: $white-color;
		border-radius: 10px;
		box-shadow: 2px -1px 20px 3px #3fa779;
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 0 20px;
		img {
			width: 250px;
			height: 260px;
		}
		.detail {
			width: 300px;
			height: 210px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.title {
				text-align: center;
				font-size: 18px;
				margin-bottom: 30px;
				font-weight: bold;
				letter-spacing: 2px;
			}
			.login-image {
				width: 18px;
				height: 18px;
			}
			.operate-content {
				display: flex;
				justify-content: space-between;
				font-size: 14px;
				.link {
					color: $login-font;
					cursor: pointer;
				}
			}
		}
	}
}
</style>
