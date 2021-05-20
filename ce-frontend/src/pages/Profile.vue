<template>
  <div>
    <div class="page-header clear-filter" filter-color="orange">
      <parallax
        class="page-header-image"
        style="background-image: url('/img/bg5.jpg')"
      >
      </parallax>
      <div class="container">
        <div class="photo-container">
          <img :src="user.image" alt="" />
        </div>
        <div class="row justify-content-center">
          <div class="col-md-10">
            <h3 class="title">{{ user.full_name }}</h3>
            <p class="category">{{ user.company }}</p>
            <p class="category">{{ user.role }}</p>
          </div>
        </div>

        <!-- <div class="content">
          <div class="social-description">
            <h2>26</h2>
            <p>Comments</p>
          </div>
          <div class="social-description">
            <h2>26</h2>
            <p>Comments</p>
          </div>
          <div class="social-description">
            <h2>48</h2>
            <p>Bookmarks</p>
          </div>
        </div> -->
      </div>
    </div>
    <div class="">
      <div class="container profile-section">
        <div class="row justify-content-center">
          <div class="col-md-10">
            <h3 class="title">About {{ user.name }}</h3>
            <div
              class="profile-description text-center"
              v-html="user.description"
            ></div>
            <p class="description"></p>
          </div>
        </div>

        <!-- <div class="button-container">
          <a href="#button" class="btn btn-primary btn-round btn-lg">Follow</a>
          <a
            href="#button"
            class="btn btn-default btn-round btn-lg btn-icon"
            rel="tooltip"
            title="Follow me on Twitter"
          >
            <i class="fab fa-twitter"></i>
          </a>
          <a
            href="#button"
            class="btn btn-default btn-round btn-lg btn-icon"
            rel="tooltip"
            title="Follow me on Instagram"
          >
            <i class="fab fa-instagram"></i>
          </a>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { Profile } from "./constant/const"
export default {
  name: "profile",
  bodyClass: "profile-page",
  components: {},
  data() {
    return {
      user: {},
    }
  },
  mounted() {
    const userName = this.$route.params.user_name
    this.user = Profile[userName]
  },
}
</script>
<style></style>
