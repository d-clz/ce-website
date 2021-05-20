import Vue from "vue";
import Vuex from "vuex";
import products from "./modules/products";
import jobs from "./modules/jobs";
import auth from './modules/auth';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";
const modules = {
  products,
  jobs,
  auth,
}
const store = new Vuex.Store({
  modules: modules,
  strict: debug,
  plugins: []
});

for (const moduleName of Object.keys(modules)) {
  if (modules[moduleName].actions && modules[moduleName].actions.init) {
    store.dispatch(`${moduleName}/init`)
  }
}

export default store