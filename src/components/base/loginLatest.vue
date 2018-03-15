<template>
  <div class="login-latest">
    <!-- 用户登录 -->
    <div class="login-index login-wrapper" v-if="loginFunc === ''">
      <!-- header -->
      <div class="header">
        <!-- <i class="logo"></i> -->
        <span class="new-icon fa fa-angle-left" @click="backIndex"></span>
        登录
        <span class="new-register" @click="register">注册</span>
      </div>
      <!-- content -->
      <div class="content">
        <!-- <h1 class="title">用户登录</h1> -->
        <div class="input-wrapper">
          <span>账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:</span>
          <input type="text" placeholder="请输入账号" v-model="username" autocomplete="off">
          <span class="index-common-btn account-list-btn icon-chevron-thin-down" @click.stop="openlist"></span>
          <ul class="account-list" v-if="openUserList">
            <li v-for="item in userList" @click="selectAccount(item)">
              {{item.account}}
            </li>
          </ul>
        </div>
        <div class="input-wrapper">
          <span>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:</span>
          <input type="password" placeholder="请输入密码" v-model="password" v-if="inputType" autocomplete="off">
          <input type="text" placeholder="请输入密码" v-model="password" v-else >
          <span class="index-common-btn icon-eye" :class="{'eye-input': !inputType}" @click="hidePassword"></span>
        </div>
        <div class="btn-other clearfix-new">
          <!-- <a class="bind" @click="bind">绑定手机</a> -->
          <a class="update" @click="update">修改密码</a>
        </div>
        <div class="btn-wrapper">
          <!-- <div class="register-btn" @click="register">注册</div> -->
          <div class="login-btn" @click="login">登录</div>
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
          <!-- <div class="tencent other-login-wrapper" @click="tencentLoginUrl">
            <i class="logo icon-qq"></i>
            <p class="text">QQ</p>
          </div>
          <div class="wechat other-login-wrapper" @click="wechatLoginUrl">
            <i class="logo icon-wechat"></i>
            <p class="text">微信</p>
          </div> -->
          <div class="phone other-login-wrapper" @click="phoneLogin">
            <i class="logo icon-mobile"></i>
            <p class="text">手机</p>
          </div>
          <div class="tourist other-login-wrapper" @click="touristLogin">
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
    <updatePsd v-if="loginFunc === 'update'" @select-login="back" @update-psd="updateNewPsd"></updatePsd>

    <!-- 注册 -->
    <register v-if="loginFunc === 'register'" @select-login="back"></register>

  </div>
</template>

<script type="text/ecmascript-6">
  import loginPhone from '@/components/base/loginLatestPhone';
  import bindPhone from '@/components/base/bindPhone';
  import updatePsd from '@/components/base/updatePsd';
  import register from '@/components/base/register';
  import 'font-awesome/css/font-awesome.min.css'
  import qs from 'qs';
  export default {
    created() {
      this.getLocalStorage();
      this.loginPageCount();
    },
    data () {
      return {
        loginFunc: '',  //登录方式
        username: '',   //用户名
        password: '',   //密码
        userList: [],   //账号列表
        openUserList: false,
        inputType: true
      };
    },
    components: {
      loginPhone,
      bindPhone,
      updatePsd,
      register
    },
    mounted() {
      let _this = this;
      document.addEventListener('click',function (params) {
        _this.openUserList = false;
      })
    },
    methods: {
      // 通过本地存储获取用户数据
      getLocalStorage() {
        this.userList = [];
        for(let i=0;i<localStorage.length;i++){
          let str = JSON.parse(localStorage.getItem('user'+(i+1)));
          this.userList.push(str);
        }
        // console.log(this.userList);
      },
      //更新密码
      updateNewPsd(newPassword) {
        this.getLocalStorage();
        this.password = newPassword;
      },
      // select func
      //一键注册
      register() {
        this.loginFunc = 'register';
      },
      //微信登录
      wechatLoginUrl(){
        let token     = this.getUrlParam('token') ? '&token='+ encodeURIComponent(this.getUrlParam('token')) : '';
        let redirect  = this.getUrlParam('redirect') ? '?redirect='+ encodeURIComponent(this.getUrlParam('redirect')) : '';
        let redirect2  = this.getUrlParam('redirect') ? '&redirect='+ encodeURIComponent(this.getUrlParam('redirect')) : '';

        if(this.isWechat()){
            window.location.href = '/api/h5/user/oauthlogin/oauthtype/wechat' + redirect;
        }else{
            window.location.href = '/api/h5/user/oauthlogin?oauthtype=scan' + redirect2;
        }
      },
      // 手机登录
      phoneLogin(){
        this.loginFunc = 'phone';
      },
      // QQ登录
      tencentLoginUrl(){
        // let token     = this.getUrlParam('token') ? '&token='+ encodeURIComponent(this.getUrlParam('token')) : '';
        let redirect  = this.getUrlParam('redirect') ? '&redirect='+ encodeURIComponent(this.getUrlParam('redirect')) : '';


        let theHtml = decodeURIComponent(redirect);
        let qqapp = "lt=wd";
        if(theHtml.includes(qqapp)){
          window.location.href = '/api/h5/user/oauthlogin?oauthtype=qqapp' + redirect;
        }else{
          window.location.href = '/api/h5/user/oauthlogin?oauthtype=qq' + redirect;
        }


      },
      backIndex() {
        this.$router.push('/index')
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
              // 是否存储数据?
              let flag = true;
              //本地存储
              let user = "user" + (localStorage.length+1);
              let password = JSON.stringify(res.data);

              for(let i=0;i<localStorage.length;i++) {
                if(localStorage.getItem('user'+(i+1)) === password){
                  flag = false;
                }
              }

              if(flag){
                localStorage.setItem(user,password);
              }

              // 2.跳转
              layer.msg(res.data.msg)
              let redirect  = _this.getUrlParam('redirect') ? decodeURIComponent(this.getUrlParam('redirect')) : '/'
              setTimeout(function() {
                window.location.href = redirect;
              }, 1000);

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
      },
      //统计login页面曝光次数
      loginPageCount(){
        let _this = this;
        this.$axios.post('/api/h5/user/loginCount',qs.stringify({
          route : 'login',
          redirect : _this.getUrlParam('redirect')
        })).then(res => res);
      },
      //选择账号
      selectAccount(item) {
        this.username = item.account;
        this.password = item.password;
        this.openUserList = false;
      },
      hidePassword() {
        this.inputType = !this.inputType;
      },
      //打开账号列表
      openlist() {
        this.openUserList = true;
      },
      touristLogin() {
        let _this = this;
        this.$axios.post('/api/h5/user/register',qs.stringify({
                type : 'key',
                redirect : _this.getUrlParam('redirect')
            })
        )
          .then(res => {
            if (res.data.code === 2000){
                layer.msg('欢迎您 '+ '<span style="color:red">' + res.data.account + '</span>' +'正在登录...');
                // 1.存账号
                // 是否存储数据标记
                let flag = true;
                //本地存储
                let user = "user" + (localStorage.length+1);
                let password = JSON.stringify(res.data);
                for(let i=0;i<localStorage.length;i++) {
                  if(localStorage.getItem('user'+i) === password){
                    flag = false;
                  }
                }
                //存储
                if(flag){
                  localStorage.setItem(user,password);
                }
                // 2.跳转
                let redirect  = _this.getUrlParam('redirect') ? decodeURIComponent(_this.getUrlParam('redirect')) : '/'
                setTimeout(function() {
                  window.location.href = redirect;
                }, 1000);
            }
            else{
              layer.msg(res.data.msg)
            }

          })
          .catch(function(error){
            console.log(error)
          })
      }

    }

  }

</script>

<style lang="stylus">

common-header()
  // background #eee
  position relative
  font-size 19px
  color #fff
  text-align center
  padding 12px 0px
  background-color transparent
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
  .new-icon
    position absolute 
    font-size 30px
    top 3px
    left 0
    color #9f758d
  .new-register
    position absolute
    right 0
    top 12px
    font-size 13px
    color #989898
    line-height 19px
common-input()
  padding 8px 12px
  // border 1px solid #d9d9d9
  background-color #f0f0f0
  margin-bottom 10px
  // border-radius 3px
  display flex
  span
    display inline-block
    height 21px
    line-height 21px
    font-size 14px
    color #a1a1a1
    vertical-align center
    transform translate(0,1px)
  input
    display inline-block
    height 20px
    line-height 20px
    width 60%
    border none
    color #c8c8c8
    outline none
    text-indent 10px
    flex 1
    font-size 12px
    vertical-align center
    border none
    background-color #f0f0f0
common-btn($bg-color,$color)
  flex 1
  background $bg-color
  color $color
  border-radius 5px
  height 38px
  line-height 38px
  text-align center
  font-size 14px


.login-latest
  position: fixed;
  top:0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  // background: #6c6c6c;
  background:linear-gradient(#abcbfc,#f7faff);
  .login-wrapper
    width 460px
    margin 0 auto
    position absolute
    left 50%
    top 30px
    transform translate(-50%,0)
    // background #fff
    // border-radius 5px
    overflow hidden
    // 头部
    .header
      common-header()
    // 内容
    .content
      padding 16px 24px 0
      background-color #fff
      .title
        color #494949
        font-size 24px
        padding 16px 0
        text-align center
        font-weight 500
      .input-wrapper
        position relative
        common-input()
        .index-common-btn
          position absolute
          right 0
          bottom 1px
          top 0
          width 42px
          // border-left 1px solid #d9d9d9
          font-size 20px
          line-height 38px
          text-align center
          background-color #e5e5e5
          color #c1c1c1 
          cursor pointer
          height auto
          &.eye-input
            color #333
        .get-code-btn
          position absolute
          font-size 14px
          text-decoration none
          top 0
          right 0
          bottom 0
          padding 0 8px
          line-height 38px
          border-left 1px solid #d9d9d9
        .account-list
          position absolute
          z-index 10
          width 100%
          left 0
          top 45px
          li

            line-height 30px
            height 30px
            font-size 16px
            background #fff
            border 1px solid #d9d9d9
            padding-left 10px
            box-sizing border-box
      // 按钮
      .btn-wrapper
        display flex
        // margin-bottom 20px
        padding-bottom 15px
        div
          cursor pointer
        .register-btn
          margin-right 5px
          common-btn(#f72243,#fff)

        .login-btn
          margin-left 5px
          common-btn(#9f758d,#fff)
        .phone-login-btn
          common-btn(#9f758d,#fff)
      //链接
      .btn-other
        width 100%
        pa
        a
          cursor pointer
        .bind
          float left
          color #f72243
          font-size 14px
        .update
          float right
          color #989898
          font-size 14px
          padding 5px 0
    .bottom
      padding 0 24px
      background-color #fff
      .description
        width 160px
        padding 10px 0
        margin 0 auto
        display flex
        color #8a8a8a
        .line
          position relative
          top 6px
          flex 1
          border-top 1px solid #8a8a8a
        .content
          padding 0 10px
          font-size 12px
          background-color #fff
      .other-login
        width 160px
        margin 0 auto
        display flex
        justify-content space-around
        div
          cursor pointer
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
