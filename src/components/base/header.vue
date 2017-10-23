<template>
  <div class="header" v-if="user">
      <img :src="user.avatar" alt="">
    <p v-html="user.user_nicename" class="user-name"></p>
    <!--<p class="user-name">greentea</p>-->
    <p class="user-id">{{ user.id }}</p>
    <!--<p class="user-id">123456789</p>-->

    <a href="javascript:void(0);" class="follow" @click="follow()">关注</a>

    <div class="follow-alert" :class="style" @click="close">
      <div class="follow-window">
        <!--<div class="follow-heading"></div>-->
        <h2 class="follow-tit">关注"游戏酱紫"</h2>
        <img class="follow-erwei" src="../../assets/erwei.jpg" alt="">
        <p class="follow-tips">长按识别二维码</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created(){
    this.$http.get('/api/h5/user/getUserinfo').then(function(res) {
      //平台登录信息

        this.user = res.body.user
        if(!this.user){
          this.user = {}
        }
    },function (err) {
      console.log(err)
    })
  },
  data () {
    return {
      user:{
        avatar: ''
      },
      style:{
          'follow-style':false
      },

    }
  },
  methods:{
      follow(){
          this.style['follow-style'] = true
      },
      close(){
          this.style['follow-style'] = false
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
  height:5rem;
  width: 100%;
  background-color: #fff;
  position: relative;
}
/*.header .img-border{*/
  /*border-radius: 50%;*/
  /*height: 4rem;*/
  /*width: 4rem;*/
  /*margin: 1rem 1.5rem;*/
  /*box-shadow: 0 0.3rem 0.5rem 0.1rem #333;*/
  /*float: left;*/
/*}*/
.header > img{
  float: left;
  display: block;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  /*border: 0.1rem solid #4385f5;*/
  position: absolute;
  left: 2rem;
  top: 50%;
  margin-top: -2rem;
}
  .header > .user-name{
    position: absolute;
    left: 7.3rem;
    top:0.7rem;
    color: #333;
    font-size: 1.6rem;
    line-height: 2rem;
    height: 2rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width:14rem;
  }
  .user-id{
    position: absolute;
    left: 7.3rem;
    top: 3rem;
    background: url("../../assets/user_id.png") left center no-repeat;
    background-size: 1.3rem;
    text-indent: 1.6rem;
    height: 1.5rem;
    line-height: 1.5rem;
    font-size: 1.2rem;
  }
  .header .agreement{
    float: right;
    line-height: 4rem;
    text-decoration: underline;
    font-size: 1.4rem;
    color: #ff7800;
    display: block;
    margin-right: 2rem;
  }
  .header .follow{
    position: absolute;
    top: 50%;
    right:2rem;
    margin-top: -1.25rem;
    width: 5rem;
    height: 2.5rem;
    line-height: 2.5rem;
    border: 0.1rem solid #4385f5;
    text-align: center;
    border-radius: 0.4rem;
    font-size: 1.6rem;
    color: #4385f5;
  }
.follow-alert{
  position: absolute;
  top: 0;
  left:0;
  width: 100%;
  height:2000px;
  z-index: 999;
  background-color: rgba(0,0,0,.6);
  display: none;
}
  .follow-style{
    display: block;
  }
  .follow-window{
    width:25rem;
    height: 25rem;
    position: absolute;
    top: 10%;
    left:50%;
    margin-left: -12.5rem;
    z-index:999;
    border-radius: 0.5rem;
    overflow: hidden;
    background-color: #f0f0f6;
    animation: focus .5s ;
    opacity: 1;
  }
  .follow-heading{
    height:4rem;
    background: #0aa2ff url('../../assets/logo.png') no-repeat center center;
    background-size:contain;
    /*background-color: #0aa2ff;*/
  }
  .follow-tit{
    text-align: center;
    height: 6rem;
    line-height: 6rem;
    font-size: 1.8rem;
  }
  .follow-erwei{
    width: 55%;
    height:55%;
    display: block;
    margin: 0 auto;
  }
  .follow-tips{
    text-align: center;
    line-height: 3rem;
  }
@keyframes focus
{
  from {
    top: 0;
    opacity: 0;
  }
  to {
    top: 10%;
    opacity: 1;
  }
}
.user-name span{
  float: right;
  transform: translateY(1rem);
}
</style>
