<template>
  <div class="update login-wrapper">
    <div class="header">
        <span class="new-icon fa fa-angle-left" @click="back"></span>
        修改密码
        <!-- <span class="new-register" @click="register">注册</span> -->
      </div>
    <div class="content">
      <!-- <h1 class="title">修改密码</h1> -->
      <div class="input-wrapper">
        <span>账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 号:</span>
        <input type="text" placeholder="请输入账号" v-model="username">
      </div>
      <div class="input-wrapper">
        <span>原&nbsp; 密&nbsp; 码:</span>
        <input type="password" placeholder="请输入密码" v-model="password">
      </div>
      <div class="input-wrapper">
        <span>新&nbsp; 密&nbsp; 码:</span>
        <input type="password" placeholder="长度为6-20位,大小写字母或数字" v-model="newPassword">
      </div>
      <div class="input-wrapper">
        <span> 确认密码:</span>
        <input type="password" placeholder="与密码输入一致" v-model="newRepassword">
      </div>
      <!-- <p class="per-fail"></p> -->
      <div class="btn-wrapper">
        <div class="phone-login-btn" @click="update()">修改密码</div>
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
        newPassword:'',
        newRepassword:''
      };
    },
    components: {

    },
    methods: {
      back() {
        this.$emit('select-login');
      },
      update() {
        let _this = this;
        this.$axios.post('/api/h5/user/modify',qs.stringify({
                username : this.username,
                password : this.password,
                new_password : this.newPassword,
                new_repassword : this.newRepassword
            })
        )
          .then(res => {
            if (res.data.code === 2000){

                // 修改成功后同步本地存储的账号密码
                // 遍历localstorage
                for(let i=0;i<localStorage.length;i++) {
                  let userObj = JSON.parse(localStorage.getItem('user'+(i+1)));
                  console.log('userobj'+ userObj.account)
                  console.log('username'+ _this.username)
                  if(userObj.account === _this.username) {

                    localStorage.removeItem('user'+(i+1));
                    // 填入新账号信息
                    let userInfo = '{"code":2000,"msg":"登录成功","account":"'+ _this.username +'","password":"'+ _this.newPassword +'"}';
                    localStorage.setItem('user'+(i+1),userInfo);
                    console.log('修改成功')
                    //将修改后的密码传入父组件
                    _this.$emit('update-psd',_this.newPassword);
                    break;
                  }
                }


                layer.msg(res.data.msg);
                // 2.跳转
                // 废弃跳转到redirect方案
                /* let redirect  = _this.getUrlParam('redirect') ? decodeURIComponent(_this.getUrlParam('redirect')) : '/login?redirect='+_this.getUrlParam('redirect')
                setTimeout(function() {
                  window.location.href = redirect;
                }, 1000); */

                // 直接跳转login(也废弃)
                /* let redirect  = '/login?redirect='+_this.getUrlParam('redirect')
                setTimeout(function() {
                  window.location.href = redirect;
                }, 1000); */

                _this.back();

            }else{
              layer.msg(res.data.msg);
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
      back() {
        this.$emit('select-login')
      }
    }
  };
</script>

<style scoped lang="stylus">

@import "~@/components/base/new-login-four/style.stylus"
</style>
