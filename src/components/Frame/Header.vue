<template>
    <div class="header-container">
        <div class="logo-content">
            <img src="@/assets/lzm_logo.png" />
            <span>ERP管理系统</span>
        </div>
        <div class="detail-content">
            <span class="user-content">
                <!--此处用于放置用户头像，无头像时使用默认头像-->
                <img :src="userAvatar" />
                <!--此处用于放置用户名称-->
                <span>{{ userName }}</span>
            </span>
            <img class="logout" src="@/assets/lzm_logout.png" title="退出登录" @click="logout" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header',
    components: {},
    data() {
        return {
            userAvatar: require('@/assets/lzm_default_avatar.png'), // 动态配置图像路径需要加【require】
            userName: 'Admin',
        };
    },
    methods: {
        // 退出登录事件
        logout() {
			console.log('执行退出登录操作');
			// 调用退出登录事件，清除保存的token后，跳转至登录页面
            this.$router.push({ name: 'login' });
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
            border-right: 1px solid $blcak-color;
            margin-right: 20px;
            span {
                padding-left: 8px;
            }
            img {
                width: 24px;
                height: 24px;
            }
        }
        .logout {
            cursor: pointer;
        }
    }
}
</style>
