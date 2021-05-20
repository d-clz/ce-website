import EventBus from '@/core/helpers/event'
import {
    HTTP_STATUS_TOKEN_EXPIRED,
    HTTP_STATUS_UNAUTHORIZED,
    HTTP_STATUS_GONE,
    HTTP_NOT_ACCEPTABLE,
} from '@/core/constants/http'
import {
    TOKEN_EXPIRED,
    UNAUTHORIZED_REQUEST,
} from '@/core/constants/event'

const isWhiteListUnauthorizedUrl = (url) => {
    // If occurs unauthorized error with these urls. Ignore them
    const whiteListUrls = ['auth/logout']
    if (url) {
        for (let i = 0; i < whiteListUrls.length; i++) {
            if (url.includes(whiteListUrls[i])) return true
        }
    }
    return false
}

class HttpErrorHandler {
    static handle(response) {
        if (response.status === HTTP_STATUS_TOKEN_EXPIRED) {
            EventBus.$emit(TOKEN_EXPIRED)
        }
        if (response.status === HTTP_STATUS_UNAUTHORIZED && !isWhiteListUnauthorizedUrl(response.url)) {
            EventBus.$emit(UNAUTHORIZED_REQUEST)
        }
    }
}

export default HttpErrorHandler
