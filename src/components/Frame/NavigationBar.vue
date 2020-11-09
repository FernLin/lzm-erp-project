<template>
	<div :class="['navigation-container', { unfold: isCollapse }]">
		<el-menu :default-active="defaultActive" class="el-menu-vertical-demo" @select="jumpTo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :uniqueOpened="true" :collapse="isCollapse">
			<el-submenu index="ProductManagement">
				<template slot="title">
					<i class="el-icon-s-goods"></i>
					<span>商品管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="ProductPage">商品列表</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
		</el-menu>
		<i :class="['fold-icon', isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']" @click="changeFold"></i>
	</div>
</template>

<script>
export default {
	name: 'NavigationBar',
	components: {},
	data() {
		return {
			isCollapse: false,
			defaultActive: 'ProductPage',
		};
	},
	beforeMount() {
		if (this.$route.name) {
			console.log('执行了', this.$route.name);
			this.defaultActive = this.$route.name.toString().split('-')[1];
		}
	},
	methods: {
		// 跳转值指定路由页面
		jumpTo(routerName, path) {
			if (this.$route.name !== `${path[0]}-${path[1]}`) this.$router.push({ name: `${path[0]}-${path[1]}` });
		},
		// 收起/展开侧边栏
		changeFold() {
			this.isCollapse = !this.isCollapse;
		},
	},
};
</script>
<style lang="scss" scoped>
.navigation-container {
	width: 200px;
	height: 100%;
	margin-top: 8px;
	background-color: #545c64;
	position: relative;
	.fold-icon {
		font-size: 30px;
		color: $white-color;
		position: absolute;
		bottom: 30px;
		left: 15px;
		cursor: pointer;
	}
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
	}
}
.unfold {
	width: 65px;
}
</style>
