<template>
  <v-app>
    <v-app-bar color="blue darken-3" class="white--text"
      app
    >
      <nuxt-link to="/"　class="white--text">SERVESYNC, LLC.</nuxt-link>
      <v-spacer />
      <nuxt-link to="/help"　class="white--text">ヘルプ</nuxt-link>
    </v-app-bar>
    <v-content>
        <nuxt />
    </v-content>
    <v-footer
      app
    >
      <span>&copy; 2019 SERVESYNC, LLC.</span>
    </v-footer>
  </v-app>
</template>