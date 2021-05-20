import http from '../core/services/http'
import { buildQueryString } from '../util/url'
export default {
  getAllCountry() {
    const url = '/countries.json'
    return http.get(url)
  },
}
