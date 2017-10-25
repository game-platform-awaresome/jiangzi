<template>
  <div class="register login-wrapper">
    <div class="header">
      <i class="logo"></i>
      <a class="close icon-close" @click="back"></a>
    </div>
    <div class="content">
      <h1 class="title">用户注册</h1>
      <div class="input-wrapper">
        <span>账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:</span>
        <input type="text" placeholder="必须包含字母和数字,6-20位" v-model="username" @blur.stop="hasAccount">
      </div>
      <div class="input-wrapper">
        <span>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:</span>
        <input type="password" placeholder="长度为6-20位,大小写字母或数字" v-model="password">
      </div>
      <div class="input-wrapper">
        <span>确认密码:</span>
        <input type="password" placeholder="与密码输入一致" v-model="repassword">
      </div>
      <div class="btn-wrapper">
        <div class="register-btn" @click="register">一键注册</div>
      </div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import qs from 'qs';

  export default {
    data () {
      return {
        username:'',
        password:'',
        repassword:'',
        redirect:''
      };
    },
    components: {

    },
    methods: {
      back() {
        this.$emit('select-login');
      },
      //注册
      register() {
        this.$axios.post('/api/h5/user/register',qs.stringify({
                type : 'account',
                username : this.username,
                password : this.password,
                repassword : this.repassword,
                redirect : ''
            })
        )
          .then(res => {
            if (res.data.code === 2000){
              if(!this.redirect) {
                layer.msg(res.data.msg);
                setTimeout(function() {
                  window.location.href = '/login'
                }, 2000);

              }
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
  };
</script>

<style scoped lang="stylus">


</style>
