const Browser = {
    /**
    * Redirect to url
    * @param url
    */
    redirect(url) {
        window.location = url
    },
    /**
     * Insert param to url
     * @param myUrl
     * @param name
     * @param value
     * @returns {*}
     */
    insertParamToUrl(myUrl, name, value) {
        let newUrl = myUrl
        const re = new RegExp(`([?&]${name}=)[^&]+`, '')

        function add(sep) {
            newUrl += `${sep}${name}=${encodeURIComponent(value)}`
        }

        function change() {
            newUrl = newUrl.replace(re, `$1${encodeURIComponent(value)}`)
        }

        if (newUrl.indexOf('?') === -1) {
            add('?')
        } else if (re.test(newUrl)) {
            change()
        } else {
            add('&')
        }

        return newUrl
    },
    /**
     * Return true if this browser support localStorage
     * @returns {*}
     */
    isSupportLocalStorage() {
        if (this.supportLocalStorage === null || this.supportLocalStorage === undefined) {
            const test = 'test'

            try {
                localStorage.setItem(test, test)
                localStorage.removeItem(test)
                this.supportLocalStorage = true
            } catch (e) {
                this.supportLocalStorage = false
            }
        }

        return this.supportLocalStorage
    },
    /**
  * Get Url Param
  * @param name
  * @returns {string|null}
  */
    getURLParameter(name) {
        return (
            decodeURIComponent(
                (new RegExp(`[?|&]${name}=([^&;]+?)(&|#|;|$)`).exec(window.location.search) || [
                    null,
                    '',
                ])[1].replace(/\+/g, '%20')
            ) || null
        )
    },
}

export default Browser