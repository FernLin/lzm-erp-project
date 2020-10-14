import Vue from "vue";
import VueRouter from "vue-router";
import Register from "../views/Register.vue";
import Success from "../views/Success.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "register",
    component: Register
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/success",
    name: "success",
    component: Success
  }
];

const router = new VueRouter({
  routes
});

export default router;
