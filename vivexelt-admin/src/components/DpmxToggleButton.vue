<!-- Vue component -->
<template>
  <div>
    <toggle-button
      @input="onInput"
      :value="value"
      :sync="sync"
      :disabled="disabled"
      :color="color"
      :labels="labels"
    ></toggle-button>
  </div>
</template>

<script>
import { ToggleButton } from 'vue-js-toggle-button'

export default {
  // OR register locally
  name: 'dpmx-toggle-button',
  components: { ToggleButton },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    sync: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: '',
    },
    labels: {
      type: [Boolean, Object],
      default: false,
    },
  },
  data() {
    return {
      toggleValue: false,
      //options:
    }
  },
  methods: {
    onInput(val) {
      this.$emit('input', val)
    },
  },
}
</script>
