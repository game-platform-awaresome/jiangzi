<template>
  <div class="login-latest">
    <div class="login-wrapper">
      <!-- header -->
      <div class="header">
        <i class="logo"></i>
        <a class="close icon-close"></a>
      </div>
      <!-- content -->
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
          <div class="login-btn">登录游戏</div>
        </div>
        <div class="btn-other clearfix">
          <a class="bind">绑定手机</a>
          <a class="update">修改密码</a>
        </div>
      </div>
      <!-- bottom  -->
      <div class="bottom">
        <h3 class="description">
          <div class="line"></div>
          <div class="content">其他方式登录</div>
          <div class="line"></div>
        </h3>
        <div class="other-login">
          <div class="tencent other-login-wrapper">
            <i class="logo icon-qq"></i>
            <p class="text">QQ</p>
          </div>
          <div class="wechat other-login-wrapper">
            <i class="logo icon-wechat"></i>
            <p class="text">微信</p>
          </div>
          <div class="phone other-login-wrapper">
            <i class="logo icon-mobile"></i>
            <p class="text">手机</p>
          </div>
          <div class="tourist other-login-wrapper">
            <i class="logo icon-user"></i>
            <p class="text">游客</p>
          </div>
        </div>
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

    }
  };
</script>

<style scoped lang="stylus">

common-header()
  background #eee
  padding 12px 24px
  .logo
    display inline-block
    height 34px
    width 149px
    background url('./login-logo.png') 0 0 no-repeat
  .close
    position absolute
    display block
    top 8px
    right 8px
    color #494949
    font-size 34px

common-input()
  padding 12px
  border 1px solid #d9d9d9
  margin-bottom 20px
  border-radius 3px
  span
    display inline-block
    font-size 16px
    color #4d4d4d
  input
    height 16px
    width 60%
    border none
    outline none
    text-indent 10px

common-btn($bg-color,$color)
  flex 1
  background $bg-color
  color $color
  border-radius 5px
  height 50px
  line-height 50px
  text-align center
  font-size 20px
.login-latest
  position: fixed;
  top:0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  background: #6c6c6c;
  .login-wrapper
    width 460px
    margin 0 auto
    position relative
    top 50%
    transform translate(0,-50%)
    background #fff
    border-radius 5px
    overflow hidden
    // 头部
    .header
      common-header()
    // 内容
    .content
      padding 0 24px
      .title
        color #494949
        font-size 30px
        padding 16px 0
        text-align center
        font-weight 500
      .input-wrapper
        common-input()
      // 按钮
      .btn-wrapper
        display flex
        .register-btn
          margin-right 5px
          common-btn(#f72243,#fff)
        .login-btn
          margin-left 5px
          common-btn(#3299f7,#fff)
      //链接
      .btn-other
        padding-top 20px
        width 100%
        .bind
          float left
          color #f72243
          font-size 14px
        .update
          float right
          color #f72243
          font-size 14px
    .bottom
      padding 0 24px
      .description
        width 200px
        margin 10px auto
        display flex
        .line
          position relative
          top 6px
          flex 1
          border-top 1px solid #8a8a8a
        .content
          padding 0 10px
          font-size 12px
      .other-login
        display flex
        justify-content space-between
        .other-login-wrapper
          width 50px
          .logo
            display block
            font-size 30px
            padding 10px
            color #35b19b
          .text
            color #35b19b
            font-size 12px
            text-align center
            line-height 16px
            padding-bottom 10px

</style>
