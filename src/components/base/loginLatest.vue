<template>
  <div class="login-latest">
    <!-- 用户登录 -->
    <div class="login-index login-wrapper" v-if="loginFunc === ''">
      <!-- header -->
      <div class="header">
        <i class="logo"></i>
      </div>
      <!-- content -->
      <div class="content">
        <h1 class="title">用户登录</h1>
        <div class="input-wrapper">
          <span>账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:</span>
          <input type="text" placeholder="请输入账号" @blur="hasAccount" v-model="username">
        </div>
        <div class="input-wrapper">
          <span>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:</span>
          <input type="password" placeholder="请输入密码" v-model="password">
        </div>
        <div class="btn-wrapper">
          <div class="register-btn" @click="register">一键注册</div>
          <div class="login-btn" @click="login">登录</div>
        </div>
        <div class="btn-other clearfix-new">
          <a class="bind" @click="bind">绑定手机</a>
          <a class="update" @click="update">修改密码</a>
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
          <div class="tencent other-login-wrapper" @click="tencentLoginUrl">
            <i class="logo icon-qq"></i>
            <p class="text">QQ</p>
          </div>
          <div class="wechat other-login-wrapper" @click="wechatLoginUrl">
            <i class="logo icon-wechat"></i>
            <p class="text">微信</p>
          </div>
          <div class="phone other-login-wrapper" @click="phoneLogin">
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
    <!-- 手机登录 -->
    <loginPhone v-if="loginFunc === 'phone'" @select-login="back"></loginPhone>
    <!-- 绑定手机 -->
    <bindPhone v-if="loginFunc === 'bind'" @select-login="back"></bindPhone>
    <!-- 修改密码 -->
    <updatePsd v-if="loginFunc === 'update'" @select-login="back"></updatePsd>
    <!-- 注册 -->
    <register v-if="loginFunc === 'register'" @select-login="back"></register>
  </div>
</template>

<script type="text/ecmascript-6">
  import loginPhone from '@/components/base/loginLatestPhone';
  import bindPhone from '@/components/base/bindPhone';
  import updatePsd from '@/components/base/updatePsd';
  import register from '@/components/base/register';

  import qs from 'qs';
  export default {
    data () {
      return {
        loginFunc: '',  //登录方式
        username: '',   //用户名
        password: ''    //密码
      };
    },
    components: {
      loginPhone,
      bindPhone,
      updatePsd,
      register
    },
    methods: {
      // select func
      //一键注册
      register() {
        this.loginFunc = 'register';
      },
      //微信登录
      wechatLoginUrl(){
        let token     = this.getUrlParam('token') ? '&token='+ encodeURIComponent(this.getUrlParam('token')) : '';
        let redirect  = this.getUrlParam('redirect') ? '&redirect='+ encodeURIComponent(this.getUrlParam('redirect')) : '';

        if(this.isWechat()){
            window.location.href = '/api/h5/user/oauthlogin/oauthtype/wechat' + token + redirect;
        }else{
            window.location.href = '/api/h5/user/oauthlogin?oauthtype=scan' + token + redirect;
        }
      },
      // 手机登录
      phoneLogin(){
        this.loginFunc = 'phone';
      },
      // QQ登录
      tencentLoginUrl(){
        let token     = this.getUrlParam('token') ? '&token='+ encodeURIComponent(this.getUrlParam('token')) : '';
        let redirect  = this.getUrlParam('redirect') ? '&redirect='+ encodeURIComponent(this.getUrlParam('redirect')) : '';
        window.location.href = '/api/h5/user/oauthlogin?oauthtype=qq' + token + redirect;
      },
      //绑定手机
      bind() {
        this.loginFunc = 'bind';
      },
      //修改密码
      update() {
        this.loginFunc = 'update';
      },
      //工具类
      getUrlParam(name) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        let result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null
      },
      isWechat(){
        let ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
          console.log('是微信浏览器')
          return true
        }else{
          console.log('不是微信浏览器')
          return false
        }
      },
      back() {
        this.loginFunc = ''
      },

      /* ----------------------------------------
      *               登录部分
      ---------------------------------------- */
      login() {
        let _this = this;
        this.$axios.post('/api/h5/user/accountLogin',qs.stringify({
                username : this.username,
                password : this.password
            })
        )
          .then(res => {
            if (res.data.code === 2000){
              // 1.存账号

              // 2.跳转
              let redirect  = _this.getUrlParam('redirect') ? decodeURIComponent(this.getUrlParam('redirect')) : '/'
              window.location.href = redirect;
            }
            else{
              layer.msg(res.data.msg)
            }

          })
          .catch(function(error){
            console.log(error)
          })
      },
      //用户名是否存在
      hasAccount() {
        this.$axios.post('/api/h5/user/verifyAccount',qs.stringify({
                username : this.username
            })
        )
          .then(res => {
            if (res.data.code === 2000){
              return;
            } else if(res.data.code === 4003) {
              console.log('此账号有效')
            }
            else{
              layer.msg(res.data.msg)
            }

          })
          .catch(function(error){
            console.log(error)
          })
      }
      //
    }

  }

</script>

<style lang="stylus">

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
  display flex
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
    flex 1
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
        font-size 24px
        padding 16px 0
        text-align center
        font-weight 500
      .input-wrapper
        common-input()
      // 按钮
      .btn-wrapper
        display flex
        margin-bottom 20px
        .register-btn
          margin-right 5px
          common-btn(#f72243,#fff)
        .login-btn
          margin-left 5px
          common-btn(#3299f7,#fff)
        .phone-login-btn
          common-btn(#3299f7,#fff)
      //链接
      .btn-other
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
