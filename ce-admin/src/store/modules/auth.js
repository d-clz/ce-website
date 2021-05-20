import AuthService from '@/core/services/auth'
import loginService from '@/api/loginService'

// initial state
const state = () => ({
    all: []
});

// getters
const getters = {};

// mutations
const mutations = {};


const actions = {
    /**
     * Init
     * @param commit
     */
    init({ commit }) {
        AuthService.init()

        if (AuthService.isAuthenticated()) {
            dispatchAuthenticate(commit, Object.assign({}, AuthService.user))
        }
    },
    /**
     * Sign in
     * @param commit
     * @param isPartner
     * @param payload
     * @returns {Promise<{success: boolean}>}
     */
    async signIn({ commit }, payload) {
        let email = payload.username
        let response = await loginService.signIn(payload)

        if (response && response.success) {
            dispatchAuthenticate(
                commit,
                transformerAuthenticate(Object.assign({ email: email }, response))
            )

            return {
                success: true,
                user: transformerAuthenticate(Object.assign({ email: email }, response)),
            }
        }

        return response
    },

    signOut(payload) {
        dispatchAuthenticate({})
        return {
            success: true,
        }
    },
}

const dispatchAuthenticate = (commit, payload) => {
    AuthService.set(payload)
}

const transformerAuthenticate = (response) => {
    return {
        id: response.user_id,
        accessToken: response.token,
        email: response.email,
        first_name: response.first_name,
        last_name: response.last_name,
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
