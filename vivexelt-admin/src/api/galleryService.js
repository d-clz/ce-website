import http from '../core/services/http'


export default {
    getAllGallery() {
        const url = '/image/get-all-image'
        return http.get(url);
    },

    createGallery(payload) {
        const url = '/image/upload-one'
        return http.post(url, payload);
    },

    getGalleryById(id) {
        const url = '/image/get-one/' + id;
        return http.get(url);
    },

    updateGalleryById(payload, id) {
        const url = `/image/update-image/` + id;
        return http.put(url, payload)
    },

    deleteGalleryById(id, isMultiple) {
        const url = `/image/delete-image/` + id;
        return http.post(url)
    },

    getImageById(id) {
        const url = '/image/send-image/' + id;
        return http.get(url);
    },
}