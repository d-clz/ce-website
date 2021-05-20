import Storage from './storage'
import { PRODUCTION, LOCAL } from '../constants/env'
import { PRODUCTION_DEV_MODE } from '../constants/storage'

let currentEnv
let productionDevMode = false

/**
 * Set current env
 * @param env
 */
export const setEnv = (env) => {
  currentEnv = env
}

/**
 * Is production
 * @return {boolean}
 */
export const isProduction = () => {
  return currentEnv === PRODUCTION
}

/**
 * Is production dev mode
 * @return {boolean}
 */
export const isProductionDev = () => {
  return productionDevMode
}

/**
 * Is non local
 * @return {boolean}
 */
export const isNonLocal = () => {
  return currentEnv !== LOCAL
}

/**
 * Is non production
 * @return {boolean}
 */
export const isNonProduction = () => {
  return !isProduction() || isProductionDev()
}

/**
 * Sometimes we need to detect user using dev mode or not because of a few feature developing
 */
export const detectProductionDevMode = () => {
  if (Storage.get(PRODUCTION_DEV_MODE)) {
    productionDevMode = true
    return
  }

  if (window.location.hash === '#dev') {
    productionDevMode = true
    Storage.set(PRODUCTION_DEV_MODE, true, Storage.getDayDuration(1))
    return
  }

  productionDevMode = false
  Storage.remove(PRODUCTION_DEV_MODE)
}
