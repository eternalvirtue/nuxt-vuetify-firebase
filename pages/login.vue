<template>
    <v-container fluid fill-height>
      <v-row align="center" justify="center">
        <v-col xl=3 lg=3 cols="auto">
          <v-card>
            <v-toolbar color="blue darken-3" class="white--text">
              <v-toolbar-title>ログイン</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="email"
                  :counter="128"
                  label="email"
                  prepend-icon="email"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  :append-icon="show_password ? 'visibility' : 'visibility_off'"
                  :type="show_password ? 'text' : 'password'"
                  :counter="128"
                  label="password"
                  prepend-icon="lock"
                  @click:append="show_password = !show_password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                v-on:click="gotoSignup"
              >SIGNUP</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-3 primary"  outlined 
                v-on:click="doLogin"
              >LOGIN</v-btn>
            </v-card-actions>
            <hr>
            <v-spacer></v-spacer>
            <v-btn
              text
              v-on:click="gotoResetPassword"
            >パスワードを忘れたかたはこちら</v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  layout: 'login',
  data() {
    return {
      email: '',
      password: '',
      show_password: false,
    }
  },
  methods: {
    doLogin() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$store.commit('Account/setUser', {
            uid: user.uid,
            email: user.email,
            username: user.displayName,
            userImage: user.photoURL,
          });
          this.$router.push("/")
        }).catch((error) => {
          alert(error)
        })
    },
    gotoSignup() {
      this.$router.push("/createAccount")
    },
    gotoResetPassword() {
      this.$router.push("/reset-password")
    }
  }
}
</script>