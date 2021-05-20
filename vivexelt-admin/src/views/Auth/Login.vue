<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-blue py-7 py-lg-8 pt-lg-9"></div>
    <!-- Page content -->
    <b-container class="mt--8 pb-5">
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card no-body class="bg-secondary border-0 mb-0">
            <b-card-body class="px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                <div class="text-muted text-center mt-2 mb-3">
                  <b-img
                    src="img/assets/logo.png"
                    fluid
                    alt="Responsive image"
                    style="margin-bottom: 50px"
                  ></b-img>
                </div>
              </div>
              <validation-observer v-slot="{ handleSubmit }" ref="formValidator">
                <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
                  <div v-if="check" style="color: red">Wrong username or password</div>
                  <base-input
                    alternative
                    class="mb-3"
                    name="Username"
                    :rules="{ required: true }"
                    prepend-icon="ni ni-email-83"
                    placeholder="Username"
                    v-model="username"
                  ></base-input>

                  <base-input
                    alternative
                    class="mb-3"
                    name="Password"
                    :rules="{ required: true, min: 3 }"
                    prepend-icon="ni ni-lock-circle-open"
                    type="password"
                    placeholder="Password"
                    v-model="password"
                  ></base-input>

                  <div class="text-center">
                    <base-button
                      type="primary"
                      :disabled="isLoading"
                      native-type="submit"
                      class="my-4"
                      >Sign in</base-button
                    >
                  </div>
                </b-form>
              </validation-observer>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import AuthService from '@/core/services/auth'
export default {
  data() {
    return {
      username: '',
      password: '',
      isLoading: false,
      check: false,
      text: '',
    }
  },
  methods: {
    ...mapActions('auth', {
      signIn: 'signIn',
    }),
    async onSubmit() {
      if (this.username.trim() && this.password.trim()) {
        this.isLoading = true
        let result = await this.signIn({ username: this.username, password: this.password })
        console.log(result)

        if (result.success) {
          this.afterSignedIn()
        } else {
          this.check = true
          console.log(this.check)
          this.$notify({
            verticalAlign: 'bottom',
            horizontalAlign: 'center',
            type: 'danger',
            message: result.message || 'Something went wrong',
          })
        }
        this.isLoading = false
      }
    },
    async afterSignedIn() {
      this.$router.push({ name: 'videos' })
    },
  },
  mounted() {
    if (AuthService.isAuthenticated()) {
      this.$router.push({ name: 'videos' })
    }
  },
}
</script>
