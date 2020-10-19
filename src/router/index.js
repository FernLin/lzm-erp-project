import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: "/",
			component: () => import('../views/Main.vue'),
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
