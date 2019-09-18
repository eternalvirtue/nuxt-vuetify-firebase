<template>
  <section class="container">
    <div>
      <section class="ex__box" v-if="!isLogin">
        <h5>新規登録</h5>
        <p><input type="text" v-model="email" placeholder="メールアドレス"></p>
        <p><input type="password" v-model="password" placeholder="パスワード"></p>
        <p><input type="password" v-model="confirmPassword" placeholder="パスワード(確認)"></p>
        <p class="errMessage" v-if="authError">{{authError}}</p>
        <div class="links">
          <a @click="create()" class="button--green">新規登録</a>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
export default {
    layout: 'account',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  computed: {
      isLogin(){
          return this.$store.state.isLogin;
      },
      authError(){
          return this.$store.state.authError;
      }
  },
  methods: {
    create: function () {
      if (this.password !== this.confirmPassword) {
        alert('Not match confirm password.')
        return
      }
      this.$store.dispatch('Account/regist', {email:this.email, password:this.password});
    }
  }
}
</script>
