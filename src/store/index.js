import Vue from "vue";
import Vuex from "vuex";
import branches from "@/store/branches";
import tables from "@/store/tables";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    branches,
    tables,
  },
});
