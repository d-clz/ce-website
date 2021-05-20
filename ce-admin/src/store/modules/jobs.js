import api from "@/api/jobService";
import { HTTP } from "@/core/http-common";

// initial state
const state = () => ({
  all: []
});

// getters
const getters = {};

// actions
const actions = {
  getAllJobs({ commit }, payload) {
    return api
      .testApi(payload)
      .then(response => {
        commit("setAllJobs", response.data);
      })
      .catch(err => console.log(err));
  },

  getAllJobsV2({ commit }, payload) {
    HTTP.get(`posts`)
      .then(response => {
        commit("setAllJobs", response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
};

// mutations
const mutations = {
  setAllJobs(state, jobs) {
    state.all = jobs;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
