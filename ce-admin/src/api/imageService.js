import http from '../core/services/http'
import { buildQueryString } from '../util/url'
export default {
  uploadImage(file) {
    let formData = new FormData()
    formData.append('file', file)
    const url = `/images.json`
    return http.post(url, formData)
  },
}
