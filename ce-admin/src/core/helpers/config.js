import { log } from './log'

const Config = {
  params: {},

  /**
   * Set value
   * @param key
   * @param value
   */
  set(key, value) {
    try {
      eval(`this.params.${key} = ${JSON.stringify(value)}`)
    } catch (error) {
      log(`Set config error: ${error}`)
    }
  },

  /**
   * Get params
   * @param key
   * @param defaultVal
   * @returns {*}
   */
  get(key, defaultVal = null) {
    try {
      if (typeof this.params === 'undefined') {
        return defaultVal
      }

      if (key.search(/[.]/g) !== -1) {
        const val = key.split('.').reduce((o, i) => o[i], this.params)

        if (typeof val !== 'undefined') {
          return val
        }
      } else if (typeof this.params[key] !== 'undefined') {
        return this.params[key]
      }
    } catch (e) {
      log(`Get config error: ${e}`)
    }

    return defaultVal
  },
}

export default Config
