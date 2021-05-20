<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-blue">
      <!-- Card stats -->
    </base-header>

    <b-container fluid class="mt--6">
      <b-row>
        <b-col xl="12">
          <card>
            <b-row align-v="center" slot="header">
              <b-col>
                <h3 class="mb-0">Update Post</h3>
              </b-col>
            </b-row>

            <b-row>
              <b-col lg="8">
                <b-form @submit.prevent="onSubmit">
                  <div class="pl-lg-4">
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
                          label="Link video"
                          placeholder="Link video"
                          v-model="post.link_video"
                          name="Link video"
                          ref="Link video"
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
                </b-form>
              </b-col>
              <b-col lg="4">
                <label class="form-control-label">Image</label>
                <img :src="this.post.image_thumbnail" width="100%" />
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
import postService from '@/api/postService'

export default {
  data() {
    return {
      post: {
        id: 0,
        title: '',
        image_thumbnail: '',
        short_description: '',
        filename: '',
        link_video: '',
      },
      imageFile: null,
      submitting: false,
      isLoading: false,
      imgFile: null,
    }
  },
  async mounted() {
    this.init()
  },
  methods: {
    async init() {
      // get job
      this.isLoading = true
      const id = this.$route.params.id
      let res = await postService.getPostById(id)
      if (res && res.success) {
        this.post = res.post
        this.post.image_thumbnail = process.env.VUE_APP_BASE_API_ENDPOINT + '/public/image/' + this.post.filename
        console.log(res.post)
      }
    },
    async onSubmit() {
      this.submitting = true
      let formData = new FormData()
      formData.append('vivexelt_pic', null)
      if (this.imgFile != null) {
        formData.append('vivexelt_pic', this.imgFile)
      }
      formData.append('title', this.post.title)
      formData.append('short_description', this.post.short_description)
      formData.append('link_video', this.post.link_video)
      this.post.seoTitle = this.removeAccents(this.post.title)
      formData.append('seoTitle', this.post.seoTitle)
      if (this.validate()) {
        const res = await postService.updatePostById(formData, this.$route.params.id)
        if (res && res.success) {
          this.$notify({
            verticalAlign: 'bottom',
            horizontalAlign: 'center',
            type: 'success',
            message: 'Update successfully',
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
        (!this.post.short_description && this.post.short_description.length < 1) ||
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
      // if (this.imageFile === null) {
      //   this.$notify({
      //     verticalAlign: 'bottom',
      //     horizontalAlign: 'center',
      //     type: 'danger',
      //     message: 'Image not change',
      //   })
      //   valid = false
      // }
      if (!this.post.link_video && this.post.link_video.length < 1) {
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
