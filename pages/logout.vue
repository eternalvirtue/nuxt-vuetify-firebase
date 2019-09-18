<template>
    <section class="container">
        <div>
            <h1 class="title">ログアウトしました</h1>
        </div>
    </section>
</template>

<script>
export default {
  layout: 'login',
  data: function(){
      this.$store.commit('Account/logout');
      Cookie.remove('auth');
      this.$store.commit('Account/setAuth', null);
      //this.$router.push('/');
  }
}
</script>
