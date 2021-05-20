import Auth from './auth'
import isEmpty from 'lodash/isEmpty'
import { isString } from '@/core/utils/type'
import {
  DEFAULT_REQUEST_TIMEOUT,
  HTTP_STATUS_SERVER_ERROR,
  SERVER_ERROR_MESSAGE,
  RESPONSE_TYPE_BLOB,
  RESPONSE_TYPE_JSON,
} from '../constants/http'
import HttpErrorHandler from '@/core/helpers/httpErrorHandler'

/**
 * Get header token
 * @returns object
 */
export function getHeaderToken() {
  let token = Auth.getAccessToken();
  token = token ? token : "default_token";

  return {
    "X-Access-Token": token,
  };
}

/**
 * Handle request timeout
 * @param promise
 * @param controller
 * @param ms
 * @returns {Promise<any>}
 */
export function timeout(promise, controller, ms) {
  let timeout
  return new Promise(function (resolve, reject) {
    timeout = setTimeout(function () {
      if (controller) {
        controller.abort()
      }

      reject(new Error('Request timeout'))
    }, ms)

    promise.then(resolve, reject).finally(() => {
      if (timeout) {
        clearTimeout(timeout)
      }
    })
  })
}

export const http = {
  async request(method, url, data, options = {}, useHeader = true, isLogin) {
    try {
      const fullUrl = url.indexOf('http') === 0
      let apiDomain = process.env.VUE_APP_BASE_API_ENDPOINT || '/'

      let apiUrl = fullUrl ? url : `${apiDomain}${url}`
      if (apiUrl.startsWith('//')) {
        apiUrl = apiUrl.replace(/\/\//, '/')
      }
      const token = getHeaderToken()
      let type, ms

      if (isString(options)) {
        type = options
        ms = DEFAULT_REQUEST_TIMEOUT
      } else {
        type = options.type || RESPONSE_TYPE_JSON
        ms = options.timeout || DEFAULT_REQUEST_TIMEOUT
      }

      const controller = new AbortController()
      const init = {
        method: method.toUpperCase(),
        credentials: 'same-origin',
        headers: Object.assign({}, options.headers || {}),
        signal: controller.signal,
      }

      if (token) {
        init.headers = Object.assign(init.headers, token)
      }
      if (!isEmpty(data)) {
        init.body = JSON.stringify(data)
      }

      if (data instanceof ArrayBuffer || data instanceof FormData) {
        init.body = data
      }

      const tokenKey = 'X-Access-Token'

      if (tokenKey in init.headers && init.headers[tokenKey] == '') {
        init.headers[tokenKey] = 'default_token'
      }

      if (!useHeader) {
        init.headers = {}
      }

      if (isLogin) {
        init.headers['Content-Type'] = 'application/json'
      }

      let response
      response = await timeout(fetch(apiUrl, init), controller, ms)
      if (!response.ok) {
        HttpErrorHandler.handle(response)
        let data = {}
        try {
          data = await response.json()
        } catch (error) {
          data = {}
        }

        if (response.status === HTTP_STATUS_SERVER_ERROR) {
          data = Object.assign({ message: SERVER_ERROR_MESSAGE }, data)
        }

        return Object.assign(
          {
            success: false,
            message: '',
            error: true,
            requestError: true,
            statusCode: response.status,
          },
          data
        )
      }

      if (
        type === RESPONSE_TYPE_BLOB ||
        (response.headers.get('content-type') &&
          response.headers.get('content-type').includes('text/csv'))
      ) {
        return await response.blob()
      }

      if (type === RESPONSE_TYPE_JSON) {
        return await response.json()
      }

      return await response.text()
    } catch (e) {
      return {
        jsException: e,
        success: false,
        error: true,
        requestError: true,
        message: SERVER_ERROR_MESSAGE,
      }
    }
  },
  get(url, options) {
    return this.request('get', url, {}, options)
  },
  post(url, data, options, isLogin) {
    return this.request('post', url, data, options, true, isLogin)
  },
  put(url, data, options) {
    return this.request('put', url, data, options)
  },
  patch(url, data, options) {
    return this.request('patch', url, data, options)
  },
  delete(url, data = {}, options) {
    return this.request('delete', url, data, options)
  },
  getWithNoHeader(url, options = { type: RESPONSE_TYPE_JSON }) {
    return this.request('get', url, {}, true, options, false)
  },
}

export default http