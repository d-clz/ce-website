import {
    gotoSignIn,
} from '../helper'
import AuthService from '../../core/services/auth'

const beforeEach = (router, store) => {
    router.beforeEach(async (to, from, next) => {
        const authRequired = !to.meta.noAuthRequired
        const curUrl = window.location.href

        if (authRequired && !AuthService.isAuthenticated()) {
            return gotoSignIn()
        }

        // // if valid domain
        // if (authRequired) {
        //     if (to.query && to.query.access_token) {
        //         // return processAccessToken(router, to)
        //     }
        // }
        return next()
    })
}


export default beforeEach