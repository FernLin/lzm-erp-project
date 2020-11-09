import Vue from 'vue';
import VueRouter from 'vue-router';
import { isTokenEnable, removeLoginInfo } from '../utils/cookie';

Vue.use(VueRouter);

const modulesRouter = [
	{
		path: '/',
		component: () => import('../views/EventManagement/Carousel.vue'),
		meta: {
			requiresAuth: true, // 路由携带的参数，用于判断当前路由是否需要登录
		},
	},
	{
		path: 'EventManagement-Carousel',
		name: 'EventManagement-Carousel',
		component: () => import('../views/EventManagement/Carousel.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: 'EventManagement-LimitedTimeSpike',
		name: 'EventManagement-LimitedTimeSpike',
		component: () => import('../views/EventManagement/LimitedTimeSpike.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: 'CustomManagement-EnterpriseApplication',
		name: 'CustomManagement-EnterpriseApplication',
		component: () => import('../views/CustomManagement/EnterpriseApplication.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: 'CustomManagement-EnterpriseList',
		name: 'CustomManagement-EnterpriseList',
		component: () => import('../views/CustomManagement/EnterpriseList.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: 'ShopManagement-UpstreamShop',
		name: 'ShopManagement-UpstreamShop',
		component: () => import('../views/ShopManagement/UpstreamShop.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: 'ShopManagement-AgricultureShop',
		name: 'ShopManagement-AgricultureShop',
		component: () => import('../views/ShopManagement/AgricultureShop.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: 'ShopManagement-SecondHandShop',
		name: 'ShopManagement-SecondHandShop',
		component: () => import('../views/ShopManagement/SecondHandShop.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: 'MallManagement-MallSortPage',
		name: 'MallManagement-MallSortPage',
		component: () => import('../views/MallManagement/SortPage.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: 'MallManagement-MallProductPage',
		name: 'MallManagement-MallProductPage',
		component: () => import('../views/MallManagement/ProductPage.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: 'MallManagement-MallOrderPage',
		name: 'MallManagement-MallOrderPage',
		component: () => import('../views/MallManagement/OrderPage.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: 'UpstreamManagement-UpstreamProductPage',
		name: 'UpstreamManagement-UpstreamProductPage',
		component: () => import('../views/UpstreamManagement/ProductPage.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: 'UpstreamManagement-UpstreamOrderPage',
		name: 'UpstreamManagement-UpstreamOrderPage',
		component: () => import('../views/UpstreamManagement/OrderPage.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: 'MiddleManagement-MiddleProductPage',
		name: 'MiddleManagement-MiddleProductPage',
		component: () => import('../views/MiddleManagement/ProductPage.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: 'MiddleManagement-MiddleOrderPage',
		name: 'MiddleManagement-MiddleOrderPage',
		component: () => import('../views/MiddleManagement/OrderPage.vue'),
		meta: {
			requiresAuth: true,
		},
	},
];

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: () => import('../views/Main.vue'),
			children: modulesRouter,
		},
		{
			path: '/register',
			name: 'register',
			component: () => import('../views/Register.vue'),
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('../views/Login.vue'),
		},
		{
			path: '/forget',
			name: 'forget',
			component: () => import('../views/Forget.vue'),
		},
		{
			path: '*',
			component: () => import('../views/Page404.vue'),
		},
	],
});

router.beforeEach(async (to, from, next) => {
	if (to.matched.some((route) => route.meta && route.meta.requiresAuth)) {
		// 1. 检查是否存在token
		const token = await isTokenEnable();
		if (!token) {
			removeLoginInfo();
			return next({
				path: '/login',
			});
		}
		if (to.path === '/') {
			return next();
		}
		return next();
	} else {
		return next();
	}
});
export default router;
