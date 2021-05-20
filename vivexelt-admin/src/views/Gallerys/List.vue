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

    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-blue" v-if="!isLoading"> </base-header>

    <b-container fluid class="mt--7" v-if="!isLoading">
      <b-row>
        <b-col>
          <b-card no-body>
            <b-card-header class="border-0">
              <b-input-group class>
                <!-- <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-search"></i>
                  </span>
                </div> -->
                <!-- <b-form-input placeholder="Search" type="text" v-model="filter.name"></b-form-input>
                <b-input-group-append>
                  <b-button v-b-toggle.collapse-1 variant="info">More filters</b-button>
                </b-input-group-append> -->
              </b-input-group>
              <b-collapse id="collapse-1" class="mt-2">
                <b-card>
                  <b-row> </b-row>
                  <b-row class="pt-15"> </b-row>
                </b-card>
              </b-collapse>
              <b-collapse id="collapse-4" v-model="visibleBulkAction" class="mt-2">
                <span class="pr-15">{{ gallerySelected.length }} selected</span>
                <b-dropdown id="dropdown-1" variant="secondary" text="Action" class="m-md-2">
                  <b-dropdown-item @click="toggleConfirmModal(true)">Delete</b-dropdown-item>
                </b-dropdown>
              </b-collapse>
            </b-card-header>
            <el-table
              class="table-responsive table dpxm-table"
              header-row-class-name="thead-light"
              :data="gallerys"
              @selection-change="selectionChanged"
            >
              <el-table-column type="selection" width="90"></el-table-column>
              <el-table-column label="Position" min-width="100px" prop="name">
                <template v-slot="{ row }">
                  <router-link :to="`/gallery/${row.id}`">
                    <b-media no-body class="align-items-center">
                      <b-media-body>
                        <span class="font-weight-600 name mb-0 text-sm">
                          {{ row.position }}
                        </span>
                      </b-media-body>
                    </b-media>
                  </router-link>
                </template>
              </el-table-column>

              <el-table-column label="Image" prop="short_description" min-width="300px">
                <template v-slot="{ row }">
                  <span class="font-16">
                    <img alt="Image placeholder" :src="url + row.filename" width="50px" />
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
                :total="totalGallery"
                v-on:change="(val) => changePage(val)"
              ></base-pagination>
            </b-card-footer>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

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
import { Table, TableColumn } from 'element-ui'
import galleryService from '@/api/galleryService'

export default {
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  data() {
    return {
      gallerys: [],
      isLoading: false,
      filter: {
        page: 1,
        limit: 2,
        name: '',
      },
      gallerySelected: [],
      visibleBulkAction: false,
      totalGallery: 0,
      confirmModal: {
        show: false,
        message: '',
      },
      entityId: 0,
      url: process.env.VUE_APP_BASE_API_ENDPOINT + '/public/image/',
    }
  },
  methods: {
    async init() {
      galleryService.getAllGallery().then((data) => {
        if (!data.success) return
        this.gallerys = data.gallerys
      })
    },
    closeConfirmModal() {
      this.confirmModal.show = false
      this.confirmModal.message = ''
      this.entityId = 0
    },

    toggleConfirmModal(isMultiple, id) {
      this.deleteMode = isMultiple === true ? 'multiple' : 'single'
      if (id) {
        this.entityId = id
      }
      this.confirmModal.show = true
      if (this.deleteMode === 'single') {
        this.confirmModal.message = `Delete this Gallery?`
      } else {
        let length = this.gallerySelected.length
        let total = this.gallerys.length
        this.confirmModal.message = `Delete ${length} out of ${total}?`
      }
    },

    async doDelete() {
      this.isLoading = true
      let res = {}
      if (this.deleteMode === 'single') {
        res = await galleryService.deleteGalleryById(this.entityId)
        console.log('res', res)
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
            message: `Delete job successfully`,
          })
        }
      } else {
        this.gallerySelected.forEach((e) => {
          galleryService.deleteGalleryById(e.id).then((res) => {
            if (res && res.success) {
              this.$notify({
                verticalAlign: 'bottom',
                horizontalAlign: 'center',
                type: 'success',
                message: `Delete job successfully`,
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
      await this.init()
      this.gallerySelected = []
      this.isLoading = false
      this.closeConfirmModal()
    },

    changePage(val) {
      this.filter.page = val
    },

    selectionChanged(selection) {
      this.gallerySelected = selection
    },
  },
  mounted() {
    this.init()
  },
  watch: {
    filter: {
      handler(val) {
        this.debounceFetchOrdersData()
      },
      deep: true,
    },
    gallerySelected: {
      handler() {
        if (this.gallerySelected && this.gallerySelected.length > 0) {
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
