<template>
  <div class="login">
    <div class="login-window" v-if="isPhoneLogin === false">
        <div class="login-header">
          <span></span>
          游戏登录
        </div>
        <div class="login-type">
          <a :href="wechatLoginUrl()">
            <div class="login-type-item wechat">
              <p>微信</p>
            </div>
          </a>
          <a :href="tencentLoginUrl()">
            <div class="login-type-item tencent">
              <p>QQ</p>
            </div>
          </a>
          <a @click="phoneLogin">
            <div class="login-type-item phone">
              <p>手机</p>
            </div>
          </a>
        </div>
    </div>
    <phoneLogin v-if="isPhoneLogin === true" @select-login="backSelect"></phoneLogin>
  </div>
</template>

<script>
  import phoneLogin from './phoneLogin.vue'
  export default {
    name: 'hello',
    data () {
      return {
        isPhoneLogin:false,
      }
    },
    methods:{
        phoneLogin(){
            this.isPhoneLogin = true
        },
        backSelect(){
            this.isPhoneLogin = false
        },
        wechatLoginUrl(){

            let token     = this.getUrlParam('token') ? '&token='+this.getUrlParam('token') : '';
            let redirect  = this.getUrlParam('redirect') ? '&redirect='+this.getUrlParam('redirect') : '';

            return '/api/h5/user/oauthlogin?oauthtype=scan' + token + redirect;　　　　　　　　　　　　　

        },
        tencentLoginUrl(){
            let token     = this.getUrlParam('token') ? '&token='+this.getUrlParam('token') : '';
            let redirect  = this.getUrlParam('redirect') ? '&redirect='+this.getUrlParam('redirect') : '';

            return '/api/h5/user/oauthlogin?oauthtype=qq' + token + redirect;

        },
        getUrlParam(name) {
            let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
            let result = window.location.search.substr(1).match(reg);
            return result ? decodeURIComponent(result[2]) : null
        },
    },
    components:{
        phoneLogin
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login{
    background: #000;
    position: fixed;
    top:0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 999;
  }
.login-window{
  width: 324px;
  height: 188px;
  border:1px solid #ececec;
  /*box-shadow: 0 0 20px;*/
  position: absolute;
  top:40%;
  left: 50%;
  transform: translate(-50%,-50%);
  background: #fff;
  border-radius: 5px;
}
.login-header{
  overflow: hidden;
  border-bottom: 1px solid #eaeaea;
  line-height: 43px;
  font-size: 21px;
  color: #202020;
  padding: 5px;
  width: 289px;
  margin:0 auto;
}
  .login-header span{
    display: block;
    float: left;
    width: 44px;
    height: 46px;
    background: url("../../assets/pc-login-jiangzi.png") no-repeat 0 0 ;
    background-size: contain;
    margin: 0 5px 0 76px;
  }
  .login-type{
    padding: 20px;
    overflow: hidden;
  }
  .login-type-item{
    width: 58px;
    height: 88px;
    display: inline-block;
    position: relative;
    margin:0 15px;
  }
  .login-type-item p{
    position: absolute;
    width: 100%;
    bottom: 0;
    text-align: center;
    color: #202020;
    font-size: 13px;

  }
  .login-type-item.wechat{
    background: url("../../assets/pc-login-wechat.png") no-repeat 0 0;
  }
.login-type-item.tencent{
  background: url("../../assets/pc-login-tencent.png") no-repeat 0 0;
}
.login-type-item.phone{
  background: url("../../assets/pc-login-phone.png") no-repeat 0 0;
  cursor: pointer;
}
</style>
