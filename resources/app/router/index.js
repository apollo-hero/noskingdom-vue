import Vue from "vue";
import store from "../store";
import VueRouter from "vue-router";
import SideMenu from "../layouts/SideMenu";
import Dashboard from "../views/Dashboard";
import Login from "../views/Login";
import Register from "../views/Register";
import ErrorPage from "../views/ErrorPage";
import Tabulator from "../views/Tabulator";
import Download_luncher from '../views/Download_luncher';
import Support from '../views/Support';
import Shop from '../views/Shop';
import Donate from '../views/Donate';
import Settings from '../views/Settings';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: SideMenu,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/",
        name: "side-menu-dashboard",
        component: Dashboard
      },
      {
        path: "/download_luncher",
        name: "download-luncher",
        component: Download_luncher
      },
      {
        path: "/leaderboards",
        name: "leaderboards",
        component: Tabulator
      },
      {
        path: "/support",
        name: "support",
        component: Support
      },
      {
        path: "/profile",
        name: "profile",
        component: Dashboard
      },
      {
        path: "/shop",
        name: "shop",
        component: Shop
      },
      {
        path: "/donate",
        name: "donate",
        component: Donate
      },
      {
        path: "/settings",
        name: "settings",
        component: Settings
      },
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/error-page",
    name: "error-page",
    component: ErrorPage
  },
  {
    path: "/*",
    component: ErrorPage
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.main.authToken == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
