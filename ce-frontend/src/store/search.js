// initial state
const state = () => ({
    seasrchValue: '',
});

const getters = {};

const actions = {
    searchTut({ commit }, value) {
        commit('setSearchValue', value)
    }
};

const mutations = {
    setSearchValue(state, searchValue) {
        state.seasrchValue = searchValue;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}