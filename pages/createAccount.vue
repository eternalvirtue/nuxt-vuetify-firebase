<template>
    <v-container fluid fill-height>
      <v-row align="center" justify="center">
        <v-col xl=3 lg=3 cols="auto">
          <v-card>
            <v-toolbar color="blue darken-3" class="white--text">
              <v-toolbar-title>アカウント作成</v-toolbar-title>
            </v-toolbar>
            <p class="errMessage" v-if="signUpError">
              <v-alert type="error">
                {{signUpError}}
              </v-alert>
            </p>
            <p class="errMessage" v-if="succeedInfo">
              <v-alert type="success">
                {{succeedInfo}}
                <br/><nuxt-link to="/login">ログインページはこちら</nuxt-link>
              </v-alert>
            </p>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="email"
                  :counter="128"
                  label="email"
                  prepend-icon="email"
                  :readonly="succeedInfo ? true : false"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  :append-icon="show_password ? 'visibility' : 'visibility_off'"
                  :type="show_password ? 'text' : 'password'"
                  :counter="128"
                  label="password"
                  prepend-icon="lock"
                  @click:append="show_password = !show_password"
                  :readonly="succeedInfo ? true : false"
                ></v-text-field>
                <v-text-field
                  v-model="confirmPassword"
                  :append-icon="show_confirm_password ? 'visibility' : 'visibility_off'"
                  :type="show_confirm_password ? 'text' : 'password'"
                  :counter="128"
                  label="confirmPassword"
                  prepend-icon="lock"
                  @click:append="show_confirm_password = !show_confirm_password"
                  :readonly="succeedInfo ? true : false"
                ></v-text-field>
                <v-textarea
                  v-model="note_content"
                  label="note"
                  rows="2"
                  prepend-icon="notes"
                  :disabled="succeedInfo ? true : false"
                ></v-textarea>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-3 primary"
                outlined 
                v-on:click="doSignUp"
                :disabled="succeedInfo ? true : false"
              >SIGN UP</v-btn>
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
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import firebaseAPI from '~/plugins/firebaseAPI'
import logUtil from '~/plugins/logUtil'

export default {
  layout: 'login',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      note_content: '何かメモ',
      signUpError: '',
      succeedInfo: '',
      show_password: false,
      show_confirm_password: false,
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
    doSignUp() {
      this.dialog = true
      this.signUpError = ''
      this.succeedInfo = ''

      if (this.password !== this.confirmPassword) {
        this.signUpError = 'passwordとconfirmPasswordの値が不一致です。'
      } else {
        // Firebase Authenticationにデータ登録
        firebaseAPI.regist(this.email, this.password)
        .then(registeredUser => {
          console.log('Registration Succeed ', logUtil.stringify(registeredUser))
          // Firestoreにuserデータ登録
          firebaseAPI.createUser(registeredUser.user, this.note_content)
          .then(createdUser => {
            console.log('UserData Create Succeed ', createdUser)
            this.succeedInfo = 'アカウントの作成が終了しました。'
          }).catch(err => {
            console.log('UserData Create  ', err)
            this.signUpError = '認証情報作成に成功しましたが、ユーザ情報作成に失敗しました。管理者にお問い合わせください。'
          }).finally(() => {
            // アカウント作成時点でログインした状態になっているので、ログアウトしておく
            firebaseAPI.logout()
          })
        }).catch(err => {
          console.log('Registration Failed ', err)
          let errorCode = err.code;
          let errorMessage = err.message;
          if (errorCode === 'auth/email-already-in-use') {
            this.signUpError = 'そのメールアドレスはすでに使用されています。'
          } else if (errorCode === 'auth/invalid-email') {
            this.signUpError = '不正なメールアドレスです。'
          } else if (errorCode === 'auth/operation-not-allowed') {
            this.signUpError = 'そのメールアドレスとパスワードによる登録は許可されていません。管理者にお問い合わせください。'
          } else if (errorCode === 'auth/weak-password') {
            this.signUpError = 'パスワード強度不足です。'
          } else {
            this.signUpError = '不明なエラーです。' + errorCode + ' : ' + errorMessage
          }
        }).finally(() => {
          // timeoutをつけないと処理が早すぎてブラウザの処理が追いつかない？
          setTimeout(() => (this.dialog = false), 100)
        }) 
      }
    }
  }
}
</script>
