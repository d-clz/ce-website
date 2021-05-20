/**
 * Build query string by params
 * @param params
 * @returns {string}
 */
export const buildQueryString = (params, encode = false) => {
    const query = []

    Object.entries(params).map((param) => {
        let [key, value] = param
        // Replace all % with %25 so when browser decode url we will get correct query string param
        if (typeof value === typeof '') {
            if (encode) {
                value = encodeURIComponent(value)
            } else {
                value = value.split('%').join('%25')
                value = value.split('#').join('%23')
            }
        }
        query.push(`${key}=${value}`)
    })

    return query.join('&')
}