<template>
  <div class="">
    <div class="register-box">
      <p class="register-tit">首次登录需要绑定手机号</p>
      <div class="register-input-box">
        <span>手机号</span>  <input type="text" v-model="tel">
      </div>
      <div class="register-input-box">
        <span>图片验证码</span> <input type="text" v-model="imgCode"><img :src="imgUrl" @click="changeUrl()" alt="" class="img-code">
      </div>
      <p class="fail-info" :class="theClass">{{ fail.words }} <input type="button" @click="changeUrl()" value="切换图片"></p>
      <div class="register-input-box">
        <span>手机验证码</span>  <input type="text" v-model="yanzhengCode">
        <input type="button" :value="yanzhengVal" @click="getCode()" v-if="yanzhengBtn == true">
        <input type="button" :value="yanzhengVal" @click="getCode()" v-else disabled style="color: #d8d8d8">
      </div>
      <p class="fail-info">{{ fail.register }}</p>
      <input type="button" @click="register(tel,yanzhengCode)" value="立即注册" class="register-btn">
    </div>

  </div>
</template>

<script>
export default {
  created(){
//    this.$http.get('/api/?g=h5&m=user&a=verify',{phone:tel,verify:imgCode}).then(function(res) {
//
//    },function (err) {
//      console.log(err)
//    })
    console.log(this.imgObjUrl)
  },
  name: 'register',
  data () {
    return {
      tel:'',   //输入的手机号
      imgCode:'',   //输入的图片二维码
      imgUrl: '/api/?g=h5&m=user&a=verify&vc=',    //图片二维码地址
      yanzhengCode:'',    //输入的手机验证码
      wait:60,    //手机验证码等待时间
      yanzhengVal:'获取验证码',  //手机验证码提示
      yanzhengBtn:true,   //判断手机验证码按钮true/false
      fail:{
          words:'',   //注册填写错误提示
          register:'' //注册错误提示
      },
      theClass:{
          'fail-color':true
      }
    }
  },
  methods:{
    changeUrl(){
      this.imgUrl = this.imgUrl + Math.random()
    },
    getCode(){
      let flag = false
      let send = {phone:this.tel,verify:this.imgCode}
      if (flag === false){
        this.$http.post('/api/?g=h5&m=user&a=sendVerify',send,{emulateJSON:true}).then(function(res) {
          console.log(res)
          if (res.body.code === 1){
            //成功
            flag = true
            this.getCodeBtn()
            this.fail.words = ''
          }else{
            //手机号格式错误
            this.fail.words = res.body.msg
          }
        },function (err) {
          console.log(err)
        })
      }else{
        this.getCodeBtn()
      }


    },
    getCodeBtn(){
      console.log('输出')
      console.log(this.yanzhengVal)
      console.log(this)
      let vueThis = this
      let daojishi = setInterval(function(){
        console.log(vueThis.yanzhengVal)
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
    register(tel,yanzhengCode){
        let registerContent = {phone:tel,verify:yanzhengCode,type:1}
        this.$http.post('/api/?g=h5&m=user&a=registerByPhone',registerContent).then(function (res) {
          if (res.body.code === 1){
              //注册成功
              alert('注册成功')
              this.$router.push({path:'/'})
          }else{
              //注册失败
              this.fail.register = res.body.msg
          }
        })
    }

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .register-box{

  }
.register-tit{
  text-align: center;
  line-height: 6rem;
}
  .register-tit span{
    color: #ff0000;
  }
  .register-input-box{
    width: 90%;
    border-bottom: 0.1rem solid #d8d8d8;
    margin: 0 auto;
    line-height: 4rem;
  }
  .register-input-box input[type=text]{
    border:none;
    height:2rem;
    margin-left: 1rem;
  }
  .register-input-box input[type=button]{
    background-color: #fff;
    border: 0.1rem solid #d8d8d8;
    color: #272727;
    width: 7rem;
    height: 2.5rem;
    float: right;
    margin-top: 0.75rem;
  }
  .register-btn{
    width: 90%;
    height:4rem;
    color: #fff;
    background-color: #ff7800;
    border: none;
    margin: 2rem auto;
    display: block;
    font-size: 2rem;

  }
  .img-code{
    width: 7rem;
    height: 2.5rem;
    vertical-align: middle;
    float: right;
    margin-top: 0.75rem;
  }
  .register-input-box span{
    display: inline-block;
    width: 5rem;
  }
  .fail-info{
    line-height: 2rem;
    text-indent: 2rem;
    height: 2rem;
  }
  .fail-info input{
    background-color: #fff;
    border:none;
    float: right;
    margin-right: 2rem;
    height: 2rem;
  }
  .fail-color{
    color:red;
  }
</style>
