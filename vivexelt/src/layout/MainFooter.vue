<template>
  <footer
    class="footer"
    :class="{ [`footer-${type}`]: type }"
    :data-background-color="backgroundColor"
  >
    <div class="container">
      <nav>
        <ul>
          <li>
            <router-link class="navbar-brand" to="/"> ViVEXELT </router-link>
          </li>
          <li>
            <router-link class="navbar-brand" to="/about">
              About Us
            </router-link>
          </li>
          <li>
            <router-link class="navbar-brand" to="/tutorials">
              Tutorials
            </router-link>
          </li>
        </ul>
      </nav>
      <div class="copyright email-footer">
        <i class="fas fa-envelope icon20 s-mr8"></i>
        Contact us: someone@gmail.com
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  props: {
    backgroundColor: String,
    type: String
  },
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style></style>
