<template>
  <div>
    <vue-content-loading :width="1000" :height="650" v-if="type === 'default'">
      <rect x="0" y="0" rx="5" ry="5" width="40%" height="20" />
      <rect x="0" y="42" rx="5" ry="5" width="100%" height="200" />
      <rect x="0" y="265" rx="5" ry="5" width="100%" height="10" />
      <rect x="0" y="285" rx="5" ry="5" width="100%" height="10" />
      <rect x="0" y="305" rx="5" ry="5" width="100%" height="10" />
      <rect x="0" y="335" rx="5" ry="5" width="65%" height="10" />
      <rect x="75%" y="335" rx="5" ry="5" width="10%" height="10" />
      <rect x="0" y="355" rx="5" ry="5" width="65%" height="10" />
      <rect x="75%" y="355" rx="5" ry="5" width="30%" height="10" />
      <rect x="0" y="375" rx="5" ry="5" width="65%" height="10" />
      <rect x="75%" y="375" rx="5" ry="5" width="30%" height="10" />
      <rect x="0" y="395" rx="5" ry="5" width="65%" height="8" />
      <rect x="75%" y="395" rx="5" ry="5" width="30%" height="8" />
      <rect x="0" y="415" rx="5" ry="5" width="65%" height="8" />
      <rect x="75%" y="415" rx="5" ry="5" width="30%" height="8" />
      <rect x="0" y="445" rx="5" ry="5" width="65%" height="8" />
      <rect x="75%" y="445" rx="5" ry="5" width="30%" height="8" />
      <rect x="0" y="465" rx="5" ry="5" width="65%" height="8" />
      <rect x="75%" y="465" rx="5" ry="5" width="30%" height="8" />
      <rect x="0" y="485" rx="5" ry="5" width="65%" height="8" />
      <rect x="75%" y="485" rx="5" ry="5" width="30%" height="8" />
      <rect x="0" y="505" rx="5" ry="5" width="65%" height="8" />
      <rect x="75%" y="505" rx="5" ry="5" width="30%" height="8" />
      <rect x="0" y="525" rx="5" ry="5" width="65%" height="8" />
      <rect x="75%" y="525" rx="5" ry="5" width="30%" height="8" />
      <rect x="75%" y="550" rx="5" ry="5" width="10%" height="10" />
      <circle cx="76.5%" cy="590" r="18" />
      <circle cx="80%" cy="590" r="18" />
      <circle cx="83.5%" cy="590" r="18" />
      <circle cx="87%" cy="590" r="18" />
      <circle cx="90.5%" cy="590" r="18" />
      <circle cx="94%" cy="590" r="18" />
    </vue-content-loading>
    <vue-content-loading :width="900" :height="507" v-if="type === 'youtube'">
      <rect x="30" y="20" rx="0" ry="0" width="130" height="23" />
      <rect x="30" y="60" rx="0" ry="0" width="200" height="120" />
      <rect x="30" y="189" rx="0" ry="0" width="200" height="15" />
      <rect x="30" y="211" rx="0" ry="0" width="140" height="15" />
      <rect x="243" y="60" rx="0" ry="0" width="200" height="120" />
      <rect x="243" y="189" rx="0" ry="0" width="200" height="15" />
      <rect x="243" y="211" rx="0" ry="0" width="140" height="15" />
      <rect x="455" y="60" rx="0" ry="0" width="200" height="120" />
      <rect x="455" y="189" rx="0" ry="0" width="200" height="15" />
      <rect x="455" y="211" rx="0" ry="0" width="140" height="15" />
      <rect x="667" y="60" rx="0" ry="0" width="200" height="120" />
      <rect x="667" y="188" rx="0" ry="0" width="200" height="15" />
      <rect x="667" y="209" rx="0" ry="0" width="140" height="15" />
      <rect x="30" y="280" rx="0" ry="0" width="130" height="23" />
      <rect x="30" y="320" rx="0" ry="0" width="200" height="120" />
      <rect x="30" y="450" rx="0" ry="0" width="200" height="15" />
      <rect x="30" y="474" rx="0" ry="0" width="140" height="15" />
      <rect x="243" y="320" rx="0" ry="0" width="200" height="120" />
      <rect x="455" y="320" rx="0" ry="0" width="200" height="120" />
      <rect x="667" y="320" rx="0" ry="0" width="200" height="120" />
      <rect x="243" y="450" rx="0" ry="0" width="200" height="15" />
      <rect x="455" y="450" rx="0" ry="0" width="200" height="15" />
      <rect x="667" y="450" rx="0" ry="0" width="200" height="15" />
      <rect x="243" y="474" rx="0" ry="0" width="140" height="15" />
      <rect x="455" y="474" rx="0" ry="0" width="140" height="15" />
      <rect x="667" y="474" rx="0" ry="0" width="140" height="15" />
    </vue-content-loading>
    <vue-content-loading :width="1000" :height="300" v-if="type === 'blog'">
      <rect x="3" y="3" rx="10" ry="10" width="400" height="200" />
      <rect x="3" y="210" rx="0" ry="0" width="292" height="20" />
      <rect x="3" y="240" rx="0" ry="0" width="239" height="20" />
      <rect x="3" y="270" rx="0" ry="0" width="274" height="20" />
      <rect x="503" y="3" rx="10" ry="10" width="400" height="200" />
      <rect x="503" y="210" rx="0" ry="0" width="292" height="20" />
      <rect x="503" y="240" rx="0" ry="0" width="239" height="20" />
      <rect x="503" y="270" rx="0" ry="0" width="274" height="20" />
      <rect x="503" y="3" rx="10" ry="10" width="400" height="200" />
    </vue-content-loading>
  </div>
</template>
<script>
import { VueContentLoading } from 'vue-content-loading'

export default {
  name: 'content-loading',
  components: { VueContentLoading },
  props: {
    //https://skeletonreact.com/#gallery
    type: {
      type: String,
      default: 'default',

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
