<template>
  <div class="login-phone login-wrapper">
    <div class="header">
      <i class="logo"></i>
      <a class="close icon-close" @click="back"></a>
    </div>
    <div class="content">
      <h1 class="title">手机登录</h1>
      <div class="input-wrapper">
        <span>手&nbsp;机&nbsp;号:</span>
        <input type="text" placeholder="请输入手机号码" class="phone-input" autocomplete="off" @blur="validatePhone" v-model="phone">
      </div>
      <div class="input-wrapper">
        <span>验&nbsp;证&nbsp;码:</span>
        <input type="text" placeholder="请输入短信验证码" class="message-code" autocomplete="off" v-model="code">
        <s class="get-code-btn" @click="getCode" v-if="yanzhengBtn == true">{{yanzhengVal}}</s>
        <span class="get-code-btn" v-else style="color: #d8d8d8;">{{yanzhengVal}}</span>
      </div>
      <div class="btn-wrapper">
        <div class="phone-login-btn" @click="login">登录</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    props: {
      loginFunc: {
        type: String
      }
    },
    data () {
      return {
        phone : '',
        code : '',
        wait:60,    //手机验证码等待时间
        yanzhengVal:'获取验证码',  //手机验证码提示
        yanzhengBtn:true,   //判断手机验证码按钮true/false,
      };
    },
    components: {

    },
    methods: {
      back() {
        this.$emit('select-login');
      },
      //手机登录
      //获取验证码
      getCode(){
        if(this.validatePhone()){
          this.$axios.get('/api/H5/User/sendPhoneVerify',{
              params : {
                  phone : this.phone,
                  type : 5
              }
          })
            .then(res => {
              console.log(res)
              if (res.data.code === 2000){
                this.getCodeBtn()
                console.log(res.data.msg)
              }
              else{
                layer.msg(res.data.msg)
              }

            })
            .catch(function(error){
              console.log(error)
            })
        }
      },
      //验证手机号
      validatePhone(){
        if (!/^1\d{10}/.test(this.phone)){
          layer.msg('手机号输入错误!');
          return false;
        }
        return true;
      },
      //获取验证码的倒计时
      getCodeBtn(){
        console.log('输出')
        let vueThis = this
        let daojishi = setInterval(function(){
          console.log('每一秒,都说明我在想你')
          if(vueThis.wait === 0){
            vueThis.yanzhengVal = '获取验证码'
            vueThis.yanzhengBtn = true
            vueThis.wait = 60
            this.clearInterval(daojishi)
          }else{
            vueThis.yanzhengBtn = false
            vueThis.yanzhengVal = vueThis.wait + '秒后重试'
            vueThis.wait--
          }
        },1000)
      },
      login(){
        let _this = this;
        if(this.validatePhone() && this.code !== ''){
          this.$axios.get('/api/H5/User/phoneLogin',{
            params:{
              phone : this.phone,
              v_code : this.code,
              redirect : _this.getUrlParam('redirect') ? decodeURIComponent(this.getUrlParam('redirect')) : '/'
            }
          })
            .then(res => {
              console.log(res)
              if (res.data.code === 2000){
                console.log('登录成功')
                // 2.跳转
                layer.msg(res.data.msg)
                let redirect  = _this.getUrlParam('redirect') ? decodeURIComponent(this.getUrlParam('redirect')) : '/'
                setTimeout(function() {
                  window.location.href = redirect;
                }, 1000);
              }
              else{
                layer.msg(res.data.msg);
              }
            })
            .catch(function(error){
              console.log(error)
            })
        }else if(this.validatePhone()){
          layer.msg("手机号输入错误");
        }else{
          layer.msg("请输入验证码");
        }
      },
      getUrlParam(name) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        let result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null
      }
    }
  };
</script>

<style scoped lang="stylus">


</style>
