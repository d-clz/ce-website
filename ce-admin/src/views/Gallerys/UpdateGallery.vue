<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-blue">
      <!-- Card stats -->
    </base-header>

    <b-container fluid class="mt--6">
      <b-row>
        <!-- Job Detail -->
        <b-col xl="12">
          <card>
            <b-row align-v="center" slot="header">
              <b-col>
                <h3 class="mb-0">Update Gallery</h3>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="8"
                ><b-form @submit.prevent="onSubmit">
                  <div class="pl-lg-4">
                    <b-row>
                      <b-col>
                        <base-input
                          type="number"
                          label="Position"
                          placeholder="Position"
                          v-model="gallery.position"
                          name="Position"
                          ref="Position"
                          :rules="{ required: true }"
                        >
                        </base-input>
                      </b-col>
                    </b-row>
                  </div>
                  <base-button
                    type="primary"
                    :disabled="submitting"
                    :loading="submitting"
                    native-type="submit"
                    class="my-4"
                  >
                    Update
                  </base-button>
                </b-form></b-col
              >
              <b-col lg="4">
                <img :src="gallery.path" width="100%" />
                <label class="form-control-label">Image</label>

                <b-form-file
                  @input="fileChanges"
                  v-model="imgFile"
                  placeholder="Select file"
                  drop-placeholder="Drop file here..."
                  accept="image/jpeg, image/png"
                  class="button"
                ></b-form-file>
              </b-col>
            </b-row>
          </card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import galleryService from '@/api/galleryService'

export default {
  data() {
    return {
      gallery: {
        path: '',
        position: '',
        filename: '',
      },
      imgFile: null,
      submitting: false,
      isLoading: false,
    }
  },
  methods: {
    async init() {
      this.isLoading = true
      const id = this.$route.params.id
      //   await galleryService.getImageById(id).then((data) => {
      //     console.log('image', data)
      //   })
      let res = await galleryService.getGalleryById(id)
      console.log('res', res)
      if (res && res.success) {
        this.gallery = res.gallery
        this.gallery.path = process.env.VUE_APP_BASE_API_ENDPOINT + '/public/image/' + this.gallery.filename
      }
    },
    async onSubmit() {
      this.submitting = true
      let formData = new FormData()
      formData.append('vivexelt_pic', null)
      if (this.imgFile != null) {
        formData.append('vivexelt_pic', this.imgFile)
      }
      formData.append('position', this.gallery.position)

      if (this.validate()) {
        const res = await galleryService.updateGalleryById(formData, this.$route.params.id)
        if (res && res.success) {
          this.$notify({
            verticalAlign: 'bottom',
            horizontalAlign: 'center',
            type: 'success',
            message: 'Create successfully',
          })
          this.submitting = false
          this.$router.push({ name: 'gallerys' })
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
      if (!this.gallery && this.gallery.position < 1) {
        this.$notify({
          verticalAlign: 'bottom',
          horizontalAlign: 'center',
          type: 'danger',
          message: 'Title is invalid',
        })
        valid = false
      }

      return valid
    },

    fileChanges(file) {
      this.gallery.path = URL.createObjectURL(file)
      this.$emit('imgChange', file)
    },
  },
  async mounted() {
    this.init()
  },
}
</script>
