<template>
  <div class="update login-wrapper">
    <div class="header">
      <i class="logo"></i>
      <a class="close icon-close" @click="back"></a>
    </div>
    <div class="content">
      <h1 class="title">修改密码</h1>
      <div class="input-wrapper">
        <span>账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:</span>
        <input type="text" placeholder="请输入账号" v-model="username">
      </div>
      <div class="input-wrapper">
        <span>原&nbsp;密&nbsp;码:</span>
        <input type="password" placeholder="请输入密码" v-model="password">
      </div>
      <div class="input-wrapper">
        <span>新&nbsp;密&nbsp;码:</span>
        <input type="password" placeholder="长度为6-20位,大小写字母或数字" v-model="newPassword">
      </div>
      <div class="input-wrapper">
        <span>确认密码:</span>
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

                layer.msg(res.data.msg);

                // 2.跳转
                let redirect  = _this.getUrlParam('redirect') ? decodeURIComponent(_this.getUrlParam('redirect')) : '/login'
                setTimeout(function() {
                  window.location.href = redirect;
                }, 1000);

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
      }
    }
  };
</script>

<style scoped lang="stylus">


</style>
