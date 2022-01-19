import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      title: "Home"
    },
    component: () => import(/* webpackChunkName: "index" */ "../views/index.vue"),
  },
  {
    path: "/blogs",
    name: "Blogs",
    meta: {
      title: "Blogs"
    },
    component: () => import(/* webpackChunkName: "blogs" */ "../views/blogs.vue"),
  },
  {
    path: "/newpost",
    name: "Newpost",
    meta: {
      title: "Newpost"
    },
    component: () => import(/* webpackChunkName: "newpost" */ "../views/index.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "Login"
    },
    component: () => import(/* webpackChunkName: "login" */ "../views/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | FireBlog`;
  next();
})

export default router;
