<template>
	<div :class="['navigation-container', { unfold: isCollapse }]">
		<el-menu :defaultActive="defaultActive" class="el-menu-vertical-demo" @select="jumpTo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :uniqueOpened="true" :collapse="isCollapse">
			<el-submenu index="EventManagement">
				<template slot="title">
					<i class="el-icon-s-management"></i>
					<span>活动管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="Carousel">轮播图</el-menu-item>
				</el-menu-item-group>
				<el-menu-item-group>
					<el-menu-item index="LimitedTimeSpike">限时秒杀</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="ShopManagement">
				<template slot="title">
					<i class="el-icon-s-shop"></i>
					<span>店铺管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="UpstreamShop">上下游店铺</el-menu-item>
					<el-menu-item index="AgricultureShop">农林店铺</el-menu-item>
					<el-menu-item index="SecondHandShop">二手店铺</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<!-- <el-submenu index="CustomManagement">
				<template slot="title">
					<i class="el-icon-s-claim"></i>
					<span>定制管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="EnterpriseApplication">企业申请</el-menu-item>
					<el-menu-item index="EnterpriseList">企业列表</el-menu-item>
				</el-menu-item-group>
			</el-submenu> -->
			<el-submenu index="MallManagement">
				<template slot="title">
					<i class="el-icon-s-goods"></i>
					<span>商城管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="MallSortPage">分类管理</el-menu-item>
					<el-menu-item index="MallProductPage">商品管理</el-menu-item>
					<el-menu-item index="MallOrderPage">订单管理</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="UpstreamManagement">
				<template slot="title">
					<i class="el-icon-s-order"></i>
					<span>上游管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="UpstreamProductPage">商品管理</el-menu-item>
					<el-menu-item index="UpstreamOrderPage">订单管理</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="MiddleManagement">
				<template slot="title">
					<i class="el-icon-s-release"></i>
					<span>中端管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="MiddleProductPage">商品管理</el-menu-item>
					<el-menu-item index="MiddleOrderPage">订单管理</el-menu-item>
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
			defaultActive: 'EventManagement-Carousel',
		};
	},
	beforeMount() {
		if (this.$route.name) this.defaultActive = this.$route.name.toString().split('-')[1];
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
