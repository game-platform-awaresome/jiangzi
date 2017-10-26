<template>
  <div id="guoqianchen">
    <div class="main-wrap" :class="{'not-login' : !isLogin}">
      <div class="main">
        <div class="scroll">
          <!--路由 S-->
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
          <!--路由 E-->
          <!--footer S-->
          <div class="footer">
            <ul>
              <router-link :to="{path:'/index'}">
                <li class="footer-link-1">
                  <div class="footer-logo"></div>
                  <p>游戏</p>
                </li>
              </router-link>
              <router-link :to="{path:'/store'}">
                <li class="footer-link-2 footer-store">
                  <div class="footer-logo"></div>
                  <p>商城</p>
                </li>
              </router-link>
              <router-link :to="{path:'/gift'}">
                <li class="footer-link-3">
                  <div class="footer-logo"></div>
                  <p>礼包</p>
                </li>
              </router-link>
              <router-link :to="{path:'/person'}">
                <li class="footer-link-5 footer-person">
                  <div class="footer-logo"></div>
                  <p>个人</p>
                </li>
              </router-link>
            </ul>
          </div>
          <!--footer E-->
        </div>
      </div>
    </div>
    <!--PC端页面 S-->
    <div class="pc-wrap" v-if="isLogin !== true">
      <div class="pc-header">
        <div class="pc-logo"></div>
      </div>
    </div>
  </div>
</template>

<script>
//  import wx from 'wx-js-sdk'
export default {
  created(){
    if(window.location.pathname === '/login'){
        this.isLogin = true;
    }

    //用户信息初始化
    this.getUserInfo()

    let _this = this;
    //微信分享SDK
    this.$axios.get('/api/h5/index/getwechatsdkconf?route='+ encodeURIComponent(window.location.pathname+window.location.search))
      .then(res => {
        this.config = res.data;
        wx.config(this.config)

        /*s*/
//        分享到朋友圈
        wx.onMenuShareTimeline({
          title: '游戏酱紫,即点即玩,游戏就是这样简单', // 分享标题
          link: 'http://h5.wan855.cn', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'http://h5.wan855.cn/logo.png', // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
            alert('分享成功!')
            _this.$axios.get('/api/Integral/Task/share')
              .then(res => {
                if (res.code === '200'){
                  console.log(res.msg)
                  location.reload()
                }
              })
              .catch(function(error){
                console.log(error)
              })
          },
          cancel: function () {

          },
          error:function () {
          }
        })
        /*e*/

//        分享给朋友
        wx.onMenuShareAppMessage({
          title: '游戏酱紫', // 分享标题
          desc: '即点即玩,游戏就是这样简单', // 分享描述
          link: 'http://h5.wan855.cn', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'http://h5.wan855.cn/logo.png', // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            // 用户确认分享后执行的回调函数
            alert('分享成功!')
            _this.$axios.get('/api/Integral/Task/share')
              .then(res => {
                if (res.code === '200'){
                  console.log(res.msg)
                  location.reload()
                }
              })
              .catch(function(error){
                console.log(error)
              })
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
//            alert('用户取消分享后执行的回调函数!')
          }
        });



      })
      .catch(function(error){
          console.log(error)
      })

  },
  components:{

  },
  data(){
      return{
        linkcolor:true,
        user:{

        },
        config:'',
        isLogin:false
      }
  },
  methods:{
      //获取平台登录信息
      getUserInfo(){
        this.$http.get('/api/h5/user/getUserinfo').then(function(res) {
            //判断是否是微信登录
            if(this.isWechat()){
              if(res.body.user === null){
                //微信登录 true
                this.notLogin = false

                //第三方登录信息 微信登录
                console.log('跳转到授权接口')
                window.location.href = '/api/h5/user/oauthlogin/oauthtype/wechat'
                console.log('授权接口跳转完成')
              }else{
                this.user = res.body.user
              }
            }else{
               if(res.body.user){
                 this.redirectGame()
               }
            }
        },function (err) {
          console.log(err)
        })
      },
      //判断是否是微信浏览器
      isWechat(){
        let reg = /MicroMessenger/i;
        if(reg.test(navigator.userAgent.toLowerCase())){
          // console.log('是微信浏览器');
          return true;
        }else{
          // console.log('不是微信浏览器');
          return false
        }
      },
      //跳转到用户点击的游戏
      redirectGame(){
        let decode = decodeURIComponent(window.location.search)
        decode = decode.substr(10)
        console.log(decode)
        if(window.location.href.indexOf("redirect") !== -1){
          window.location.href = decode
        }
      }
  }
}
</script>

<style>
  /* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;

    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  body {
    background-color: #fff;
    font-family: "Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei UI","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
    /*font-size: 14px;*/
    color: #272727;
  }
/************
* 页面样式
************/
/* ============
    基本默认值
 ============ */
html{
  font-size: 62.5%;
  color: #222;
}
::selection{
  background-color: #b3d4fc;
  text-shadow: none;
}
ul{
  margin: 0;
  padding: 0;
}
li{
  list-style: none;
}
/* ============
    工具样式
 ============ */

.center-block{
  display: block;
  margin-right: auto;
  margin-left: auto;
}
.pull-right{
  float: right !important;
}
.pull-left{
  float: left !important;
}
.text-right{
  text-align: right !important;
}
.text-left{
  text-align: left !important;
}
.text-center{
  text-align: center !important;
}
.hide{
  display: none !important;
}
.show{
  display: block !important;
}
.invisible{
  visibility: hidden;
}
.text-hide{
  font: 0/0 a;
  color: transparent;
  text-shadow: none;
  background-color: transparent;
  border: 0;
}
/*清除浮动*/
.clearfix:before,
.clearfix:after{
  content: " ";
  display: table;
}
.clearfix:after{
  clear: both;
}
/*移动端默认样式 IOS*/
input[type=button]{
  -webkit-appearance:none;
  outline:none
}
  input[type=text]{
    -webkit-appearance:none;
    outline:none
  }

html,body{
  height: 100%;
  max-width: 1920px;
}
/* ------------------
*   基本样式
------------------*/
  #guoqianchen{
    height:100%;
  }
  .main{
    margin: 0 auto;
    position: relative;
    height: 100%;
    width: 100%;
    background-color: #fff;
  }
  .main-wrap{
    height: 100%;
  }
  .scroll{
    height: 100%;
    -webkit-overflow-scrolling : touch;
  }
  @media only screen and (min-width: 600px){
    .main-wrap.not-login{
      width: 374px;
      height: 700px;
      padding:102px 22px 49px 22px;
      overflow: hidden;
      position: absolute;
      top:50%;
      left: 50%;
      transform: translate(-50%,-45%);
      background: url("../assets/pc-phone.png") no-repeat 0 0;
      background-size: cover;
    }
    .main{
      overflow: hidden;
      border:1px solid #ffb0a3;
    }
    .scroll{
      overflow-y: scroll;
      height: 100%;
      width: calc(100% + 15px);
    }
    .pc-wrap{
      position:absolute;
      z-index: -1;
      background: url("../assets/pc-bg.jpg") center 0 no-repeat;
      width: 100%;
      height: 100%;
    }
    .pc-header{
      height: 84px;
      background-color: #fff;
      position: relative;
    }
    .pc-logo{
      background: url("../assets/pc-logo.png") center 0 no-repeat;
      background-size: cover;
      width: 210px;
      height: 60px;
      position: absolute;
      top:50%;
      margin-top: -30px;
      left: 15%;
    }
    .footer-store,.footer-person{
      display: none;
    }


  }

  .footer{
    height:5.2rem;
    background-color: #fff;
    border-top: 0.1rem solid #ededed;
    max-width: 750px;
    position: fixed;
    bottom: 0;
    text-align: center;
    width: 100%;
  }
  .footer ul li{
    display: inline-block;
    width: 20%;
    font-size: 1.4rem;
    height: 7rem;
    line-height: 2rem;
    color:#666666;
  }
  .footer ul li div{
    margin: 0 auto;
    margin-top: 0.7rem;
    width: 2rem;
    height:2rem;
    background-size: cover!important;
  }
  .footer ul li p{
    padding-top: 0.7rem;
    line-height: 1rem;
    font-size: 1.2rem;
  }
  .footer-link-1 .footer-logo{
    background: url("../assets/icon-game.png") 0 0 no-repeat;
  }
  .footer-link-2 .footer-logo{
    background: url("../assets/icon-store.png") 0 0 no-repeat;
  }
  .footer-link-3 .footer-logo{
    background: url("../assets/icon-gift.png") 0 0 no-repeat;
  }
  .footer-link-4 .footer-logo{
    background: url("../assets/icon-community.png") 0 0 no-repeat;
  }
  .footer-link-5 .footer-logo{
    background: url("../assets/icon-person.png") 0 0 no-repeat;
  }


  @media only screen and (min-width: 600px){
    .footer{
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  }





  .router-link-active li{
    color: #4385f5 !important;
  }
  .router-link-active .footer-link-1 div {
    background: url("../assets/icon-game-blue.png") 0 0 no-repeat !important;
    background-size: cover !important;
  }
  .router-link-active .footer-link-2 div {
    background: url("../assets/icon-store-blue.png") 0 0 no-repeat !important;
    background-size: cover !important;
  }
  .router-link-active .footer-link-3 div {
    background: url("../assets/icon-gift-blue.png") 0 0 no-repeat !important;
    background-size: cover !important;
  }
  .router-link-active .footer-link-4 div {
    background: url("../assets/icon-community-blue.png") 0 0 no-repeat !important;
    background-size: cover !important;
  }
  .router-link-active .footer-link-5 div {
    background: url("../assets/icon-person-blue.png") 0 0 no-repeat !important;
    background-size: cover !important;
  }

  .bottom-question{
    height: 7.8rem;
  }
  /*.list-public-title{*/
    /*height: 4rem;*/
    /*position: relative;*/
  /*}*/
  /*.list-public-title p{*/
    /*position: absolute;*/
    /*height: 3rem;*/
    /*line-height: 3rem;*/
    /*font-size: 1.4rem;*/
    /*width: 9rem;*/
    /*text-align: center;*/
    /*font-weight: bolder;*/
    /*left: 0;*/
    /*bottom: 0;*/
    /*border-bottom: 0.2rem solid #4385f5;*/
  /*}*/

  /*通用样式*/
  .btn{
    border:none;
    outline: none;
    background-color: transparent;

  }
  .link{
    display: block;
    text-align: center;
    line-height: 3rem;
    height: 3rem;
    background-color: #fff;
    color: #666;
  }
</style>
