<template>
  <div>
    <b-card no-body class="bg-default shadow"></b-card>
    <div v-if="isLoading">
      <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-blue"> </base-header>
      <b-container fluid class="mt--7">
        <card>
          <dpmx-cl type="bullet"></dpmx-cl>
        </card>
      </b-container>
    </div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-blue" v-if="!isLoading">
      <!-- Card stats -->
    </base-header>
    <b-container fluid class="mt--7" v-if="!isLoading">
      <!-- Start FOS -->
      <b-row>
        <b-col>
          <b-card no-body>
            <!-- Filter -->
            <b-card-header class="bg-transparent border-0 pb-0">
              <h3 class="mb-0">Field Of Study</h3>
            </b-card-header>
            <b-card-header class="border-0">
              <div>
                <b-input-group class>
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-search"></i>
                    </span>
                  </div>
                  <b-form-input
                    placeholder="Search"
                    type="text"
                    v-model="fFilter.name"
                  ></b-form-input>
                  <b-input-group-append>
                    <b-button @click="toggleModal('fos', 'create')" variant="primary"
                      >Add New</b-button
                    >
                  </b-input-group-append>
                </b-input-group>
              </div>
              <div>
                <b-collapse id="collapse-4" v-model="visibleActionFos" class="mt-2">
                  <span class="pr-15">{{ fosSelected.length }} selected</span>
                  <b-dropdown id="dropdown-1" variant="secondary" text="Action" class="m-md-2">
                    <b-dropdown-item @click="toggleConfirmModal('fos', true)"
                      >Delete</b-dropdown-item
                    >
                  </b-dropdown>
                </b-collapse>
              </div>
            </b-card-header>
            <!-- End Filter -->
            <el-table
              class="table-responsive table dpxm-table"
              header-row-class-name="thead-light"
              :data="fieldOfStudies"
              @selection-change="fosSelectionChanged"
            >
              <el-table-column type="selection" width="90"></el-table-column>
              <el-table-column label="Name" min-width="310px" prop="name">
                <template v-slot="{ row }">
                  <b-media no-body class="align-items-center">
                    <b-media-body>
                      <span class="font-weight-600 name mb-0 text-sm">{{ row.name }}</span>
                    </b-media-body>
                  </b-media>
                </template>
              </el-table-column>
              <el-table-column label="Action" min-width="140px">
                <template v-slot="{ row }">
                  <base-button
                    icon
                    type="info"
                    class="btn-sm"
                    @click="toggleModal('fos', 'update', row.id)"
                    title="Edit"
                  >
                    <i class="ni ni-ruler-pencil"></i>
                  </base-button>

                  <base-button
                    icon
                    type="danger"
                    class="btn-sm"
                    @click="toggleConfirmModal('fos', false, row.id)"
                    title="Delete"
                  >
                    <i class="ni ni-fat-remove"></i>
                  </base-button>
                </template>
              </el-table-column>
            </el-table>

            <b-card-footer class="py-4 d-flex justify-content-end">
              <base-pagination
                :per-page="fFilter.limit"
                :total="totalFos"
                v-on:change="(val) => changeFosPage(val)"
              ></base-pagination>
            </b-card-footer>
          </b-card>
        </b-col>
      </b-row>
      <!-- End FOS -->
      <div class="mt-5"></div>
      <!-- Start Department -->
      <b-row>
        <b-col>
          <b-card no-body>
            <!-- Filter -->
            <b-card-header class="bg-transparent border-0 pb-0">
              <h3 class="mb-0">Department</h3>
            </b-card-header>
            <b-card-header class="border-0">
              <div>
                <b-input-group class>
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-search"></i>
                    </span>
                  </div>
                  <b-form-input
                    placeholder="Search"
                    type="text"
                    v-model="dFilter.name"
                  ></b-form-input>
                  <b-input-group-append>
                    <b-button @click="toggleModal('department', 'create')" variant="primary"
                      >Add New</b-button
                    >
                  </b-input-group-append>
                </b-input-group>
              </div>
              <div>
                <div>
                  <b-collapse id="collapse-4" v-model="visibleActionDepartment" class="mt-2">
                    <span class="pr-15">{{ departmentSelected.length }} selected</span>
                    <b-dropdown id="dropdown-1" variant="secondary" text="Action" class="m-md-2">
                      <b-dropdown-item @click="toggleConfirmModal('deparment', true)"
                        >Delete</b-dropdown-item
                      >
                    </b-dropdown>
                  </b-collapse>
                </div>
              </div>
            </b-card-header>
            <!-- End Filter -->
            <el-table
              class="table-responsive table dpxm-table"
              header-row-class-name="thead-light"
              :data="departments"
              @selection-change="departmentSelectionChanged"
            >
              <el-table-column type="selection" width="90"></el-table-column>
              <el-table-column label="Name" min-width="310px" prop="name">
                <template v-slot="{ row }">
                  <b-media no-body class="align-items-center">
                    <b-media-body>
                      <span class="font-weight-600 name mb-0 text-sm">{{ row.name }}</span>
                    </b-media-body>
                  </b-media>
                </template>
              </el-table-column>
              <el-table-column label="Action" min-width="140px">
                <template v-slot="{ row }">
                  <base-button
                    icon
                    type="info"
                    class="btn-sm"
                    @click="toggleModal('department', 'update', row.id)"
                    title="Edit"
                  >
                    <i class="ni ni-ruler-pencil"></i>
                  </base-button>

                  <base-button
                    icon
                    type="danger"
                    class="btn-sm"
                    @click="toggleConfirmModal('department', false, row.id)"
                    title="Delete"
                  >
                    <i class="ni ni-fat-remove"></i>
                  </base-button>
                </template>
              </el-table-column>
            </el-table>

            <b-card-footer class="py-4 d-flex justify-content-end">
              <base-pagination
                :per-page="dFilter.limit"
                :total="totalDepartment"
                v-on:change="(val) => changeDepartmentPage(val)"
              ></base-pagination>
            </b-card-footer>
          </b-card>
        </b-col>
      </b-row>
      <!-- End Department -->
    </b-container>

    <!--Classic modal-->
    <modal :show.sync="showFosModal" title="BootstrapVue" @close="closeModal">
      <h2 slot="header" class="modal-title">{{ getCreateModalTitle }}</h2>
      <b-row>
        <b-col>
          <base-input type="text" placeholder="Name" v-model="entityName"></base-input>
        </b-col>
      </b-row>

      <template slot="footer">
        <base-button type="link" class="ml-auto" @click="closeModal">Close</base-button>
        <base-button type="primary" @click="doAction" :disabled="isLoading"
          >Save changes</base-button
        >
      </template>
    </modal>

    <!--Confirm modal-->
    <modal :show.sync="confirmModal.show">
      <h2>{{ this.confirmModal.message }}</h2>

      <template slot="footer">
        <base-button type="link" class="ml-auto" @click="closeConfirmModal">Close</base-button>
        <base-button type="danger" @click="doAction" :disabled="isLoading">Delete</base-button>
      </template>
    </modal>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { HTTP } from '@/core/http-common'
import jobService from '@/api/jobService'
import countryService from '@/api/countryService'
import { Table, TableColumn } from 'element-ui'
import debounce from 'lodash/debounce'
import {
  MapMinimumDegree,
  MapJobType,
  MapJobStatus,
  JobStatus,
  MinimumDegree,
  JobType,
} from '@/views/Jobs/constant/constant'
import DpmxSelect from '@/components/DpmxSelect'
import { Select, Option } from 'element-ui'

export default {
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    DpmxSelect,
    [Select.name]: Select,
    [Option.name]: Option,
  },
  data() {
    return {
      departments: [],
      fieldOfStudies: [],
      isLoading: false,
      showFosModal: false,
      confirmModal: {
        show: false,
        message: '',
      },
      currentEntity: '',
      entityName: '',
      entityId: 0,
      action: '',
      deleteMode: '',
      dFilter: {
        page: 1,
        name: '',
        limit: 2,
      },
      fFilter: {
        page: 1,
        name: '',
        limit: 2,
      },
      totalFos: 0,
      totalDepartment: 0,
      fosSelected: [],
      departmentSelected: [],
      visibleActionFos: false,
      visibleActionDepartment: false,
    }
  },
  computed: {
    // ...mapState("products", {
    //   all: state => state.all
    // }),
    // ...mapState("jobs", {
    //   jobs: state => state.all
    // })
    getCreateModalTitle() {
      let mode = this.action === 'create' ? 'Create' : this.action === 'update' ? 'Update' : 'Delete'
      let entity = this.getEntityName
      return `${mode} ${entity}`
    },
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
    getEntityName() {
      return this.currentEntity === 'fos' ? 'Field of Study' : 'Department'
    }
  },
  methods: {
    async init() {
      await this.filterFos()
      await this.filterDepartment()
    },
    async filterFos() {
      this.isLoading = true
      await this.getFieldOfStudy()
      await this.countFieldOfStudy()
      this.isLoading = false
    },
    async filterDepartment() {
      this.isLoading = true
      await this.getDepartment()
      await this.countDepartment()
      this.isLoading = false
    },
    debounceFetchFos: debounce(
      async function () {
        this.filterFos()
      },
      500,
      {
        leading: true,
        trailing: true,
      }
    ),
    debounceFetchDepartment: debounce(
      async function () {
        this.filterDepartment()
      },
      500,
      {
        leading: true,
        trailing: true,
      }
    ),

    changeFosPage(val) {
      this.fFilter.page = val
    },
    changeDepartmentPage(val) {
      this.dFilter.page = val
    },
    buildParamsForArray(array, key) {
      let res = []
      array.forEach((e) => {
        res.push(e[key])
      })
      return res.join(',')
    },
    async getFieldOfStudy() {
      let res = await jobService.getFieldOfStudy(this.fFilter)
      if (!res || !res.success) {
        this.$notify({
          verticalAlign: 'bottom',
          horizontalAlign: 'center',
          type: 'danger',
          message: res.error_message || 'Something went wrong',
        })
      }
      if (res.field_of_studies) {
        this.fieldOfStudies = res.field_of_studies
      } else {
        this.fieldOfStudies = []
      }
    },
    async countFieldOfStudy() {
      let res = await jobService.countFieldOfStudy(this.fFilter)
      if (!res || !res.success) {
        // toast
        this.$notify({
          verticalAlign: 'bottom',
          horizontalAlign: 'center',
          type: 'danger',
          message: res.error_message || 'Something went wrong',
        })
      }
      if (res.count) {
        this.totalFos = res.count
      } else {
        this.totalFos = 0
      }
    },
    async getDepartment() {
      let res = await jobService.getDepartment(this.dFilter)
      if (!res || !res.success) {
        // toast
        this.$notify({
          verticalAlign: 'bottom',
          horizontalAlign: 'center',
          type: 'danger',
          message: res.error_message || 'Something went wrong',
        })
      }
      if (res.departments) {
        this.departments = res.departments
      } else {
        this.departments = []
      }
    },
    async countDepartment() {
      let res = await jobService.countDepartment(this.dFilter)
      if (!res || !res.success) {
        // toast
        this.$notify({
          verticalAlign: 'bottom',
          horizontalAlign: 'center',
          type: 'danger',
          message: res.error_message || 'Something went wrong',
        })
      }
      if (res.count) {
        this.totalDepartment = res.count
      } else {
        this.totalDepartment = 0
      }
    },
    toggleModal(entity, mode, id) {
      this.currentEntity = entity === 'fos' ? 'fos' : 'department'
      this.action = mode
      if (id) {
        this.entityId = id
        if (this.currentEntity === 'fos') {
          let selectedFos = this.fieldOfStudies.find(e => {
            return e.id === id
          })
          this.entityName = selectedFos.name
        } else {
          let selectedDepart = this.departments.find(e => {
            return e.id === id
          })
          this.entityName = selectedDepart.name
        }
      }
      this.showFosModal = true
    },
    closeModal() {
      this.entityName = ''
      this.showFosModal = false
      this.action = ''
      this.currentEntity = ''
      this.entityId = 0
    },
    async doAction() {
      switch (this.action) {
        case 'create':
          return this.createNew()
        case 'update':
          return this.update()
        case 'delete':
          return this.delete()
      }
    },
    async createNew() {
      this.isLoading = true
      const payload = {
        name: this.entityName,
      }
      if (this.currentEntity === 'fos') {
        let res = await jobService.createFieldOfStudy(payload)
        if (!res || !res.success || res.error_message) {
          // toast
          this.$notify({
            verticalAlign: 'bottom',
            horizontalAlign: 'center',
            type: 'danger',
            message: res.error_message || 'Something went wrong',
          })
        } else {
          // toast
          this.$notify({
            verticalAlign: 'bottom',
            horizontalAlign: 'center',
            type: 'success',
            message: 'Create Field of study successfully',
          })
          await this.filterFos()
        }

      }
      if (this.currentEntity === 'department') {
        let res = await jobService.createDepartment(payload)
        if (!res || !res.success || res.error_message) {
          // toast
          this.$notify({
            verticalAlign: 'bottom',
            horizontalAlign: 'center',
            type: 'danger',
            message: res.error_message || 'Something went wrong',
          })
        } else {
          // toast
          this.$notify({
            verticalAlign: 'bottom',
            horizontalAlign: 'center',
            type: 'success',
            message: 'Create Department successfully',
          })
          await this.filterDepartment()
        }

      }
      this.isLoading = false
      this.closeModal()
    },
    async update() {
      this.isLoading = true
      const payload = {
        id: this.entityId,
        name: this.entityName,
      }
      let res = {}
      if (this.currentEntity === 'fos') {
        res = await jobService.updateFieldOfStudy(payload)
      } else {
        res = await jobService.updateDepartment(payload)
      }
      if (!res || !res.success || res.error_message) {
        // toast
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
          message: `Update ${this.getEntityName} successfully`,
        })
        if (this.currentEntity === 'fos') {
          await this.filterFos()
        } else {
          await this.filterDepartment()
        }
        this.closeModal()
      }
      this.isLoading = false
    },

    async delete() {
      this.isLoading = true
      let res = {}
      if (this.currentEntity === 'fos') {
        res = await this.deleteFos()
      } else {
        res = await this.deleteDepartment()
      }
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
          message: `Delete ${this.getEntityName} successfully`,
        })
        if (this.currentEntity === 'fos') {
          await this.filterFos()
        } else {
          await this.filterDepartment()
        }
        this.isLoading = false
        this.closeConfirmModal()
      }
    },
    fosSelectionChanged(selection) {
      this.fosSelected = selection
    },
    departmentSelectionChanged(selection) {
      this.departmentSelected = selection
    },
    toggleConfirmModal(entity, isMultiple, id) {
      this.currentEntity = entity === 'fos' ? 'fos' : 'department'
      this.action = 'delete'
      this.deleteMode = isMultiple === true ? 'multiple' : 'single'
      if (id) {
        this.entityId = id
      }
      this.confirmModal.show = true
      if (this.deleteMode === 'single') {
        this.confirmModal.message = `Delete this ${this.getEntityName} ?`
      } else {
        let length = this.currentEntity === 'fos' ? this.fosSelected.length : this.departmentSelected.length
        let total = this.currentEntity === 'fos' ? this.totalFos : this.totalDepartment
        this.confirmModal.message = `Delete ${length} out of ${total}?`
      }
    },
    closeConfirmModal() {
      this.confirmModal.show = false
      this.currentEntity = ''
      this.confirmModal.message = ''
      this.action = ''
      this.entityId = 0
    },
    deleteFos() {
      let ids = []
      if (this.deleteMode === 'single') {
        ids.push(this.entityId)
      } else {
        this.fosSelected.forEach(e => {
          ids.push(e.id)
        });
      }
      return jobService.deleteFos({
        ids: ids
      })
    },
    deleteDepartment() {
      let ids = []
      if (this.deleteMode === 'single') {
        ids.push(this.entityId)
      } else {
        this.departmentSelected.forEach(e => {
          ids.push(e.id)
        });
      }
      return jobService.deleteDepartment({
        ids: ids
      })
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    fFilter: {
      handler(val) {
        this.debounceFetchFos()
      },
      deep: true,
    },
    dFilter: {
      handler(val) {
        this.debounceFetchDepartment()
      },
      deep: true,
    },
    fosSelected: {
      handler() {
        if (this.fosSelected && this.fosSelected.length > 0) {
          this.visibleActionFos = true
        } else {
          this.visibleActionFos = false
        }
      },
      deep: true,
    },
    departmentSelected: {
      handler() {
        if (this.departmentSelected && this.departmentSelected.length > 0) {
          this.visibleActionDepartment = true
        } else {
          this.visibleActionDepartment = false
        }
      },
      deep: true,
    }
  },
}
</script>
