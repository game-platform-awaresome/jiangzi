<template>
  <div class="bind-phone login-wrapper">
    <div class="header">
      <i class="logo"></i>
      <a class="close icon-close" @click="back"></a>
    </div>
    <div class="content">
      <h1 class="title">手机绑定</h1>
      <div class="input-wrapper">
        <span>账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:</span>
        <input type="text" placeholder="请输入账号" v-model="username">
      </div>
      <div class="input-wrapper">
        <span>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:</span>
        <input type="password" placeholder="请输入密码" v-model="password">
      </div>
      <div class="input-wrapper">
        <span>手&nbsp;机&nbsp;号:</span>
        <input type="text" placeholder="请输入手机号" v-model="tel">
      </div>
      <div class="input-wrapper">
        <span>验&nbsp;证&nbsp;码:</span>
        <input type="text" placeholder="请输入验证码" class="message-code" autocomplete="off" v-model="code">
        <s class="get-code-btn" @click="getCode" v-if="yanzhengBtn == true">{{yanzhengVal}}</s>
        <span class="get-code-btn" v-else style="color: #d8d8d8;">{{yanzhengVal}}</span>
      </div>
      <!-- <p class="per-fail">{{ fail }}</p> -->
      <div class="btn-wrapper">
        <div class="phone-login-btn" @click="bind()">绑定</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  import qs from 'qs';
  export default {
    created(){
      this.getData()
    },
    component:{
      Toast
    },
    data () {
      return {
        tel:'',   //输入的手机号
        yanzhengCode:'',    //输入的手机验证码
        wait:60,    //手机验证码等待时间
        yanzhengVal:'获取验证码',  //手机验证码提示
        yanzhengBtn:true,   //判断手机验证码按钮true/false
        fail:'',//注册填写错误提示
        theClass:{
          'fail-color':true
        },
        flag:false,
        user:'',
        code:'',   //绑定是否成功

        username: '',
        password: ''
      }
    },
    methods:{
      back() {
        this.$emit('select-login');
      },
      getData(){
        this.$http.get('/api/index.php?m=User&a=getUserinfo').then(function (res) {
          //平台登录信息
          this.user = res.body.user
        }, function (err) {
          console.log(err)
        })
      },
      getCode(){
        let send = {phone: this.tel}
        let reg = /^1[34578]\d{9}$/
        if (!(reg.test(this.tel))){
          this.fail = '手机号格式错误!!!'
          return;
        }
        if (this.flag === false) {

          this.$http.get('/api/h5/user/sendPhoneVerify?type=1&phone='+ this.tel).then(function (res) {
            // console.log(res)
            if (res.body.code === 2000) {
              //成功
              console.log(111)
              this.flag = true
              this.getCodeBtn()
              this.fail = ''
            } else {
              //手机号格式错误
              // this.fail = res.body.msg
              layer.msg(res.body.msg)
            }
          }, function (err) {
            console.log(err)
          })






        } else {
          this.getCodeBtn()
        }
      },
      getCodeBtn(){

        console.log('输出')
        console.log(this.yanzhengVal)
        console.log(this)
        let vueThis = this
        let daojishi = setInterval(function(){
            console.log('this'+ this)
          console.log(vueThis.yanzhengVal)
          console.log('GQC')
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
      bind(){
        let _this = this;
        this.$axios.post('/api/h5/user/accountBindPhone',qs.stringify({
                username : this.username,
                password : this.password,
                phone : this.tel,
                verify : this.code
            }))
          .then(res => {
            if (res.data.code === 2000){
              //绑定成功
              layer.msg(res.data.msg);
              // 2.跳转
              // 废弃跳转到redirect方案
              /* let redirect  = _this.getUrlParam('redirect') ? decodeURIComponent(_this.getUrlParam('redirect')) : '/login?redirect='+_this.getUrlParam('redirect')
              setTimeout(function() {
                window.location.href = redirect;
              }, 1000); */

              // 直接跳转login(也废弃)
             /*  let redirect  = '/login?redirect='+_this.getUrlParam('redirect')
              setTimeout(function() {
                window.location.href = redirect;
              }, 1000); */

              _this.back();
            }
            else{
              //绑定失败
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

<style scoped lang="stylus">


</style>
