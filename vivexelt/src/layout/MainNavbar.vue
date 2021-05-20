<template>
  <navbar
    position="fixed"
    type="white"
    :transparent="transparent"
    :color-on-scroll="colorOnScroll"
    menu-classes="ml-auto"
    class="navbar"
    ref="navbar"
  >
    <template>
      <router-link class="navbar-brand" to="/">
        <img style="width: 200px" src="img/real-logo.png" alt="ViVEXELT" />
      </router-link>
      <!-- <el-popover
        ref="popover1"
        popper-class="popover"
        placement="bottom"
        width="200"
        trigger="hover"
      >
        <div class="popover-body">
          Designed by Invision. Coded by Creative Tim
        </div>
      </el-popover> -->
    </template>
    <template slot="navbar-menu">
      <li class="nav-item search-tut">
        <form v-on:submit.prevent="onSubmit()">
          <fg-input class="" placeholder="Search" v-model="searchValue">
          </fg-input>
        </form>
      </li>
      <a class="navbar-brand s-pr12 s-pl12" to="" @click="goTo('aboutus')">
        About Us
      </a>
      <a class="navbar-brand s-pr12 s-pl12" to="" @click="goTo('tutorials')">
        Activities
      </a>
      <!-- <drop-down
        tag="li"
        title="Examples"
        icon="now-ui-icons design_image"
        class="nav-item"
      >
        <nav-link to="/landing" @click="toggle()">
          <i class="now-ui-icons education_paper"></i> Landing
        </nav-link>
        <nav-link to="/login">
          <i class="now-ui-icons users_circle-08"></i> Login
        </nav-link>
        <nav-link to="/demo-profile">
          <i class="now-ui-icons users_single-02"></i> Profile
        </nav-link>
        <nav-link to="/component">
          <i class="now-ui-icons users_single-02"></i> Component
        </nav-link>
      </drop-down> -->
      <li class="nav-item search-modal">
        <a class="nav-link" style="cursor: pointer" @click="showSearch = true">
          <i class="fas fa-search"></i>
        </a>
      </li>
    </template>
    <modal
      :show.sync="showSearch"
      headerClasses="justify-content-center"
      type="notice"
    >
      <h4 slot="header" class="title title-up">Modal title</h4>
      <div class="form__group field">
        <form v-on:submit.prevent="onSubmit()">
          <input
            type="input"
            class="form__field"
            placeholder="Enter something to search"
            name="name"
            id="name"
            v-model="searchValue"
          />
          <label for="name" class="form__label">Search</label>
        </form>
      </div>
    </modal>
  </navbar>
</template>

<script>
import { Navbar } from '@/components';
import { Popover } from 'element-ui';
import { mapActions } from 'vuex'
export default {
  name: 'main-navbar',
  props: {
    transparent: Boolean,
    colorOnScroll: Number
  },
  components: {
    Navbar,
    [Popover.name]: Popover
  },
  data() {
    return {
      showSearch: false,
      searchValue: '',
    }
  },
  methods: {
    ...mapActions('search', {
      searchTut: 'searchTut',
    }),
    onSubmit: function () {
      this.searchTut(this.searchValue)
      if (this.$route.name === 'tutorials') {
        this.$router.replace({ query: { search: this.searchValue } })
      } else {
        this.$router.push({ name: 'tutorials', query: { search: this.searchValue } })

      }
      this.showSearch = false
      //this.searchValue = ''
      this.toggle()
    },
    toggle() {
      this.$refs['navbar'].toggle()
    },
    goTo(route) {
      this.toggle()
      if (this.$route.name !== route) {
        this.$router.push({ name: route })
      }
    }
  }
};
</script>

<style scoped></style>
