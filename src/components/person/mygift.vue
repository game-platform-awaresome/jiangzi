<template>
  <div class="mygift">
    <div class="title">我的礼包</div>
    <div class="gift-wrapper" ref="wrapper">
      <ul>
        <li class="gift-list-wrapper" v-for="(item, index) in giftList" :key="index">
          <p class="gift-title">{{item.name}}</p>
          <p class="gift-time">兑换有效期: <span>{{item.get_time}} ~ {{item.end_time}}</span></p>
          <p class="gift-no" @click="checkGiftCode(item.card_info)">卡号: <span class="code">{{item.card_info}}</span></p>
        </li>
      </ul>
      <div class="empty" v-show="isEmpty">
        <p>无领取记录</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import { Toast,MessageBox } from 'mint-ui'
  export default {
    created() {
      this.getMyGift()
    },
    mounted() {
      setTimeout(() => {
        this.initScroll()
      },20)
    },
    data () {
      return {
        giftList: [],
        isEmpty: false
      }
    },
    components: {

    },
    methods: {
      checkGiftCode(card){
          MessageBox({
            title:'领取提示',
            message: '<p style="color=#222;"><span style="padding-right: 1rem">兑换码</span><span style="-webkit-user-select:text;background: #ebebeb;padding: 0 .5rem;font-style: italic;">'+ card +'</span></p><p style="font-size: 1.2rem;padding-top: .3rem;line-height: 20px;"">复制兑换码,去游戏中使用</p>',
            showCancelButton: false
          });
      },
      initScroll() {
        let scroll = new BScroll(this.$refs.wrapper,{
          scrollY: true,
          click: true
        })
      },
      getMyGift() {
        this.$axios.get('/api/H5/goods/card_log',{
          params: {
            start: 0,
            limit: 1000
          }
        })
            .then(res => {
              console.log(res)
              if (res.data.code === 200){
                this.giftList = res.data.data
              }
              else{
                layer.msg(res.data.msg)
                this.isEmpty = true
              }

            })
            .catch(function(error){
              console.log(error)
            })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .mygift
    position absolute
    top 0 
    left 0
    right 0
    bottom 0
    .title
      height 50px
      line-height 50px
      font-size 16px
      color #fff
      background-color #4ac3ee
      text-align center
    .gift-wrapper
      position absolute
      top 50px
      left 0
      right 0
      bottom 64px
      padding 10px 13px
      overflow hidden
      ul
        .gift-list-wrapper
          display flex
          justify-content space-around
          flex-direction column
          height 90px
          box-sizing border-box
          padding 5px 0
          border-bottom 1px solid #ededed
          .gift-title
            font-size 14px
            color #444
          .gift-time
            font-size 13px
            color #999
            span
              padding 0 5px
          .gift-no
            height 28px
            line-height 28px
            background-color #ededed
            padding 0 15px
            color #666
            font-size 12px
            .code
              padding 0 5px 
              color #ce0000
              user-select text
      .empty
        padding 50px 0
        text-align center
        color #ccc
        font-size 14px

</style>
