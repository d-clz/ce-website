import Browser from '@/core/helpers/browser'
import router from '@/routes/router'

export const gotoSignIn = (params = {}) => {
    router.push({ name: 'login', params: params })
}