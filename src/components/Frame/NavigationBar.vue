<template>
	<div :class="['navigation-container', { unfold: isCollapse }]">
		<el-menu default-active="2" class="el-menu-vertical-demo" @select="jumpTo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :uniqueOpened="true" :collapse="isCollapse">
			<el-submenu index="FunctionManagement">
				<template slot="title">
					<i class="el-icon-s-management"></i>
					<span>功能管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="FunctionList">功能列表</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="CustomManagement">
				<template slot="title">
					<i class="el-icon-s-claim"></i>
					<span>定制管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="EnterpriseApplication">企业申请</el-menu-item>
					<el-menu-item index="EnterpriseList">企业列表</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="ShopManagement">
				<template slot="title">
					<i class="el-icon-s-shop"></i>
					<span>店铺管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="ShopApplication">开店申请</el-menu-item>
					<el-menu-item index="ShopList">店铺列表</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="SortManagement">
				<template slot="title">
					<i class="el-icon-s-order"></i>
					<span>分类管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="UpstreamSort">上游分类</el-menu-item>
					<el-menu-item index="MiddleSort">中端分类</el-menu-item>
					<el-menu-item index="MallSort">商城分类</el-menu-item>
					<el-menu-item index="AgricultureSort">农林分类</el-menu-item>
					<el-menu-item index="SecondHandSort">二手分类</el-menu-item>
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
		};
	},
	methods: {
		// 跳转值指定路由页面
		jumpTo(routerName) {
			this.$router.push({ name: routerName });
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
