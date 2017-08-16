<template>
  <div class="phone-login">
    <div class="phone-login-header">
      <span class="logo"></span>
      游戏登录
      <span class="close" @click="back">
        <i class="fa fa-close"></i>
      </span>
    </div>
    <div class="login-wrap">
      <label for="phone" style="font-size: 30px;">
        <i class="fa fa-mobile"></i>
      </label>
      <input type="text" placeholder="请输入手机号码" class="phone-input" id="phone" autocomplete="off" @blur="validatePhone" v-model="phone">
    </div>
    <div class="login-wrap">
      <label for="code">
        <i class="fa fa-lock"></i>
      </label>
      <input type="text" placeholder="请输入短信验证码" class="message-code" id="code" autocomplete="off" v-model="code">
      <span class="get-code-btn" @click="getCode" v-if="yanzhengBtn == true">{{yanzhengVal}}</span>
      <span class="get-code-btn" v-else style="color: #d8d8d8;">{{yanzhengVal}}</span>
    </div>
    <a class="login-btn" @click="login">登录</a>
    <a class="other-login" @click="back">其他方式登录</a>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      phone : '',
      code : '',
      wait:60,    //手机验证码等待时间
      yanzhengVal:'获取验证码',  //手机验证码提示
      yanzhengBtn:true,   //判断手机验证码按钮true/false,
    }
  },
  methods:{
    //返回到登录方式选择
    back(){
        this.$emit('select-login');
    },
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
        if(this.validatePhone() && this.code !== ''){
          this.$axios.get('/api/H5/User/phoneLogin',{
            params:{
              phone : this.phone,
              v_code : this.code
            }
          })
            .then(res => {
              console.log(res)
              if (res.data.code === 2000){
                console.log('登录成功')
                window.location.reload()
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

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.phone-login{
  width: 280px;
  height: 236px;
  padding: 10px 25px;
  border: 1px solid #ececec;
  position: absolute;
  top:40%;
  left: 50%;
  transform: translate(-50%,-50%);
  border-radius: 5px;
  background: #fff;
}
  .phone-login-header{
    position: relative;
    height: 44px;
    line-height: 44px;
    color: #333;
    font-size: 20px;
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
    padding-bottom: 10px;
  }
  .phone-login-header .logo{
    display: block;
    float: left;
    margin: 0 5px 0 68px ;
    width: 44px;
    height: 44px;
    background: url("../../assets/pc-login-jiangzi.png") no-repeat;
  }
  .phone-login-header .close{
    position: absolute;
    display: inline-block;
    /*padding: 5px;*/
    top:0;
    right: 0;
  }
  .phone-login-header .close i{
    padding: 5px;
    cursor: pointer;
    color: #c0c0c0;
    transform: translate(20px,-15px);
  }
  .login-wrap{
    border:1px solid #f8f8f8;
    border-radius: 3px;
    margin-bottom: 10px;
    position: relative;
  }
  .login-wrap label{
    display: block;
    position: absolute;
    top:0;
    left:0;
    bottom: 0;
    width: 40px;
    border-right: 1px solid #f8f8f8;
    font-size: 26px;
    line-height: 36px;
    color: #3299f7;
    text-align: center;
    background: #eee;
  }
  .login-wrap input{
    border:none;
    outline: none;
    padding: 11px 0 11px 50px;
    color: #b3b3b3;
  }
  .get-code-btn{
    display: block;
    position: absolute;
    top:0;
    right: 0;
    bottom: 0;
    width: 80px;
    text-align: center;
    line-height: 36px;
    font-size: 14px;
    color: #3299f7;
    border-left: 1px solid #f8f8f8;
    cursor: pointer;
  }
  .login-btn{
    display: block;
    height: 42px;
    line-height: 42px;
    text-align: center;
    background: #3299f7;
    color: #fff;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
  }
  .other-login{
    position: absolute;
    bottom: 10px;
    color: #3299f7;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
  }
</style>
