import LocalStorage from "../helpers/localStorage"
import Cookie from "@/core/helpers/cookie"
import Browser from "@/core/helpers/browser"
import { isObject } from '@/core/utils/type'
import { base64Decode, base64Encode } from '@/core/utils/hash'
import { parseToJson } from '@/core/utils/parse'

const store = Browser.isSupportLocalStorage() ? LocalStorage : Cookie;
const getKey = (key) => `mt_${key}`;
const Storage = {
  /**
   * Set storage value
   * @param key
   * @param value
   * @param expireSeconds
   */
  set(key, value, expireSeconds = null) {
    value = JSON.stringify(value);
    if (expireSeconds) {
      store.set(
        getKey(key),
        value,
        new Date().getTime() + expireSeconds * 1000
      );
    } else {
      store.set(getKey(key), value);
    }
  },

  /**
   * Get storage value
   * @param key
   * @param defaultVal
   * @return {null}
   */
  get(key, defaultVal = null) {
    const value = store.get(getKey(key));

    try {
      return JSON.parse(value);
    } catch (e) {
      return defaultVal;
    }
  },

  /**
   * Remove by key
   * @param key
   */
  remove(key, isAddKeyPrefix = true) {
    if (isAddKeyPrefix) {
      key = getKey(key);
    }

    store.remove(key);
  },
  /**
   * Get expire duration of days
   * @param days
   * @return {number} the expire seconds of days
   */
  getDayDuration(days) {
    const oneDaySeconds = 60 * 60 * 24;

    return days * oneDaySeconds;
  },

  /**
   * Get expire duration of minutes
   * @param minute
   * @return {number} the expire seconds of minutes
   */
  getMinuteDuration(minute) {
    return minute * 60;
  },
  /**
   * Using base64 encoding
   * @param key
   * @param rawValue
   * @param expireSeconds
   * @param oldWay
   */
  setEncoding(key, rawValue, expireSeconds = null, oldWay = false) {
    let value = rawValue;

    if (rawValue && isObject(rawValue)) {
      value = JSON.stringify(rawValue);
    }

    this.set(key, base64Encode(value, oldWay), expireSeconds);
  },

  /**
   * Get value using base64 encoding
   * @param key
   * @param defaultValue
   * @param oldWay
   * @return {{}}
   */
  getDecoding(key, defaultValue = {}, oldWay = false) {
    const value = this.get(key);

    if (typeof value === "undefined" || value === null) {
      return defaultValue;
    }

    return parseToJson(base64Decode(value, oldWay), defaultValue);
  },

  /**
   * Has storage by key
   * @param key
   * @return {boolean}
   */
  has(key) {
    if (typeof store.has === "undefined") {
      return typeof this.get(getKey(key)) !== "undefined";
    }

    return store.get(getKey(key));
  },

  /**
   * Clear all
   */
  clearAll() {
    store.clearAll();
  },
};

export default Storage