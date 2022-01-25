import { createRouter, createWebHistory } from "vue-router";
import NotFound from '../views/404.vue'
import { firebaseAuth } from "../firebase/firebaseInit"

// Auth Guards
const requireAuth = (to, from, next) => {
  const user = firebaseAuth.currentUser;

  if (!user) next({ name: "Login", params: {} })
  else next();
};

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
    beforeEnter: requireAuth,
  },
  {
    path: "/create-post",
    name: "CreatePost",
    meta: {
      title: "Create Post"
    },
    component: () => import(/* webpackChunkName: "createPost" */ "../views/createPost.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/post-preview",
    name: "BlogPreview",
    meta: {
      title: "Preview Blog Post"
    },
    component: () => import(/* webpackChunkName: "blogPreview" */ "../views/blogPreview.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/view-blog/:blogid",
    name: "ViewBlog",
    meta: {
      title: "View Blog Post"
    },
    component: () => import(/* webpackChunkName: "viewBlog" */ "../views/viewBlog.vue"),
  },
  {
    path: "/edit-blog/:blogid",
    name: "EditBlog",
    meta: {
      title: "Edit Blog Post"
    },
    component: () => import(/* webpackChunkName: "editBlog" */ "../views/editBlog.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: '/:pathMatch(.*)*',
    meta: {
      title: "NotFound"
    },
    component: NotFound
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
