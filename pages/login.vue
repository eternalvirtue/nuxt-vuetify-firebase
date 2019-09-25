<template>
    <v-container fluid fill-height>
      <v-row align="center" justify="center">
        <v-col xl=3 lg=3 cols="auto">
          <v-card>
            <v-toolbar color="blue darken-3" class="white--text">
              <v-toolbar-title>ログイン</v-toolbar-title>
            </v-toolbar>
            <p class="errMessage" v-if="loginError">
              <v-alert type="error">
                {{loginError}}
              </v-alert>
            </p>
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
              <v-btn
                color="blue darken-3 primary"
                outlined 
                v-on:click="doLogin"
              >LOGIN</v-btn>
              <v-dialog
                v-model="dialog"
                persistent
                width="300"
              >
                <v-card
                  color="primary"
                  dark
                >
                  <v-card-text>
                    リクエスト処理中です。
                    <v-progress-linear
                      indeterminate
                      color="white"
                      class="mb-0"
                    ></v-progress-linear>
                  </v-card-text>
                </v-card>
              </v-dialog>
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
import firebaseAPI from '~/plugins/firebaseAPI'

export default {
  layout: 'login',
  data() {
    return {
      email: '',
      password: '',
      show_password: false,
      loginError: '',
      dialog: false
    }
  },
  watch: {
    dialog (val) {
      if (!val) return
      // ボタン押した時に出るダイアログの最大時間4秒。
      // 基本的にFirebaseの処理が早くてダイアログ出る前にレスポンスが返ってきているので、
      // このダイアログは目にする前に終了してしまっているが、念の為
      setTimeout(() => (this.dialog = false), 4000)
    }
  },
  methods: {
    doLogin() {
      this.dialog = true
      this.loginError = ''
      firebaseAPI.login(this.email, this.password).then((user) => {
        /*store.dispatch('Account/setUser', {
          uid: user.uid,
          email: user.email,
          username: user.displayName,
          userImage: user.photoURL,
        }).then(() => {
          console.log('login page user ' + JSON.stringify(store.state.Account.user))*/
          this.$router.push("/")
      }).catch(err => {
        console.log('login Failed ', err)
        let errorCode = err.code;
        let errorMessage = err.message;
        if (errorCode === 'auth/invalid-email') {
          this.loginError = '不正なメールアドレスです。'
        } else if (errorCode === 'auth/user-disabled') {
          this.loginError = 'アカウント削除済みです。必要に応じて再登録してください。'
        } else if (errorCode === 'auth/user-not-found') {
          this.loginError = 'そのメールアドレスは未登録です。'
        } else if (errorCode === 'auth/wrong-password') {
          this.loginError = 'パスワードが間違っています。'
        } else {
          this.loginError = '不明なエラーです。' + errorCode + ' : ' + errorMessage
        }
      }).finally(() => {
        // timeoutをつけないと処理が早すぎてブラウザの処理が追いつかない？
        setTimeout(() => (this.dialog = false), 100)
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