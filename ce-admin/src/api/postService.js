import http from '../core/services/http'
import { buildQueryString } from '../util/url'

export default {
    getAllPost(page, limit, search) {
        const params = {
            page: page || 1,
            limit: limit || 50,
            search: search || ''
        }
        const url = `/post/get-all-posts?${buildQueryString(params)}`
        return http.get(url);
    },

    createPost(payload) {
        const url = '/post/create-post'
        return http.post(url, payload);
    },

    getPostById(id) {
        const url = '/post/get-one-post/' + id;
        return http.get(url);
    },

    updatePostById(payload, id) {
        const url = `/post/update-post/` + id;
        return http.put(url, payload)
    },

    deletePostById(id, isMultiple) {
        const url = `/post/delete-post/` + id;
        return http.post(url)
    }
}