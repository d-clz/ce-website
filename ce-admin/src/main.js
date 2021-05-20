import Vue from "vue";
import DashboardPlugin from "./plugins/dashboard-plugin";
import store from "./store";
import App from "./App.vue";
import Vuex from "vuex";
// router setup
import router from "./routes/router";
import Bootstrap from './bootstrap'
// plugin setup

Bootstrap.init()
Vue.use(DashboardPlugin);
Vue.use(Vuex);

Vue.config.devtools = process.env.VUE_APP_ENV !== 'production'
/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  render: h => h(App),
  router
});
