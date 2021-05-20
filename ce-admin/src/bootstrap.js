
import { detectProductionDevMode, isNonProduction, setEnv } from './core/helpers/environment'
import { setEnableLog } from './core/helpers/log'
import Detect from './core/helpers/detect'
import Router from './routes/router'
import Browser from './core/helpers/browser'
import AuthService from './core/services/auth'
import Config from './core/helpers/config'
import EventBus from './core/helpers/event'
import {
    TOKEN_EXPIRED,
    UNAUTHORIZED_REQUEST,
} from './core/constants/event'

const Bootstrap = {
    init() {
        // Prepare env & configuration
        Bootstrap.env()
        Bootstrap.config()

        // Analytics should start first
        Bootstrap.events()
    },
    env() {
        setEnv(process.env.VUE_APP_ENV)
        detectProductionDevMode()
        setEnableLog(isNonProduction())
    },
    /**
     * Init config
     */
    config() {
        this.globalConfig()
        this.otherConfig()
    },
    /**
     * Set global config
     */
    globalConfig() {
        const config = {
            env: process.env.VUE_APP_ENV,
            isLocalRun: process.env.VUE_APP_LOCAL_RUN,
            device: Detect.getDevice(),
            os: Detect.getOS(),
            browser: Detect.getBrowser(),
        }

        Config.set('global', config)
    },
    events() {
        EventBus.$on(UNAUTHORIZED_REQUEST, () => {
            Router.push({
                name: 'no_access',
            })
        })

        EventBus.$on(TOKEN_EXPIRED, () => {
            AuthService.clear()
            let redirectUrl = Browser.getURLParameter('return_url')
            if (!(redirectUrl && redirectUrl.length > 0)) {
                redirectUrl = decodeURIComponent(window.location.href)
            }
            Router.push({
                name: 'logout',
                query: {
                    return_url: redirectUrl,
                    type: 'token_expired',
                },
            })
        })
    },
    /**
   * Other config
   */
    otherConfig() {
        Config.set('api', {
            endpoint: process.env.VUE_APP_BASE_API_ENDPOINT,
        })
    },
}

export default Bootstrap