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
                <h3 class="mb-0">Create Gallery</h3>
              </b-col>
            </b-row>
            <b-form @submit.prevent="onSubmit">
              <b-row>
                <b-col lg="8">
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

                  <div class="pl-lg-4">
                    <b-row>
                      <b-col lg="8"> </b-col>
                    </b-row>
                  </div>
                </b-col>
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
                <b-col lg="12">
                  <base-button
                    type="primary"
                    :disabled="submitting"
                    :loading="submitting"
                    native-type="submit"
                    class="my-4"
                  >
                    Create
                  </base-button>
                </b-col>
              </b-row>
            </b-form>
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
      },
      imgFile: null,
      submitting: false,
    }
  },
  methods: {
    async init() { },
    async onSubmit() {
      this.submitting = true
      let formData = new FormData()
      formData.append('vivexelt_pic', this.imgFile)
      formData.append('position', this.gallery.position)
      if (this.validate()) {
        let res = await galleryService.createGallery(formData)
        if (res || res.success) {
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
}
</script>
