<!-- Vue component -->
<template>
  <div>
    <multiselect
      v-model="value"
      :options="options"
      @input="onInput"
      :label="label"
      :track-by="trackBy"
      :searchable="searchable"
      :multiple="multiple"
      :placeholder="placeholder"
      :allowEmpty="allowEmpty"
    >
    </multiselect>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  // OR register locally
  name: "dpmx-select",
  components: { Multiselect },
  props: {
    options: {
      type: Array,
      default: () => [],
      description: "list option"
    },
    label: {
      type: String,
      default: "name"
    },
    trackBy: {
      type: String,
      default: ""
    },
    searchable: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '',
    },
    valueKey: {
      type: String,
      default: '',
    },
    defaultValue: {
      type: Object||Array||String||Number,
      default: null,
    },
    allowEmpty: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      value: null
      //options:
    };
  },
  mounted() {
    if(this.defaultValue) {
      this.value = this.defaultValue
    }
  },
  methods: {
    onInput(val) {
      if (this.valueKey && this.valueKey.length > 0 ) {
        if (typeof val === 'object') {
          this.$emit("input", val[this.valueKey]);
          return
        }
      } 
      this.$emit("input", val);
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
