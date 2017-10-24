<template>
  <div class="register login-wrapper">
    <div class="header">
      <i class="logo"></i>
      <a class="close icon-close" @click="back"></a>
    </div>
    <div class="content">
      <h1 class="title">用户登录</h1>
      <div class="input-wrapper">
        <span>账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:</span>
        <input type="text" placeholder="">
      </div>
      <div class="input-wrapper">
        <span>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:</span>
        <input type="text">
      </div>
      <div class="btn-wrapper">
        <div class="register-btn">一键注册</div>
      </div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {

      };
    },
    components: {

    },
    methods: {
      back() {
        this.$emit('select-login');
      }
    }
  };
</script>

<style scoped lang="stylus">


</style>
