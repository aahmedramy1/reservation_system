import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import _ from "lodash";
import Notifications from "vue-notification";
import "./assets/tailwind.css";

Vue.config.productionTip = false;

Vue.prototype._ = _;

Vue.use(Notifications);

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
