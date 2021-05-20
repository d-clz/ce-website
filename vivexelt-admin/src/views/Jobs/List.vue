<template>
  <div>
    <div v-if="isLoading">
      <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-blue"> </base-header>
      <b-container fluid class="mt--7">
        <card>
          <dpmx-cl type="bullet"></dpmx-cl>
        </card>
      </b-container>
    </div>

    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-blue" v-if="!isLoading">
      <b-row> </b-row>
    </base-header>
    <b-container fluid class="mt--7" v-if="!isLoading">
      <b-row>
        <b-col>
          <b-card no-body>
            <!-- Filter -->
            <b-card-header class="border-0">
              <b-input-group class>
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-search"></i>
                  </span>
                </div>
                <b-form-input placeholder="Search" type="text" v-model="filter.name"></b-form-input>
                <b-input-group-append>
                  <b-button v-b-toggle.collapse-1 variant="info" @click="debounceFetchVideos()"
                    >Search</b-button
                  >
                </b-input-group-append>
              </b-input-group>
              <b-collapse id="collapse-4" v-model="visibleBulkAction" class="mt-2">
                <span class="pr-15">{{ jobSelected.length }} selected</span>
                <b-dropdown id="dropdown-1" variant="secondary" text="Action" class="m-md-2">
                  <b-dropdown-item @click="toggleConfirmModal(true)">Delete</b-dropdown-item>
                </b-dropdown>
              </b-collapse>
            </b-card-header>
            <el-table
              class="table-responsive table dpxm-table"
              header-row-class-name="thead-light"
              :data="posts"
              @selection-change="selectionChanged"
            >
              <el-table-column type="selection" width="90"></el-table-column>
              <el-table-column label="Image thumbnail" prop="short_description" min-width="90px">
                <template v-slot="{ row }">
                  <span class="font-16">
                    <img alt="Image placeholder" width="50px" :src="url + row.filename" />
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="Title" min-width="300px" prop="name">
                <template v-slot="{ row }">
                  <router-link :to="`/post/${row.id}`">
                    <b-media no-body class="align-items-center">
                      <b-media-body>
                        <span class="font-weight-600 name mb-0 text-sm">
                          {{ row.title }}
                        </span>
                      </b-media-body>
                    </b-media>
                  </router-link>
                </template>
              </el-table-column>

              <el-table-column label="Link video" min-width="100px">
                <template v-slot="{ row }">
                  <span class="font-16">
                    <a :href="row.link_video">Link video</a>
                  </span>
                </template>
              </el-table-column>

              <el-table-column label="Create At" min-width="150px" prop="status">
                <template v-slot="{ row }">
                  <span>{{ new Date(row.createAt).toISOString().split('T')[0] }}</span>
                </template>
              </el-table-column>

              <el-table-column label="Action" min-width="130px">
                <template v-slot="{ row }">
                  <base-button
                    icon
                    type="danger"
                    class="btn-sm"
                    @click="toggleConfirmModal(false, row.id)"
                    title="Delete"
                  >
                    <i class="ni ni-fat-remove"></i>
                  </base-button>
                </template>
              </el-table-column>
            </el-table>

            <b-card-footer class="py-4 d-flex justify-content-end">
              <base-pagination
                :per-page="filter.limit"
                :total="totalJobs"
                v-on:change="(val) => changePage(val)"
              ></base-pagination>
            </b-card-footer>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <!--Confirm modal-->
    <modal :show.sync="confirmModal.show">
      <h2>{{ this.confirmModal.message }}</h2>

      <template slot="footer">
        <base-button type="link" class="ml-auto" @click="closeConfirmModal">Close</base-button>
        <base-button type="danger" @click="doDelete" :disabled="isLoading">Delete</base-button>
      </template>
    </modal>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import LightTable from '../Tables/RegularTables/LightTable'
import { HTTP } from '@/core/http-common'
import jobService from '@/api/jobService'
import countryService from '@/api/countryService'
import postService from '@/api/postService'
import { Table, TableColumn } from 'element-ui'
import debounce from 'lodash/debounce'
import {
  MapMinimumDegree,
  MapJobType,
  MapJobStatus,
  JobStatus,
  MinimumDegree,
  JobType,
} from './constant/constant'
import { json } from 'd3'
//import DpmxSelect from "@/components/DpmxSelect";

export default {
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  data() {
    return {
      filter: {
        page: 1,
        name: '',
        limit: 50,
        min_degree: undefined,
        departments: [],
        foses: [],
        status: undefined,
        countries_code: [],
        type: undefined,
      },
      page: 1,
      jobs: [],
      departments: [],
      fieldOfStudies: [],
      countries: [],
      isLoading: false,
      totalJobs: 0,
      openingJobs: 0,
      soonJobs: 0,
      closedJobs: 0,
      jobSelected: [],
      confirmModal: {
        show: false,
        message: '',
      },
      deleteMode: '',
      entityId: 0,
      visibleBulkAction: false,
      firstTime: true,
      posts: [],
      url: process.env.VUE_APP_BASE_API_ENDPOINT + '/public/image/',
    }
  },
  computed: {
    // ...mapState("products", {
    //   all: state => state.all
    // }),
    // ...mapState("jobs", {
    //   jobs: state => state.all
    // })
    getJobStatus() {
      return JobStatus.map((s) => {
        let name = MapJobStatus().get(s) || s
        return { name: name, value: s }
      })
    },
    getMinimumDegrees() {
      return MinimumDegree.map((s) => {
        let name = MapMinimumDegree().get(s) || s
        return { name: name, value: s }
      })
    },
    getJobTypes() {
      return JobType.map((s) => {
        let name = MapJobType().get(s) || s
        return { name: name, value: s }
      })
    },
  },
  methods: {
    async init() {
      postService.getAllPost(this.filter.page, this.filter.limit).then((data) => {
        console.log(data)
        if (!data.success) return
        this.posts = data.posts
        this.totalJobs = data.total
      })
    },
    async filterJobs() {
      this.isLoading = true
      await this.getJobWithFilter()
      await this.countJob()
      this.isLoading = false
    },
    debounceFetchVideos: debounce(
      async function () {
        this.init()
      },
      500,
      {
        leading: true,
        trailing: true,
      }
    ),
    changePage(val) {
      console.log(val)
      this.filter.page = val
    },
    buildParamsForFilter() {
      let params = {
        page: this.filter.page,
        name: this.filter.name,
        limit: this.filter.limit,
        fields: 'id,country_code,id,image_url,industry,min_degree,name,open_at,close_at,type',
      }
      if (this.filter.foses && this.filter.foses.length > 0) {
        params.fos_ids = this.buildParamsForArray(this.filter.foses, 'id')
      }
      if (this.filter.departments) {
        params.department_ids = this.buildParamsForArray(this.filter.departments, 'id')
      }
      if (this.filter.countries_code) {
        params.countries_code = this.buildParamsForArray(this.filter.countries_code, 'code')
      }
      if (this.filter.status) {
        params.status = this.filter.status.value
      }
      if (this.filter.min_degree) {
        params.min_degree = this.filter.min_degree.value
      }
      if (this.filter.type) {
        params.type = this.filter.type.value
      }

      return params
    },
    buildParamsForArray(array, key) {
      let res = []
      array.forEach((e) => {
        res.push(e[key])
      })
      return res.join(',')
    },
    async getJobWithFilter() {
      let jobRes = await jobService.getJobs(this.buildParamsForFilter())
      if (!jobRes || !jobRes.success) {
        // toast
      }
      if (jobRes.jobs) {
        this.jobs = jobRes.jobs
      }
    },
    async getAllFosAndDepartment() {
      let res = await jobService.getFosAndDepartment()
      if (!res || !res.success) {
        // toast
      }
      if (res.departments) {
        this.departments = res.departments
      }
      if (res.field_of_studies) {
        this.fieldOfStudies = res.field_of_studies
      }
    },
    async countJob() {
      let params = this.buildParamsForFilter()
      if (this.firstTime) {
        params.with_statistic = true
        this.firstTime = false
      }
      let res = await jobService.countJobs(params)
      if (!res || !res.success) {
        // toast
      }
      this.totalJobs = res.count || 0
      this.soonJobs = res.count_soon || 0
      this.openingJobs = res.count_available || 0
      this.closedJobs = this.totalJobs - this.soonJobs - this.openingJobs
    },
    async getAllCountries() {
      let res = await countryService.getAllCountry()
      if (!res || !res.countries) {
        // toast
      }
      this.countries = res.countries
    },
    selectionChanged(selection) {
      this.jobSelected = selection
    },

    toggleConfirmModal(isMultiple, id) {
      this.deleteMode = isMultiple === true ? 'multiple' : 'single'
      if (id) {
        this.entityId = id
      }
      this.confirmModal.show = true
      if (this.deleteMode === 'single') {
        this.confirmModal.message = `Delete this job?`
      } else {
        let length = this.jobSelected.length
        let total = this.posts.length
        this.confirmModal.message = `Delete ${length} out of ${total}?`
      }
    },
    closeConfirmModal() {
      this.confirmModal.show = false
      this.confirmModal.message = ''
      this.entityId = 0
    },

    getJobStatusType(start, end) {
      let now = new Date().getTime() / 1000
      if (start <= now && now < end) {
        return 'success'
      } else if (now > end) {
        return 'warning'
      } else {
        return 'info'
      }
    },
    getJobStatusDisplay(start, end) {
      let now = new Date().getTime() / 1000
      if (start <= now && now < end) {
        return 'Opening'
      } else if (now > end) {
        return 'Closed'
      } else {
        return 'Scheduling'
      }
    },
    getMinDegreeDisplay(degree) {
      return MapMinimumDegree().get(degree) || degree
    },
    getJobTypeDisplay(type) {
      return MapJobType().get(type) || type
    },
    getJobTypeDisplayClass(type) {
      switch (type) {
        case 'graduated':
          return 'success'
        default:
          return 'info'
      }
      return
    },
    async doDelete() {
      this.isLoading = true
      let res = {}
      let ids = []
      if (this.deleteMode === 'single') {
        res = await postService.deletePostById(this.entityId)
        if (!res || !res.success || res.error_message) {
          this.$notify({
            verticalAlign: 'bottom',
            horizontalAlign: 'center',
            type: 'danger',
            message: res.error_message || 'Something went wrong',
          })
        } else {
          this.$notify({
            verticalAlign: 'bottom',
            horizontalAlign: 'center',
            type: 'success',
            message: `Delete successfully`,
          })

        }
      } else {
        this.jobSelected.forEach((e) => {
          postService.deletePostById(e.id).then((res) => {
            if (res && res.success) {
              this.$notify({
                verticalAlign: 'bottom',
                horizontalAlign: 'center',
                type: 'success',
                message: `Delete successfully`,
              })
            } else {
              this.$notify({
                verticalAlign: 'bottom',
                horizontalAlign: 'center',
                type: 'danger',
                message: res.error_message || 'Something went wrong',
              })
            }
          })
        })
      }
      this.entityId = 0
      this.jobSelected = []
      await this.init()
      this.isLoading = false
      this.closeConfirmModal()
    },
  },
  mounted() {
    this.init()
  },
  watch: {
    filter: {
      handler(val) {
        this.debounceFetchVideos()
      },
      deep: true,
    },
    jobSelected: {
      handler() {
        if (this.jobSelected && this.jobSelected.length > 0) {
          this.visibleBulkAction = true
        } else {
          this.visibleBulkAction = false
        }
      },
      deep: true,
    },
  },
}
</script>
