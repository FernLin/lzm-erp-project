<template>
	<div class="header-container">
		<div class="logo-content">
			<img src="@/assets/lzm_logo.png" />
			<span>商家管理后台</span>
		</div>
		<div class="detail-content">
			<span class="user-content">
				<!--此处用于放置用户头像，无头像时使用默认头像-->
				<img :src="userAvatar" />
				<!--此处用于放置用户名称-->
				<span>{{ userName }}</span>
			</span>
			<img class="logout" :src="logoutImg" title="退出登录" @click="logout" @mouseenter="changeImgSrc('in')" @mouseleave="changeImgSrc('out')" />
		</div>
	</div>
</template>

<script>
import { UserLogout, GetUserInfo } from '../../api/userControl';
import { removeLoginInfo } from '@/utils/cookie';
export default {
	name: 'Header',
	components: {},
	data() {
		return {
			userAvatar: require('@/assets/lzm_default_avatar.png'), // 动态配置图像路径需要加【require】
			userName: 'Admin',
			logoutImg: require('@/assets/lzm_logout.png'),
		};
	},
	async beforeMount() {
		const res = await GetUserInfo();
		if (!_.isEmpty(res)) {
			this.userName = res.username;
			this.userAvatar = res.icon;
		}
	},
	methods: {
		// 退出登录事件
		logout() {
			this.$swal
				.fire({
					title: '是否确认退出当前用户？',
					type: 'warning',
					showCancelButton: true,
					focusCancel: true,
					cancelButtonText: '取消',
					confirmButtonText: '确认',
				})
				.then(async (result) => {
					if (result.value) {
						await UserLogout();
						// 调用退出登录事件，清除保存的token后，跳转至登录页面
						removeLoginInfo();
						this.$router.push({ name: 'login' });
					}
				});
		},
		// 鼠标悬浮改变样式
		changeImgSrc(type) {
			if (type === 'in') {
				this.logoutImg = require('@/assets/lzm_logout_hover.png');
			} else {
				this.logoutImg = require('@/assets/lzm_logout.png');
			}
		},
	},
};
</script>
<style lang="scss" scoped>
.header-container {
	background-color: $white-color;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.logo-content {
		display: flex;
		align-items: center;
		font-size: 30px;
		font-weight: 800;
	}
	.detail-content {
		display: flex;
		align-items: center;
		margin-right: 30px;
		.user-content {
			display: flex;
			align-items: center;
			padding-right: 15px;
			border-right: 1px solid $black-color;
			margin-right: 20px;
			span {
				padding-left: 8px;
			}
			img {
				width: 24px;
				height: 24px;
				border: 1px solid $avatar-border;
			}
		}
		.logout {
			cursor: pointer;
			&:hover {
				content: url('../../assets/lzm_logout_hover.png');
			}
		}
	}
}
</style>
