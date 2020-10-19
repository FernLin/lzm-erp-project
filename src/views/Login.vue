<template>
	<div class="login-container">
		<img src="@/assets/lzm_login.png" />
		<div class="content">
			<div class="title">
				<div>林棕梦ERP管理系统</div>
				<div>欢迎登录</div>
			</div>
			<el-input placeholder="请输入账号" prefix-icon="el-icon-user" v-model="account"> </el-input>
			<el-input placeholder="请输入密码" prefix-icon="el-icon-lock" type="password" v-model="password"> </el-input>
			<el-checkbox v-model="remember">记住密码</el-checkbox>
			<el-button type="primary" round @click="login">登录</el-button>
			<div class="operate-content">
				<span>
					<span>没有账号？去</span>
					<span class="link" @click="jumpTo('register')">注册</span>
				</span>
				<span class="link" @click="jumpTo('forget')">忘记密码？</span>
			</div>
		</div>
	</div>
</template>

<script>
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
		login() {
			if (!this.account) {
				this.$message({
					message: '登录账户不能为空！',
					type: 'error',
				});
				return;
			}
			if (!this.password) {
				this.$message({
					message: '登录密码不能为空！',
					type: 'error',
				});
				return;
			}
			console.log('执行登录方法', this.account, this.password);
			if (this.remember) {
				console.log('执行操作，存储账户及密码');
			}
			// 调用登录接口成功后跳转至系统主页面
			this.$router.push({ path: '/' });
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
	img {
		height: 700px;
	}
	.content {
		width: 350px;
		height: 350px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		padding-left: 80px;
		.title {
			text-align: center;
			font-size: 30px;
			margin-bottom: 50px;
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
</style>
