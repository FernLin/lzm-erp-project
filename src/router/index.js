import Vue from "vue";
import VueRouter from "vue-router";
import { isTokenEnable, removeLoginInfo } from '../utils/cookie';

Vue.use(VueRouter);

const modulesRouter = [
	{
		path: '/',
		component: () => import('../views/FunctionManagement/FunctionList.vue'),
		meta: {
			requiresAuth: true // 路由携带的参数，用于判断当前路由是否需要登录
		}
	},
	{
		path: 'FunctionList',
		name: 'FunctionList',
		component: () => import('../views/FunctionManagement/FunctionList.vue'),
		meta: {
			requiresAuth: true,
		}
	},
	{
		path: 'EnterpriseApplication',
		name: 'EnterpriseApplication',
		component: () => import('../views/CustomManagement/EnterpriseApplication.vue'),
		meta: {
			requiresAuth: true,
		}
	},
	{
		path: 'EnterpriseList',
		name: 'EnterpriseList',
		component: () => import('../views/CustomManagement/EnterpriseList.vue'),
		meta: {
			requiresAuth: true,
		}
	},
	{
		path: 'ShopApplication',
		name: 'ShopApplication',
		component: () => import('../views/ShopManagement/ShopApplication.vue'),
		meta: {
			requiresAuth: true,
		}
	},
	{
		path: 'ShopList',
		name: 'ShopList',
		component: () => import('../views/ShopManagement/ShopList.vue'),
		meta: {
			requiresAuth: true,
		}
	},
	{
		path: 'UpstreamSort',
		name: 'UpstreamSort',
		component: () => import('../views/SortManagement/UpstreamSort.vue'),
		meta: {
			requiresAuth: true,
		}
	},
	{
		path: 'MiddleSort',
		name: 'MiddleSort',
		component: () => import('../views/SortManagement/MiddleSort.vue'),
		meta: {
			requiresAuth: true,
		}
	},
	{
		path: 'MallSort',
		name: 'MallSort',
		component: () => import('../views/SortManagement/MallSort.vue'),
		meta: {
			requiresAuth: true,
		}
	},
	{
		path: 'AgricultureSort',
		name: 'AgricultureSort',
		component: () => import('../views/SortManagement/AgricultureSort.vue'),
		meta: {
			requiresAuth: true,
		}
	},
	{
		path: 'SecondHandSort',
		name: 'SecondHandSort',
		component: () => import('../views/SortManagement/SecondHandSort.vue'),
		meta: {
			requiresAuth: true,
		}
	}
];

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: "/",
			component: () => import('../views/Main.vue'),
			children: modulesRouter
		},
		{
			path: "/register",
			name: "register",
			component: () => import('../views/Register.vue'),
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('../views/Login.vue')
		},
		{
			path: '/forget',
			name: 'forget',
			component: () => import('../views/Forget.vue')
		},
		{
			path: '*',
			component: () => import('../views/Page404.vue')
		}
	]
});

router.beforeEach(async (to, from, next) => {
	if (to.matched.some(route => route.meta && route.meta.requiresAuth)) {
		// 1. 检查是否存在token
		const token = await isTokenEnable();
		if (!token) {
			removeLoginInfo();
			return next({
				path: '/login'
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
