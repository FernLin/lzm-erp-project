import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const modulesRouter = [
	{
		path: '/',
		component: () => import('../views/TestPage.vue'),
		meta: {
			requiresAuth: true // 路由携带的参数，用于判断当前路由是否需要登录
		}
	},
	{
		path: 'Test',
		name: 'Test',
		component: () => import('../views/TestPage.vue'),
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

export default router;
