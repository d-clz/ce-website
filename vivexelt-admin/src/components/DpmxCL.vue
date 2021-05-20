<!-- Vue component -->
<template>
  <div>
    <vcl-facebook v-if="type === 'article'"></vcl-facebook>
    <vcl-bulletList :width="getWidth" :height="getHeight" v-if="type === 'bullet'" />
    <vcl-table :width="getWidth" :height="getHeight" v-if="type === 'table'" />
  </div>
</template>

<script>
import { VclFacebook, VclInstagram, VclBulletList, VclTable } from 'vue-content-loading'

export default {
  // OR register locally
  name: 'dpmx-cl',
  components: { VclFacebook, VclInstagram, VclBulletList, VclTable },
  props: {
    type: {
      type: String,
      default: 'article',
    },
    size: {
      type: String,
      default: '',
    },
    width: {
      type: Number,
      default: 1000,
    },
    height: {
      type: Number,
      default: 400,
    },
  },
  computed: {
    getWidth() {
      switch (this.size) {
        case 'medium':
          return 1000
        default:
          return this.width
      }
    },
    getHeight() {
      switch (this.size) {
        case 'medium':
          return 400
        default:
          return this.height
      }
    },
  },
}
</script>
