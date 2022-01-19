import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "index" */ "../views/index.vue"),
  },
  {
    path: "/blogs",
    name: "Blogs",
    component: () => import(/* webpackChunkName: "blogs" */ "../views/blogs.vue"),
  },
  {
    path: "/newpost",
    name: "Newpost",
    component: () => import(/* webpackChunkName: "newpost" */ "../views/index.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ "../views/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
