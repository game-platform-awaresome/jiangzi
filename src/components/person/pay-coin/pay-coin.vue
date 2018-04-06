<template>
  <div class="pay-coin">
    <div class="title">
      <p class="what">未收到平台币?</p>
      <p class="qq">请联系客服QQ: 214354</p>
    </div>
    <div class="pay-coin-wrapper">
      <div class="pay-coin-info">
        <p>
          <span class="pay-coin-info-title">充值类型 :</span>
          <span class="pay-coin-info-content">平台币</span>
        </p>
        <p>
          <span class="pay-coin-info-title">充值UID :</span>
          <span class="pay-coin-info-content">{{user.id}}</span>
        </p>
        <p>
          <span class="pay-coin-info-title">昵称 :</span>
          <span class="pay-coin-info-content">{{user.user_nicename}}</span>
        </p>
        <p>
          <span class="pay-coin-info-title">当前平台币 :</span>
          <span class="pay-coin-info-content">{{user.coin}}</span>
        </p>
      </div>
      <div class="pay-num-wrapper">
        <!-- <p>{{money}}</p>
        <p>{{otherMoney}}</p> -->
        <p class="pay-num-title">请选择充值金额 :</p>
        <div class="select-pay-num-wrapper">
            <span :class="{active: money === 100}" @click="changeMoney(100)">100元</span>
            <span :class="{active: money === 200}" @click="changeMoney(200)">200元</span>
            <span :class="{active: money === 500}" @click="changeMoney(500)">500元</span>
            <span :class="{active: money === 1000}" @click="changeMoney(1000)">1000元</span>
        </div>
        <p class="other-pay-num">
          <span class="other-pay-title">其他充值金额 :</span>
          <input type="number" class="other-pay-input" v-model="otherMoney"
           @focus="otherMoneyChange" @blur="sureMoneyChange">
        </p>
        <p class="pay-desc">充值比例:1元 = 1平台币</p>
        <div class="wechat-pay">微信</div>
        <div class="ali-pay">支付宝</div>
        <p class="ddm-title">请选择礼包码充值 :</p>
        <div class="ddm-pay">DDM游戏礼包码</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    created() {
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
        }
      }, function (err) {
        console.log(err)
      })
    },
    data () {
      return {
        user: '',
        money: 100,
        otherMoney: 0
      }
    },
    computed: {
      intOtherMoney() {
        this.otherMoney = parseInt(this.otherMoney)
      }
    },
    methods: {
      changeMoney(money) {
        this.money = money
      },
      otherMoneyChange() {
        this.money = 0
      },
      sureMoneyChange() {
        this.otherMoney = parseInt(this.otherMoney)
        this.money = this.otherMoney
      }
    },
    components: {

    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .pay-coin
    .title
      height 70px
      background-image:linear-gradient(90deg, #48c6ef, #6f86d6)
      color #fff
      text-align center
      .what
        padding-top 16px
        font-size 16px
      .qq
        padding-top 5px
        font-size 12px
    .pay-coin-wrapper
      padding 12px
      .pay-coin-info
        border-bottom 1px solid #ededed
        p
          display flex
          color #444
          padding-bottom 10px
          font-size 14px
          .pay-coin-info-title
            width 85px
            color #999
            text-align right 
          .pay-coin-info-content
            padding-left 10px
      .pay-num-wrapper
        .pay-num-title
          padding 12px 0
          font-size 14px
          color #999
        .select-pay-num-wrapper
          display flex
          justify-content space-between
          span
            display block
            width 72px
            height 29px
            line-height 29px
            text-align center
            color #666
            font-size 14px
            border 1px solid #ededed
            &.active
              border-color #00aaef
        .other-pay-num
          padding-top 10px
          font-size 14px 
          color #999
          .other-pay-input
            border 1px solid #ededed
            height 29px
            min-width 60%
            margin-left 10px
            text-indent 10px
        .pay-desc
          color #ce0000
          font-size 14px
          padding 10px 0
        .wechat-pay,
        .ali-pay,
        .ddm-pay
          height 44px
          line-height 44px
          text-align center
          border-radius 22px
          font-size 17px
          color #fff
          margin-bottom 10px
        .wechat-pay
          background-color #62b900
        .ali-pay
          background-color #00aaef
        .ddm-pay
          background-color #ee8921
        .ddm-title
          padding 15px 0
          font-size 14px 
          color #999
</style>
