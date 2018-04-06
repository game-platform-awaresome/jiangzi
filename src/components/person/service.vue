<template>
  <div class="service">
    <p class="title">客服中心</p>
    <div class="service-wrapper">
      <div class="service-inner">
        <p><i class="gongzhong"></i><span>公众号: 游戏酱紫</span></p>
        <p><i class="wechat"></i><span>微信号: YQY22</span></p>
        <p><i class="service"></i><span>客服QQ群: 2143548021</span></p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {

      }
    },
    components: {

    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .service
    position position 
    top 0
    bottom 0
    left 0 
    bottom 0
    .title
      height 50px
      line-height 50px
      text-align center
      background-color #4cc0ec
      font-size 17px
      color #fff
    .service-wrapper
      position absolute
      top (50 + 20)px
      bottom 70px
      left 20px
      right 20px
      background-color #c3e1f6
      border-radius 10px
      .service-inner
        padding 35px 22px
        p
          display flex
          i
            display block
            width 22px
            height 22px
            padding 5px 0
            &.gongzhong
              background url('./person-icon/gongzhong.png') 0 0 no-repeat
              background-size 100%
            &.wechat
              background url('./person-icon/wechat.png') 0 0 no-repeat
              background-size 100%
            &.service
              background url('./person-icon/service.png') 0 0 no-repeat
              background-size 100%
          span
            display inline-block
            padding-left 5px
            height 22px
            line-height 22px
            font-size 17px
            color #234b79
            
        
</style>
