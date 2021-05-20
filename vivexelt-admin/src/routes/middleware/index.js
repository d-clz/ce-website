import beforeEach from './before-each'

const middleware = (router, store) => {
    beforeEach(router, store)
}

export default middleware
