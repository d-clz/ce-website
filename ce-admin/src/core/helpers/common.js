/**
 * Get byte of value
 * @param val
 * @return {number}
 */
export const byteLength = val => {
  const raw = JSON.stringify(val);
  const strLen = raw.length;

  try {
    let length = strLen;

    for (let i = strLen - 1; i >= 0; i--) {
      const code = raw.charCodeAt(i);
      if (code > 0x7f && code <= 0x7ff) {
        length++;
      } else if (code > 0x7ff && code <= 0xffff) {
        length += 2;
      }

      if (code >= 0xdc00 && code <= 0xdfff) {
        i--;
      }
    }

    return length;
  } catch (e) {
    return strLen;
  }
};
