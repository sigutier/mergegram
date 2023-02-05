import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

// Guion bajo porque no la vamos a usar pero es necesaria
const beforeEnter = (_to: any, _from: any, next: any) => {
  const isAuthenticated = window.localStorage.getItem(
    `${process.env.VUE_APP_SITENAME}_refreshToken`
  );
  console.log(isAuthenticated);
  if (isAuthenticated) next();
  else next({ name: "Login" });
  next();
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
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"), // Lazy loading
    beforeEnter,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
