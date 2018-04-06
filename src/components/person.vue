<template>
  <div class="person">
    <div class="person-header">
      <div class="person-header-myinfo">
        <div class="info-img-wrapper">
          <img :src="user.avatar" alt="">
        </div>
        <div class="info-other-wrapper">
          <p>昵称 : {{user.user_nicename}}</p>
          <p>账号UID : {{user.id}}</p>
        </div>
      </div>
      <div class="person-header-myinfo-num">
        <router-link to="/store/log">
          <p>积分 : {{user.score}}分 </p>
        </router-link>
        <p>|</p>
        <router-link to="/person/paylog">
          <p>平台币 : {{user.coin}}</p>
        </router-link>
      </div>
    </div>
    <div class="person-function">
      <ul>
        <router-link :to="{path: '/store/task',query: {type: 1}}" tag="li"><img src="./person/person-icon/task.png" alt=""><p>新手任务</p></router-link>
        <router-link :to="{path: '/store/task',query: {type: 2}}" tag="li"><img src="./person/person-icon/common-task.png" alt=""><p>日常任务</p></router-link>
        <router-link to="/person/paycoin" tag="li"><img src="./person/person-icon/platform.png" alt=""><p>平台币充值</p></router-link>
        <router-link to="/person/mycollection" tag="li"><img src="./person/person-icon/collection.png" alt=""><p>游戏收藏</p></router-link>
        <router-link to="/person/addtel" tag="li"><img src="./person/person-icon/bind-phone.png" alt=""><p>绑定手机</p></router-link>
        <router-link to="/store/store" tag="li"><img src="./person/person-icon/shopping.png" alt=""><p>积分商城</p></router-link>
        <router-link to="/person/mygift" tag="li"><img src="./person/person-icon/gift.png" alt=""><p>我的礼包</p></router-link>
        <router-link to="/person/realname" tag="li"><img src="./person/person-icon/renzheng.png" alt=""><p>实名认证</p></router-link>
        <router-link to="/person/service" tag="li"><img src="./person/person-icon/customer.png" alt=""><p>联系客服</p></router-link>
      </ul>
    </div>
    <a href="javascript:;" class="person-exit" @click="logout()">退出</a>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Toast,MessageBox } from 'mint-ui';
export default {
  created(){
    let _this = this;

    this.$http.get('/api/h5/user/getUserinfo').then(function (res) {
      //平台登录信息
      this.user = res.body.user
      console.log(this.user)
      if(!this.user){
        MessageBox.confirm('您还没有登录,是否现在登录?').then(action => {
          window.location.href = '/login?redirect=' + encodeURIComponent(window.location.href);
        }).catch(action => {
            window.location.href = './index';
        });
      }else{
          if (this.user.mobile === ""){
            this.style['follow-style'] = true
          }
        this.fuckWindow = false
      }
    }, function (err) {
      console.log(err)
    })


  },
  data () {
    return {
      style:{
        'follow-style':false
      },
      user:'',
      fuckWindow : true
    }
  },
  components:{
      Toast,
      MessageBox
  },
  methods:{
    follow(){
      this.style['follow-style'] = true
    },
    close(){
      this.style['follow-style'] = false
    },
    logout(){
        this.$axios.get('/api/h5/user/logout')
          .then(res => {
              console.log(res);
              if(res.data.code == 2000){
                Toast({
                  message: '退出成功',
                  position: 'middle',
                  duration: 1000
                })
                window.location.href = '/';
              }
          })
          .catch(function(error){
            console.log(error)
          })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scope lang="stylus">
  .person
    height: calc(100% - 5.2rem);
    background-color: #fff;
    .person-header
      height 132px
      background-color #49c4ee
      .person-header-myinfo
        position relative
        height 85px
        .info-img-wrapper
          position absolute
          top 50%
          margin-top -26px
          left 102px
          width 53px
          height 53px
          border-radius 50%
          overflow hidden
          img
            width 100%
            height 100%
        .info-other-wrapper
          position absolute
          top 50%
          margin-top -26px
          height 53px
          left 163px
          display flex
          flex-direction column
          justify-content space-around
          p
            font-size 14px
            color #fff
      .person-header-myinfo-num
        height 46px
        border-top 1px solid #fff
        margin 0 13px
        display flex
        font-size 14px
        color #fff
        justify-content center
        align-items center
        p
          padding 0 22px
    .person-function
      ul
        display flex
        flex-wrap wrap
        justify-content center
        li
          display flex
          box-sizing border-box
          border 1px solid #ededed
          border-top none
          border-left none
          width 30%
          height 130px
          flex-direction column
          justify-content center
          align-items center
          &:nth-child(3n-2)
            border-left none
          &:nth-child(3n)
            border-right none
          img
            width 34px
            height 34px
          p
            padding-top 10px
    .person-exit
      display: block;
      width: 80%;
      margin:2rem auto 0;
      height: 4rem;
      line-height: 4rem;
      text-align: center;
      font-size: 2rem;
      background-color: #4385f5;
      border-radius: 2rem;
      color: #fff;
    

  
  .mint-msgbox{
    width:400px;
  }
  @media only screen and (max-width:600px){
    .mint-msgbox{
      width: 85%;
    }
  }
  .v-modal{
    pointer-events: none;
  }
  .fuckWindow{
    position: absolute;
    z-index: 1999;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
