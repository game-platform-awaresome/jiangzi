<template>
  <div class="pay-coin">
    <div class="ali" ref="ali"></div>
    <div class="qr-code" v-show="pcWindow">
      <p>您需要支付<s class="money-text">{{money}}</s>元</p>
      <p>请使用{{windowText}}扫描二维码完成支付</p>
      <span @click="closeWindow">关闭</span>
      <img :src="qr_code" alt="" width="150px" height="150px">
    </div>
    <div class="title">
      <p class="what">未收到{{conf.ptb_name}}?</p>
      <p class="qq">请联系客服QQ: 2143548021</p>
    </div>
    <div class="pay-coin-wrapper">
      <div class="pay-coin-info">
        <p>
          <span class="pay-coin-info-title">充值类型 :</span>
          <span class="pay-coin-info-content">{{conf.ptb_name}}</span>
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
          <span class="pay-coin-info-title">当前{{conf.ptb_name}} :</span>
          <span class="pay-coin-info-content">{{user.coin}}</span>
        </p>
      </div>
      <div class="pay-num-wrapper">
        <!-- <p>{{money}}</p>
        <p>{{otherMoney}}</p> -->
        <p class="pay-num-title">请选择充值金额 :</p>
        <div class="select-pay-num-wrapper">
            <span v-for="(item,index) in conf.amount_list" :key="index" :class="{active: money == item}" @click="changeMoney(item)">{{item}}元</span>
            <!-- <span :class="{active: money === 100}" @click="changeMoney(100)">100元</span>
            <span :class="{active: money === 200}" @click="changeMoney(200)">200元</span>
            <span :class="{active: money === 500}" @click="changeMoney(500)">500元</span>
            <span :class="{active: money === 1000}" @click="changeMoney(1000)">1000元</span> -->
        </div>
        <p class="other-pay-num">
          <span class="other-pay-title">其他充值金额 :</span>
          <input type="number" class="other-pay-input" v-model="otherMoney"
           @focus="otherMoneyChange" @blur="sureMoneyChange">
        </p>
        <p class="pay-desc">充值比例:1元 = 1{{conf.ptb_name}} <span v-show="money < 1 && otherMoney < 1">一元起充</span></p>
        
        <div class="wechat-pay" @click="wechatPay">微信</div>
        <div class="ali-pay" @click="aliPay" v-show="!tool.navigator.isWechat()">支付宝</div>
        <!-- <p class="ddm-title">请选择礼包码充值 :</p>
        <div class="ddm-pay">DDM游戏礼包码</div> -->
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
 import qs from 'qs'
 import tool from '@/util/judgeTool.js'
 import { Toast } from 'mint-ui';
  export default {
    created() {
      this.getUserInfo()
      this.getConf()
      // this.wechatShare()
    },
    data () {
      return {
        user: '',
        money: 100,
        otherMoney: '',
        tool: tool,
        conf: '',
        order_no: '',    // 订单号吗,
        qr_code: '',
        qr_code_base: 'http://qr.liantu.com/api.php?text=',
        pcWindow: false,
        windowText: '微信'
      }
    },
    computed: {
      intOtherMoney() {
        this.otherMoney = parseInt(this.otherMoney)
      }
    },
    methods: {
      closeWindow() {
        this.pcWindow = false
      },
      changeMoney(money) {
        this.money = money
      },
      otherMoneyChange() {
        this.money = 0
      },
      sureMoneyChange() {
        this.otherMoney = parseInt(this.otherMoney)
        this.money = this.otherMoney
      },
      // 获取配置
      getConf() {
        this.$axios.get('/api/h5/pay/ptb_conf')
            .then(res => {
              console.log(res)
              if (res.data.code === 200){
                this.conf = res.data.data
              }
            })
            .catch(function(error){
              console.log(error)
            })
      },
      // 查询订单状态
      checkOrderStatus(order_id) {
        this.$axios.get('/api/h5/pay/ptbCheck',{
          params: {
            order_id
          }
        })
            .then(res => {
              console.log(res)
              if (res.data.code === 2000){
                layer.msg(res.data.msg)
                setTimeout(() => {
                  location.reload() 
                }, 1500);
              }
            })
            .catch(function(error){
              layer.msg(error.data.msg)
            })
      },
      // 获取登录信息
      getUserInfo() {
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
      // 平台币下单接口
      createOrder() {
        let _this = this
        return this.$axios.get('/api/h5/pay/placeOrder',{
          params: {
            total_amount: this.money,
            uid: this.user.id,
            order_des: this.money+'酱紫币',
            ptb_number: (() => {
              if (this.conf.ratio) {
                console.log(this.conf.ratio)
                return parseInt(_this.money * _this.conf.ratio)
              } else {
                console.log('下单')
                return parseInt(_this.money)
              }
            })()
          }
        })
            .then(res => {
              if (res.data.code === 0){
                this.order_no = res.data.data.order_id
                return Promise.resolve()
              }
            })
            .catch(function(error){
              console.log(error)
            })
      },
      wechatPay() {
        if (this.money >= 1) {
          this.createOrder()
          .then(() => {
            this.$axios.post('/api/h5/pay/startpay',qs.stringify({
                  order_id : this.order_no,
                  pay_type : 'wechat',
                  total_amount: this.money,
                  order_des: this.money + '酱紫币',
                  ptb_number: (() => {
                    if (this.conf.ratio) {
                      return this.money * this.conf.ratio
                    } else {
                      return this.money
                    }
                  })()
              })
            )
              .then(res => {
                console.log(tool)
                if (res.data.code === 1){
                  // 手机浏览器
                  if(!tool.navigator.isPC() && !tool.navigator.isWechat()) {
                    window.location.href = res.data.data.mweb_url
                  }
                  // PC
                  if(tool.navigator.isPC()) {
                    this.qr_code = ''
                    this.qr_code = this.qr_code_base + res.data.data.code_url
                    this.windowText = '微信'
                    this.pcWindow = true
                  }
                  // 微信环境
                  if (tool.navigator.isWechat()) {
                    console.log('已进入微信环境的充值调用')
                    this.wechatpayApi(res.data.data.pay_info)
                  }
                  setInterval(() => {
                    this.checkOrderStatus(this.order_no)
                  },2000)
                  
                }
                else{
                  layer.msg(res.data.msg)
                  this.isEmpty = true
                }

              })
              .catch(function(error){
                console.log(error)
              })
            })
        }
        
      },
      aliPay() {
        if (this.money >= 1) {
          this.createOrder()
          .then(() => {
            this.$axios.post('/api/h5/pay/startpay',qs.stringify({
                  order_id : this.order_no,
                  pay_type : 'alipay',
                  total_amount: this.money,
                  order_des: this.money + '酱紫币',
                  ptb_number: (() => {
                    if (this.conf.ratio) {
                      return this.money * this.conf.ratio
                    } else {
                      return this.money
                    }
                  })()
              })
            )
            .then(res => {
                console.log('alipay')
                if (res.data.code === 2000){
                  // 手机浏览器
                  if(!tool.navigator.isPC()) {
                    this.$refs.ali.innerHTML = res.data.form
                    console.log(res.data.form)
                    document.getElementById('alipaysubmit').submit()
                  }
                  // PC
                  if(tool.navigator.isPC()) {
                    this.qr_code = ''
                    this.qr_code = this.qr_code_base + res.data.code_url
                    this.windowText = '支付宝'
                    this.pcWindow = true
                  }
                  setInterval(() => {
                    this.checkOrderStatus(this.order_no)
                  },2000)
                }
                else{
                  this.isEmpty = true
                }

              })
              .catch(function(error){
                console.log(error)
              })
          })
        }
        
      },
      /**
         * 微信付款
         * @param attr 付款参数
         */
      wechatpayApi(attr) {
        function onBridgeReady() {
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', attr,
                function (res) {
                    if (res.err_msg === "get_brand_wcpay_request:ok") {
                    }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                }
            );
        }

        if (typeof WeixinJSBridge === "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
        } else {
            onBridgeReady();
        }
      },
      wechatShare() {
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
              _this.$axios.get('/api/Integral/Task/share',{
                params: {
                  gid: 0
                }
              })
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
              _this.$axios.get('/api/Integral/Task/share',{
                params: {
                  gid: 0
                }
              })
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
            }
          });
        })
        .catch(function(error){
            console.log(error)
        })
      }
    },
    components: {
      Toast
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .pay-coin
    position relative
    .qr-code
      position absolute
      width 300px
      height 350px 
      z-index 999
      background-color #fff
      box-shadow 3px 3px 15px rgba(0,0,0,.2)
      left 50%
      top 50%
      margin-left -150px
      margin-top -200px
      box-sizing border-box
      padding-top 30px
      span 
        position absolute 
        top 20px
        right 20px
        font-size 14px
      p
        // position absolute
        width 100%
        top 50px
        text-align center
        padding 5px 0
        .money-text
          color #ce0000
          text-decoration none
      img
        display block
        margin 10px auto 0
        width 250px
        height 250px
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
          justify-content flex-start
          flex-wrap wrap
          span
            display block
            margin 0 15px 15px
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
        .pay-desc,
        .pay-warn
          color #999
          font-size 14px
          padding 10px 0
          span 
            color #ce0000
        .pay-warn
          text-align center
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
