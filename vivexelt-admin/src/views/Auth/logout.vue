<template>
  <div>
    <div v-if="isLoading">Logging out...</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import {
  gotoSignIn,
} from '@/routes/helper'
import Browser from '@/core/helpers/browser'
import AuthService from '@/core/services/auth'

export default {
  name: 'Logout',
  metaInfo: {
    title: 'Logout',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'description',
        content:
          'Hihi',
      },
    ],
  },
  async mounted() {
    await this.logout()
  },
  data() {
    return {
      isLoading: false,
    }
  },
  computed: {
  },
  methods: {
    ...mapActions('auth', {
      signOut: 'signOut',
    }),

    async logout() {
      this.isLoading = true

      // const logoutType = Browser.getURLParameter('type')
      const redirectUrl = Browser.getURLParameter('return_url')
      console.log(AuthService)
      await this.signOut()
      this.isLoading = false
      return gotoSignIn({ return_url: redirectUrl })
      // Need to wait some function in shopLogout done
    },
  },
}
</script>
