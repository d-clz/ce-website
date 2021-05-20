<template>
  <b-container fluid class="mt--6">
    <b-row>
      <!-- Job Detail -->
      <b-col xl="12">
        <card>
          <b-row align-v="center" slot="header">
            <b-col>
              <h3 class="mb-0">{{ title }}</h3>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="8">
              <b-form>
                <div class="pl-lg-4">
                  <b-row>
                    <b-col lg="12">
                      <b-row>
                        <b-col>
                          <base-input
                            type="text"
                            label="Title"
                            placeholder="Title"
                            v-model="post.title"
                            name="Title"
                            ref="title"
                            :rules="{ required: true }"
                          >
                          </base-input>
                        </b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                </div>
                <div class="pl-lg-4">
                  <b-row>
                    <b-col>
                      <base-textarea
                        type="text"
                        label="Short Description"
                        placeholder="Short Description"
                        v-model="post.short_description"
                        name="Short Description"
                        ref="short_description"
                        :rules="{ required: true, max: 500 }"
                      >
                      </base-textarea>
                    </b-col>
                  </b-row>
                </div>
                <div class="pl-lg-4">
                  <b-row>
                    <b-col>
                      <base-input
                        type="text"
                        label="Link Video"
                        placeholder="Link Video"
                        v-model="post.link_video"
                        name="Link Video"
                        ref="Link Video"
                        :rules="{ required: true }"
                      >
                      </base-input>
                    </b-col>
                  </b-row>
                </div>

                <hr class="my-4" />
                <base-button
                  type="primary"
                  :disabled="submitting"
                  :loading="submitting"
                  @click="onSubmit()"
                  class="my-4"
                >
                  {{ btnSubmitTitle }}
                </base-button>
              </b-form>
            </b-col>
            <b-col lg="4">
              <label class="form-control-label">Image</label>
              <img :src="post.image_thumbnail" width="100%" />
              <b-form-file
                @input="fileChanges"
                v-model="imgFile"
                placeholder="Select file"
                drop-placeholder="Drop file here..."
                accept="image/jpeg, image/png"
                class="button"
                title="sadas"
              ></b-form-file>
            </b-col>
          </b-row>
        </card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import flatPicker from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import 'flatpickr/dist/themes/material_green.css'
import { MapMinimumDegree, MapJobType, MinimumDegree, JobType } from '../constant/constant'
import postService from '@/api/postService'

export default {
  components: { flatPicker },
  name: 'job-detail',
  props: {
    post: {
      type: Object,
      default: () => {
        return {
          title: '',
          short_description: '',
          link_video: '',
          image_thumbnail: '',
          seoTitle: '',
          imgFile: null,
        }
      },
      // create / edit
    },
    mode: {
      type: String,
      default: 'create',
    },
    submitting: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      datePickerConfig: {
        allowInput: true,
        mode: 'single',
        enableTime: true,
      },
      countries: [],
      isLoading: false,
      file: '',
      imgFile: null,
    }
  },
  computed: {
    title() {
      return this.mode === 'create' ? 'Create Video' : 'Update Video'
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
    openAtConfiguration() {
      return Object.assign({}, this.datePickerConfig, {
        minDate: 'today',
        onChange: this.onOpenAtOnChange(selectedDates, dateStr, instance),
      })
    },
    closeAtConfiguration() {
      let openAt = new Date(this.job.open_at)
      let minDate = new Date(openAt.setDate(openAt.getDate() + 1))
      return Object.assign({}, this.datePickerConfig, {
        minDate: minDate,
        defaultDate: minDate,
      })
    },
    btnSubmitTitle() {
      return this.mode === 'create' ? 'Create' : 'Update'
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      // await this.getAllCountries()
    },
    async onSubmit() {
      this.submitting = true
      let formData = new FormData()
      formData.append('vivexelt_pic', this.imgFile)
      formData.append('title', this.post.title)
      formData.append('short_description', this.post.short_description)
      formData.append('link_video', this.post.link_video)
      this.post.seoTitle = this.removeAccents(this.post.title)
      formData.append('seoTitle', this.post.seoTitle)

      if (this.validate() && this.mode === 'create') {
        let res = await postService.createPost(formData)
        if (res && res.success) {
          this.$notify({
            verticalAlign: 'bottom',
            horizontalAlign: 'center',
            type: 'success',
            message: 'Create successfully',
          })
          this.submitting = false
          this.$router.push({ name: 'videos' })
        } else {
          this.$notify({
            verticalAlign: 'bottom',
            horizontalAlign: 'center',
            type: 'danger',
            message: 'Something went wrong',
          })
        }
      }
      this.submitting = false
    },
    validate() {
      let valid = true
      if (!this.post.title && this.post.title.length < 1) {
        this.$notify({
          verticalAlign: 'bottom',
          horizontalAlign: 'center',
          type: 'danger',
          message: 'Title is invalid',
        })
        valid = false
      }
      if (
        (!this.post.short_description && this.post.short_description < 1) ||
        this.post.short_description.length > 500
      ) {
        this.$notify({
          verticalAlign: 'bottom',
          horizontalAlign: 'center',
          type: 'danger',
          message: 'Short Description is invalid',
        })
        valid = false
      }
      if (!this.post.link_video && this.post.link_video < 1) {
        this.$notify({
          verticalAlign: 'bottom',
          horizontalAlign: 'center',
          type: 'danger',
          message: 'Link video is invalid',
        })
        valid = false
      }

      return valid
    },
    fileChanges(file) {
      this.post.image_thumbnail = URL.createObjectURL(file)
      this.$emit('imgChange', file)
    },

    handleFileUpload() {
      this.file = this.$refs.file.files[0]
    },
    removeAccents(str) {
      return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D')
    },
  },
}
</script>
<style></style>
