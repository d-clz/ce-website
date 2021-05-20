/**
 * Generate guid
 * @return {*}
 */
export const guid = () => {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(6)
      .substring(1)
  }

  return s4() + s4()
}

// export const base64Encode = (val) => val

// export const base64Decode = (val) => val

export const base64Encode = (val, oldWay = false) => {
  if (oldWay) {
    return btoa(unescape(encodeURIComponent(val)))
  }

  return btoa(encodeURI(val))
}

/**
 * base64 decode
 * @param val
 * @param oldWay
 */
export const base64Decode = (val, oldWay) => {
  let newValue = val
  if (!isBase64(val)) {
    newValue = base64Encode(val, oldWay)
  }
  if (oldWay) {
    return decodeURIComponent(escape(atob(newValue)))
  }

  return decodeURI(atob(newValue))
}

function isBase64(str) {
  if (str === '' || str.trim() === '') {
    return false
  }
  try {
    return btoa(atob(str)) == str
  } catch (err) {
    return false
  }
}
