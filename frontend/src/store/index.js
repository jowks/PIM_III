import Vue from "vue";
import Vuex from "vuex";
import condominios from "./modules/condominios";
import pessoas from "./modules/pessoas";
import containers from "./modules/containers";
import root from "./root";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    condominios,
    pessoas,
    containers,
    root,
  },
});
