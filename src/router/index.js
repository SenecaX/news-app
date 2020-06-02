import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import NewsHistory from "../views/NewsHistory.vue";
import SelectedHeadline from "../views/SelectedHeadline";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/hello",
    name: "HelloWorld",
    component: Home,
  },
  {
    path: "/newshistory",
    name: "NewsHistory",
    component: NewsHistory,
  },
  {
    path: "/selected",
    name: "SelectedHeadline",
    component: SelectedHeadline,
    props: true,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
