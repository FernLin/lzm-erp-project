import Vue from 'vue';
import VueRouter from 'vue-router';
import { isTokenEnable, removeLoginInfo } from '../utils/cookie';

Vue.use(VueRouter);

const modulesRouter = [
	{
		path: '/',
		component: () => import('../views/ProductManagement/ProductPage.vue'),
		meta: {
			requiresAuth: true, // 路由携带的参数，用于判断当前路由是否需要登录
		},
	},
	{
		path: 'ProductManagement-ProductPage',
		name: 'ProductManagement-ProductPage',
		component: () => import('../views/ProductManagement/ProductPage.vue'),
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
