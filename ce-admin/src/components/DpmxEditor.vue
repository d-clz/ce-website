<template>
  <editor
    :api-key="tinyMCEKey"
    :value="value"
    @input="onInput"
    :init="tinyMCEOptions"
    :plugins="tinyMCEOptions.plugins"
    class="height500"
  ></editor>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import http from '@/core/services/http'
export default {
  // OR register locally
  name: 'dpmx-editor',
  components: {
    editor: Editor,
  },
  props: {
    value: {
      default: '',
      type: String,
    },
    height: {
      default: 500,
      type: Number,
    },
    toolbar: Array,
    hasSettingBar: {
      default: true,
      type: Boolean,
    },
    isUploadedImage: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    editorConfig() {
      return {
        plugins: [Essentials, Paragraph, Bold, Italic],
        toolbar: ['bold', 'italic'],
      }
    },
    tinyMCEKey() {
      return process.env.VUE_APP_TINYMCE_KEY
    },
    tinyMCEOptions() {
      const configOptions = {
        selector: 'textarea#tiny-editor',
        height: this.height,
        menubar: false,
        statusbar: false,
        plugins:
          'autoresize print preview importcss searchreplace autolink autosave save directionality visualblocks \
          visualchars fullscreen image link media code table charmap hr pagebreak nonbreaking anchor toc \
          insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons paste preview',

        branding: false,
        toolbar: [
              'bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | image media link anchor',
              'code outdent indent blockquote | numlist bullist checklist |forecolor backcolor formatpainter removeformat pagebreak | table',
              'searchreplace  preview fullscreen wordcount',
              'fontselect fontsizeselect formatselect |',
            ],
        extended_valid_elements:
          'svg[*],defs[*],pattern[*],desc[*],metadata[*],g[*],mask[*],path[*],line[*],marker[*],rect[*],circle[*],ellipse[*],polygon[*],polyline[*],linearGradient[*],radialGradient[*],stop[*],image[*],view[*],text[*],textPath[*],title[*],tspan[*],glyph[*],symbol[*],switch[*],use[*]',

        //quickbars_insert_toolbar: 'quicktable',
        toolbar_sticky: true,
        autoresize_on_init: false,
        init_instance_callback: function (editor) {
          editor.on('OpenWindow', function () {
            let elDialog = document.getElementsByClassName('tox-silver-sink')[0]

            elDialog.style.visibility = 'visible'
            elDialog.style.opacity = 1
          })

          editor.on('CloseWindow', function () {
            let elDialog = document.getElementsByClassName('tox-silver-sink')[0]
            elDialog.removeAttribute('style')
            document.getElementsByClassName('tox-editor-header')[0].removeAttribute('style')
          })
        },
        min_height: 500,
        //content_style: '',
      }
      configOptions.images_upload_handler = this.imageUpload.bind(this)
      return configOptions
    },
  },
  data() {
    return {
      editorData: '',
      isUpdatedNewUI: false,
      // ...
    }
  },
  methods: {
    onInput(val) {
      this.$emit('input', val)
    },
    async imageUpload(blobInfo, success, failure) {
      this.isDisableButton = true
      let formData = new FormData()
      formData.append('file', blobInfo.blob(), blobInfo.filename())
      const url = `/images.json`
      const response = await http.post(url, formData)
      if (response && response.success) {
        success(response.image.src)
        this.isDisableButton = false
        return
      }

      if (response.error) {
        failure(this.$t('common.description.the_image_upload_is_too_large'))
      }
    },
  },
  mounted() {},
}
</script>
<style>
.mceEditor td.mceIframeContainer iframe {
    min-height: 350px !important;
}
.mceEditor table {
    height: auto !important;
}
</style>
