import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import _ from "lodash";
import "./assets/tailwind.css";

Vue.config.productionTip = false;

Vue.prototype._ = _;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
