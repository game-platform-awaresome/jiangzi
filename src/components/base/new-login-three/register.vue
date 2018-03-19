<template>
  <div class="register login-wrapper">
    <div class="header">
        <!-- <i class="logo"></i> -->
        <span class="new-icon fa fa-angle-left" @click="backIndex"></span>
        注册
        <!-- <span class="new-register" @click="login">登录</span> -->
      </div>
    <div class="content">
      <!-- <h1 class="title">用户注册</h1> -->
      <div class="input-wrapper">
        <span>账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 号:</span>
        <input type="text" placeholder="必须包含字母和数字,6-20位" v-model="username" @blur.stop="hasAccount">
      </div>
      <div class="input-wrapper">
        <span>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 码:</span>
        <input type="password" placeholder="长度为6-20位,大小写字母或数字" v-model="password">
      </div>
      <div class="input-wrapper">
        <span>确认密码:</span>
        <input type="password" placeholder="与密码输入一致" v-model="repassword">
      </div>
      <div class="btn-wrapper">
        <div class="register-btn" @click="register">注册</div>
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
      backIndex() {
        this.$emit('select-login');
      },
      //注册
      register() {
        let _this = this;
        this.$axios.post('/api/h5/user/register',qs.stringify({
                type : 'account',
                username : this.username,
                password : this.password,
                repassword : this.repassword,
                redirect : _this.getUrlParam('redirect')
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


                layer.msg(res.data.msg);

                // 2.跳转
                let redirect  = _this.getUrlParam('redirect') ? decodeURIComponent(_this.getUrlParam('redirect')) : '/login'
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
      getUrlParam(name) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        let result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null
      },
      login() {
        this.$emit('select-login')
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
@import "~@/components/base/new-login-three/style.stylus"

</style>
