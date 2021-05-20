<template>
  <div id="app">
    <router-view name="header" />
    <div class="wrapper">
      <slide-y-up-transition origin="center" mode="out-in" :duration="250">
        <router-view />
      </slide-y-up-transition>
    </div>
    <router-view name="footer" />
  </div>
</template>
<script>
import { SlideYUpTransition } from "vue2-transitions";
import '@mdi/font/scss/materialdesignicons.scss'
export default {
  components: {
    SlideYUpTransition
  }
};
</script>
