import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Condominios from "../views/Condominios.vue";
import Pessoas from "../views/Pessoas.vue";
import Container from "../views/Containers.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/condominios",
    name: "Condominios",
    component: Condominios,
  },
  {
    path: "/pessoas",
    name: "Pessoas",
    component: Pessoas,
  },
  {
    path: "/container",
    name: "Container",
    component: Container,
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
