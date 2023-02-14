import firebase from "firebase/app";
import store from "../store/index";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

// Guion bajo porque no la vamos a usar pero es necesaria
const beforeEnter = (_to: any, _from: any, next: any) => {
  const isAuthenticated = window.localStorage.getItem(
    `${process.env.VUE_APP_SITENAME}_refreshToken`
  );
  if (isAuthenticated) {
    next();
  }
  else next({ name: "Login" });
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/HomeView.vue"), // Lazy loading
    beforeEnter,
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"), // Lazy loading
  },
  {
    path: "/signup",
    name: "Signup",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/SignUpView.vue"), // Lazy loading
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
