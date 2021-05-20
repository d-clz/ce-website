import http from '../core/services/http'
import { buildQueryString } from '../util/url'
export default {
  getJobs(payload) {
    if (!payload) {
      payload = new Object()
    }
    const params = {
      limit: payload.limit || 50,
      page: payload.page || 1,
      name: payload.name || '',
      sort_field: payload.order_by || 'id',
      sort_mode: payload.order_direction || 'desc',
      countries_code: payload.countries_code || '',
      min_degree: payload.min_degree || '',
      type: payload.type || '',
      status: payload.status || '',
      department_ids: payload.department_ids || '',
      fos_ids: payload.fos_ids || ''
    }
    const url = `/admin/job-admin.json?${buildQueryString(params)}`
    return http.get(url)
  },
  getJobById(id) {
    const url = `/admin/job-admin/${id}.json`
    return http.get(url)
  },
  createJob(payload) {
    const url = '/admin/job-admin.json'
    return http.post(url, payload)
  },

  updateJob(payload) {
    const url = `/admin/job-admin/${payload.job.id}.json`
    return http.put(url, payload)
  },

  getFosAndDepartment() {
    const url = '/job/department-and-fos.json'
    return http.get(url)
  },

  countJobs(payload) {
    if (!payload) {
      payload = new Object()
    }
    const params = {
      name: payload.name || '',
      countries_code: payload.countries_code || '',
      min_degree: payload.min_degree || '',
      type: payload.type || '',
      status: payload.status || '',
      department_ids: payload.department_ids || '',
      fos_ids: payload.fos_ids || '',
      with_statistic: payload.with_statistic || '',
    }
    const url = `/admin/job-admin/count.json?${buildQueryString(params)}`
    return http.get(url)
  },

  deleteJob(payload) {
    let ids = payload.ids.join(',')
    const params = {
      ids: ids,
    }
    const url = `/admin/job-admin.json?${buildQueryString(params)}`
    return http.delete(url)
  },

  getFieldOfStudy(payload) {
    if (!payload) {
      payload = new Object()
    }
    const params = {
      limit: payload.limit || 50,
      page: payload.page || 1,
      name: payload.name || '',
      sort_field: payload.order_by || 'id',
      sort_mode: payload.order_direction || 'desc',
    }
    const url = `/admin/job-admin/fos.json?${buildQueryString(params)}`
    return http.get(url)
  },
  countFieldOfStudy(payload) {
    if (!payload) {
      payload = new Object()
    }
    const params = {
      name: payload.name || '',
      sort_field: payload.order_by || 'id',
      sort_mode: payload.order_direction || 'desc',
    }
    const url = `/admin/job-admin/fos/count.json?${buildQueryString(params)}`
    return http.get(url)
  },
  createFieldOfStudy(payload) {
    const url = `/admin/job-admin/fos.json`
    return http.post(url, payload)
  },
  updateFieldOfStudy(payload) {
    const params = {
      name: payload.name
    }
    const url = `/admin/job-admin/fos/${payload.id}.json`
    return http.post(url, params)
  },
  getDepartment(payload) {
    if (!payload) {
      payload = new Object()
    }
    const params = {
      limit: payload.limit || 50,
      page: payload.page || 1,
      name: payload.name || '',
      sort_field: payload.order_by || 'id',
      sort_mode: payload.order_direction || 'desc',
    }
    const url = `/admin/job-admin/department.json?${buildQueryString(params)}`
    return http.get(url)
  },
  countDepartment(payload) {
    if (!payload) {
      payload = new Object()
    }
    const params = {
      name: payload.name || '',
      sort_field: payload.order_by || 'id',
      sort_mode: payload.order_direction || 'desc',
    }
    const url = `/admin/job-admin/department/count.json?${buildQueryString(params)}`
    return http.get(url)
  },
  createDepartment(payload) {
    const url = `/admin/job-admin/department.json`
    return http.post(url, payload)
  },
  updateDepartment(payload) {
    const params = {
      name: payload.name
    }
    const url = `/admin/job-admin/department/${payload.id}.json`
    return http.post(url, params)
  },
  deleteFos(payload) {
    let ids = payload.ids.join(',')
    const params = {
      ids: ids,
    }
    const url = `/admin/job-admin/fos.json?${buildQueryString(params)}`
    return http.delete(url)
  },
  deleteDepartment(payload) {
    let ids = payload.ids.join(',')
    const params = {
      ids: ids,
    }
    const url = `/admin/job-admin/department.json?${buildQueryString(params)}`
    return http.delete(url)
  }
}
