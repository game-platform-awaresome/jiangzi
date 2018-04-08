<template>
  <div class="realname clearfix">
    <!--previous S-->
    <div class="per-previous" v-if="user.realname === ''">
      <img :src="user.avatar" alt="" class="per-img">
      <div class="per-content">
        <div class="per-content-box per-validate-realname">
          <input type="text" placeholder="请输入您的真实姓名" v-model.trim="realname.username" @blur="judgeUsername()">
        </div>
        <div class="per-content-box per-validate-id">
          <input type="text" placeholder="请输入您的身份证号" v-model="realname.identity" @blur="judgeId()">
        </div>
      </div>
      <p class="per-fail">{{ fail }}</p>
      <a href="javascript:;" class="per-content-submit-btn" @click="bindId()">提交认证</a>
      <p class="government-warn">根据最新监管要求，进行游戏需要身份验证</p>
    </div>
    <!--previous E-->


    <!--after S-->
    <div class="per-realname-after" v-if="user.realname !== ''">
      <div class="per-success">
        <p>您已通过实名认证</p>
      </div>
      <div class="per-content">
        <div class="per-content-box">
          真实姓名
          <p class="per-after-info">{{ hiddenUsername() }}</p>
        </div>
        <div class="per-content-box">
          身份证号
          <p class="per-after-info">{{ hiddenId() }}</p>
        </div>
      </div>
    </div>
    <!--after E-->

  </div>
</template>

<script>
  import { Toast } from 'mint-ui'
  export default {
    created(){
      this.getData()
    },
    data () {
      return {
        user:[],
        code:0,
        realname:{
            username:'',
            identity:''
        },
        fail:''
      }
    },
    methods:{
//      /api/h5/User/fcm?idcard=asdfg&name=sdlkfjlk
      bindId(){
        if (this.judgeUsername() && this.judgeId()){
          this.$http.get('/api/h5/User/fcm?idcard=' + this.realname.identity + '&name=' + this.realname.username).then(function(res) {
            //平台登录信息
//            console.log(res)
            this.code = res.body.code
            if(this.code === 1){
              this.getData()
            }else{
              Toast({
                message:'认证失败',
                position:'middle',
                duration:1000
              })
            }
          },function (err) {
            console.log(err)
          })
        }else if(this.realname.username === "" && this.realname.identity === ""){
            this.fail = '请填写真实姓名及身份证号!!'
        }

      },
      getData(){
        this.$http.get('/api/h5/user/getUserinfo').then(function(res) {
          //平台登录信息
          this.user = res.body.user
        },function (err) {
          console.log(err)
        })
      },
      judgeUsername(){
        let regUsername = /^[\u4e00-\u9fa5 ]{2,20}$/
        if(!(regUsername.test(this.realname.username))){
          this.fail = '您输入的真实姓名有误,请重新输入';
          return false;
        }
        this.fail = ""
        return true;
      },
      judgeId(){
        let regId = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/
        if(!(regId.test(this.realname.identity))){
          this.fail = '您输入的身份证号有误,请重新输入';
          return false;
        }
        this.fail = ''
        return true;
      },
      hiddenUsername(){
          let newUsername = this.user.realname.substr(0,1) + '**'
          return newUsername
      },
      hiddenId(){
          console.log(typeof this.user.id_card)
        let newId = this.user.id_card.substr(0,3) + '**********' + this.user.id_card.substr(-3,3)
        return newId
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .realname,.addtel{
    height: 100%;
    background-color: #ececec;
  }
.per-img{
  display: block;
  margin: 5rem auto;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  overflow: hidden;
}
  .per-content-box{
    position: relative;
    height: 5rem;
    margin-bottom: 0.2rem;
    background-size: 1.4rem!important;
    background-color: #fff!important;
    line-height: 5rem;
    font-size: 1.4rem;
    text-indent: 1.5rem;
  }
  .per-content-box input[type='text']{
    position: absolute;
    top: 50%;
    left: 5rem;
    margin-top: -1.5rem;
    border: none;
    border-left: 0.2rem solid #ececec;
    height: 3rem;
    text-indent: 2rem;
    color: #999;
    font-size: 1.4rem;
    width: 17rem;
  }
  .government-warn{
    margin:2rem 0;
    text-align: center;
    color: #999;
    font-size: 1.2rem;
  }
  .per-content-submit-btn{
    display: block;
    width: 90%;
    height: 5rem;
    background-color: #4385f5;
    margin:2rem auto;
    border-radius: 2.5rem;
    text-align: center;
    line-height: 5rem;
    font-size: 1.8rem;
    color: #fff;
  }
  .per-validate-realname{
    background: url("../../assets/validate-username.png") 1.8rem center no-repeat;
  }
  .per-validate-id{
    background: url("../../assets/validate-id.png") 1.8rem center no-repeat;
  }
  .per-validate-tel{
    background: url("../../assets/validate-tel.png") 1.8rem center no-repeat;
  }
  .per-validate-message{
    background: url("../../assets/validate-message.png") 1.8rem center no-repeat;
  }
  .per-validate-code{
    position: absolute;
    right: 20px;
    height: 3rem;
    top:50%;
    margin-top: -1.5rem;
    border:none;
  }
  .per-validate-code-pre{
    background-color: #ff815a;
    color: #fff;
  }
  .per-fail{
    font-size: 1.4rem;
    color: #fb2b26;
    text-align: center;
    height: 1.4rem;
    line-height: 1.4rem;
    margin: 1rem 0 2rem;
  }

  /*-----------------------------------
                                  after
                                  ------------------------------------*/
  .per-realname-after .per-success{
    color: #4385f5;
    font-size: 1.6rem;
    height: 4rem;
    line-height: 4rem;
  }

  .per-realname-after .per-success p{
    width: 16rem;
    text-align: right;
    margin:0 auto;
    height: 4rem;
    background: url("../../assets/validate-id-success.png") 0 center no-repeat;
    background-size: 2.5rem;
  }
  .per-after-info{
    position: absolute;
    right: 0;
    height: 100%;
    top:0;
    color: #bcbcbc;
    padding-right: 1.5rem;
  }

  .per-addtel-after .per-success{
    position: relative;
    background: url("../../assets/validate-tel-success.png") center 2rem no-repeat;
    height: 15rem;
    background-size: 4rem;
  }
  .per-addtel-after .per-success p{
    position: absolute;
    bottom: 2rem;
    width: 100%;
    text-align: center;
    font-size: 1.6rem;
    color: #999npm;
  }


</style>
