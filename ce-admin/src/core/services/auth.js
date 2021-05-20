import Storage from "@/core/helpers/storage"
import { isEmpty } from '@/core/utils/object'

const key = "auth"
const AuthService = {
  user: {},
  getStorage() {
    return Storage.getDecoding(key, {})
  },

  /**
 * Init
 */
  init() {
    const user = this.getStorage()

    if (user && !isEmpty(user)) {
      this.set(user, false)
    }
  },

  /**
   * Set
   * @param user
   * @param storage
   */
  set(user, storage = true) {
    this.user = user || {}
    if (this.user.id) {
      // EventBus.$emit(AUTHORIZED, user);
    }
    if (storage) {
      this.storage(user)
    }
  },

  storage(data) {
    Storage.setEncoding(key, data)
  },

  /**
   * Get id
   * @returns {number}
   */
  getId() {
    return parseInt(this.user.id, 10) || 0
  },

  /**
   * Get email
   * @returns {string}
   */
  getEmail() {
    return this.user.email
  },

  /**
   * Get access token
   * @returns {string}
   */
  getAccessToken() {
    return this.user.accessToken
  },

  /**
   * Is authenticated
   * @returns {boolean}
   */
  isAuthenticated() {
    return this.user.accessToken ? true : false
  },

  /**
   * Clear user in storage
   */
  clear() {
    Storage.remove(key)
  },
}

export const getUserId = () => AuthService.getId()

export default AuthService
