<template>
  <div class="login-latest">
    <!-- 用户登录 -->
    <div class="login-index login-wrapper" v-if="loginFunc === ''">
      <!-- header -->
      <div class="header">
        <!-- <i class="logo"></i> -->
        <span class="new-icon fa fa-angle-left" @click="backIndex"></span>
        登录
        <!-- <span class="new-register" @click="register">注册</span> -->
      </div>
      <!-- content -->
      <div class="content">
        <div class="btn-other clearfix-new">
          <a class="bind" @click="register">马上注册</a>
          <a class="update" @click="update">修改密码</a>
        </div>
        <!-- <h1 class="title">用户登录</h1> -->
        <div class="input-wrapper">
          <span>账号</span>
          <input type="text" placeholder="请输入账号" v-model="username" autocomplete="off">
          <span class="index-common-btn account-list-btn icon-chevron-thin-down" @click.stop="openlist"></span>
          <ul class="account-list" v-if="openUserList">
            <li v-for="item in userList" @click="selectAccount(item)">
              {{item.account}}
            </li>
          </ul>
        </div>
        <div class="input-wrapper">
          <span>密码</span>
          <input type="password" placeholder="请输入密码" v-model="password" v-if="inputType" autocomplete="off">
          <input type="text" placeholder="请输入密码" v-model="password" v-else >
          <span class="index-common-btn icon-eye" :class="{'eye-input': !inputType}" @click="hidePassword"></span>
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
import loginPhone from "@/components/base/new-login-three/loginLatestPhone";
import bindPhone from "@/components/base/bindPhone";
import updatePsd from "@/components/base/new-login-three/updatePsd";
import register from "@/components/base/new-login-three/register";
import "font-awesome/css/font-awesome.min.css";
import qs from "qs";
export default {
  created() {
    this.getLocalStorage();
    this.loginPageCount();
  },
  data() {
    return {
      loginFunc: "", //登录方式
      username: "", //用户名
      password: "", //密码
      userList: [], //账号列表
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
    document.addEventListener("click", function(params) {
      _this.openUserList = false;
    });
  },
  methods: {
    // 通过本地存储获取用户数据
    getLocalStorage() {
      this.userList = [];
      for (let i = 0; i < localStorage.length; i++) {
        let str = JSON.parse(localStorage.getItem("user" + (i + 1)));
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
      this.loginFunc = "register";
    },
    //微信登录
    wechatLoginUrl() {
      let token = this.getUrlParam("token")
        ? "&token=" + encodeURIComponent(this.getUrlParam("token"))
        : "";
      let redirect = this.getUrlParam("redirect")
        ? "?redirect=" + encodeURIComponent(this.getUrlParam("redirect"))
        : "";
      let redirect2 = this.getUrlParam("redirect")
        ? "&redirect=" + encodeURIComponent(this.getUrlParam("redirect"))
        : "";

      if (this.isWechat()) {
        window.location.href =
          "/api/h5/user/oauthlogin/oauthtype/wechat" + redirect;
      } else {
        window.location.href =
          "/api/h5/user/oauthlogin?oauthtype=scan" + redirect2;
      }
    },
    // 手机登录
    phoneLogin() {
      this.loginFunc = "phone";
    },
    // QQ登录
    tencentLoginUrl() {
      // let token     = this.getUrlParam('token') ? '&token='+ encodeURIComponent(this.getUrlParam('token')) : '';
      let redirect = this.getUrlParam("redirect")
        ? "&redirect=" + encodeURIComponent(this.getUrlParam("redirect"))
        : "";

      let theHtml = decodeURIComponent(redirect);
      let qqapp = "lt=wd";
      if (theHtml.includes(qqapp)) {
        window.location.href =
          "/api/h5/user/oauthlogin?oauthtype=qqapp" + redirect;
      } else {
        window.location.href =
          "/api/h5/user/oauthlogin?oauthtype=qq" + redirect;
      }
    },
    backIndex() {
      this.$router.push("/index");
    },
    //绑定手机
    bind() {
      this.loginFunc = "bind";
    },
    //修改密码
    update() {
      this.loginFunc = "update";
    },
    //工具类
    getUrlParam(name) {
      let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      let result = window.location.search.substr(1).match(reg);
      return result ? decodeURIComponent(result[2]) : null;
    },
    isWechat() {
      let ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        console.log("是微信浏览器");
        return true;
      } else {
        console.log("不是微信浏览器");
        return false;
      }
    },
    back() {
      this.loginFunc = "";
    },
    /* ----------------------------------------
      *               登录部分
      ---------------------------------------- */
    login() {
      let _this = this;
      this.$axios
        .post(
          "/api/h5/user/accountLogin",
          qs.stringify({
            username: this.username,
            password: this.password
          })
        )
        .then(res => {
          if (res.data.code === 2000) {
            // 1.存账号
            // 是否存储数据?
            let flag = true;
            //本地存储
            let user = "user" + (localStorage.length + 1);
            let password = JSON.stringify(res.data);

            for (let i = 0; i < localStorage.length; i++) {
              if (localStorage.getItem("user" + (i + 1)) === password) {
                flag = false;
              }
            }

            if (flag) {
              localStorage.setItem(user, password);
            }

            // 2.跳转
            MessageBox.confirm("是否现在绑定手机?")
              .then(action => {
                this.loginFunc = 'bind'
              })
              .catch(action => {
                layer.msg(res.data.msg);
                let redirect = _this.getUrlParam("redirect")
                  ? decodeURIComponent(this.getUrlParam("redirect"))
                  : "/";
                setTimeout(function() {
                  window.location.href = redirect;
                }, 1000);
              });
          } else {
            layer.msg(res.data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //用户名是否存在
    hasAccount() {
      this.$axios
        .post(
          "/api/h5/user/verifyAccount",
          qs.stringify({
            username: this.username
          })
        )
        .then(res => {
          if (res.data.code === 2000) {
            return;
          } else if (res.data.code === 4003) {
            console.log("此账号有效");
          } else {
            layer.msg(res.data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //统计login页面曝光次数
    loginPageCount() {
      let _this = this;
      this.$axios
        .post(
          "/api/h5/user/loginCount",
          qs.stringify({
            route: "login",
            redirect: _this.getUrlParam("redirect")
          })
        )
        .then(res => res);
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
      this.$axios
        .post(
          "/api/h5/user/register",
          qs.stringify({
            type: "key",
            redirect: _this.getUrlParam("redirect")
          })
        )
        .then(res => {
          if (res.data.code === 2000) {
            layer.msg(
              "欢迎您 " +
                '<span style="color:red">' +
                res.data.account +
                "</span>" +
                "正在登录..."
            );
            // 1.存账号
            // 是否存储数据标记
            let flag = true;
            //本地存储
            let user = "user" + (localStorage.length + 1);
            let password = JSON.stringify(res.data);
            for (let i = 0; i < localStorage.length; i++) {
              if (localStorage.getItem("user" + i) === password) {
                flag = false;
              }
            }
            //存储
            if (flag) {
              localStorage.setItem(user, password);
            }
            // 2.跳转
            let redirect = _this.getUrlParam("redirect")
              ? decodeURIComponent(_this.getUrlParam("redirect"))
              : "/";
            setTimeout(function() {
              window.location.href = redirect;
            }, 1000);
          } else {
            layer.msg(res.data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import "~@/components/base/new-login-three/style.stylus"

</style>
