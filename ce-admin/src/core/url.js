/**
 * Get parameter from URL by name
 * Don't use URLSearchParams because it doesn't support IE
 * @param name string
 * @param url string
 */
export const getParameterByName = (name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[[\]]/g, "\\$&");
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

/**
 * Build query string by params
 * @param params
 * @returns {string}
 */
export const buildQueryString = params => {
  const query = [];

  Object.entries(params).map(param => {
    let [key, value] = param;
    query.push(`${key}=${encodeURIComponent(value)}`);
  });

  return query.join("&");
};

/**
 * Convert string to query
 * @param str
 */
export const stringToQuery = str => {
  const query = {};

  str.split("&").forEach(item => {
    const [key, val] = item.split("=");
    query[key] = decodeURI(val);
  });

  return query;
};
