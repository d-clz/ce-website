import Vue from "vue";
import Vuex from "vuex";
import search from "./search";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";
const modules = {
    search
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