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
    component: () => import(/* webpackChunkName: "login" */ "../views/login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      title: "Register"
    },
    component: () => import(/* webpackChunkName: "register" */ "../views/register.vue"),
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    meta: {
      title: "ForgotPassword"
    },
    component: () => import(/* webpackChunkName: "forgotPassword" */ "../views/forgotPassword.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    meta: {
      title: "Profile"
    },
    component: () => import(/* webpackChunkName: "profile" */ "../views/profile.vue"),
  },
  {
    path: "/create-post",
    name: "CreatePost",
    meta: {
      title: "CreatePost"
    },
    component: () => import(/* webpackChunkName: "createPost" */ "../views/createPost.vue"),
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
