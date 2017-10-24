<template>
  <div class="update login-wrapper">
    <div class="header">
      <i class="logo"></i>
      <a class="close icon-close" @click="back"></a>
    </div>
    <div class="content">
      <h1 class="title">修改密码</h1>
      <div class="input-wrapper">
        <span>手&nbsp;机&nbsp;号:</span>
        <input type="text" placeholder="请输入您的手机号码">
      </div>
      <div class="input-wrapper">
        <span>验&nbsp;证&nbsp;码:</span>
        <input type="text" placeholder="请输入短信验证码" class="message-code" autocomplete="off">
      </div>
      <p class="per-fail"></p>
      <div class="btn-wrapper">
        <div class="phone-login-btn" @click="bind()">绑定</div>
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
