import http from '../core/services/http'
import { buildQueryString } from '../util/url'
export default {
  signIn(payload) {
    const url = '/login'
    return http.post(url, payload, {}, true)
  },
}
