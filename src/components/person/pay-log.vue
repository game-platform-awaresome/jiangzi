<template>
  <div class="pay-log">
    <div class="title-wrapper">
      <p class="title">平台币明细</p>
      <div class="pay-log-nav">
        <p @click="toggle(1)" :class="{active: isPayLog === true}">充值记录</p>
        <p>|</p>
        <p @click="toggle(2)" :class="{active: isPayLog === false}">消耗记录</p>
      </div>
    </div>
    <div class="log-wrapper" ref="logWrapper">
      <div class="log-inner">
        <p class="log-wrapper-title">
          <span>时间</span>
          <span>描述</span>
        </p>
        <div class="pay-log-list-wrapper" v-if="isPayLog">
          <ul>
            <li class="pay-log-list" v-for="(item,index) in payLog" :key="index">
              <span class="list-time">{{item.time}}</span>
              <span class="list-content">{{item.content}}</span>
            </li>
          </ul>
        </div>
        <div class="pay-log-list-wrapper" v-else>
          <ul>
            <li class="pay-log-list" >
              <span class="list-time">2018sd.4.6</span>
              <span class="list-content">充值充值sdfsdf充值充值充值充值充值充值充值充值</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  export default {
    created() {

    },
    mounted() {
      setTimeout(() => {
        this.initScroll()
      }, 20)
    },
    data () {
      return {
        isPayLog: true,
        payLog: [{
          time: '2018.4.6',
          content: '充值充值充值充值充值充值充值充值充值充值'
        },
        {
          time: '2018.4.6',
          content: '充值充值充值充值充值充值充值充值充值充值'
        },
        {
          time: '2018.4.6',
          content: '充值充值充值充值充值充值充值充值充值充值'
        },
        {
          time: '2018.4.6',
          content: '充值充值充值充值充值充值充值充值充值充值'
        },
        {
          time: '2018.4.6',
          content: '充值充值充值充值充值充值充值充值充值充值'
        },
        {
          time: '2018.4.6',
          content: '充值充值充值充值充值充值充值充值充值充值'
        },
        {
          time: '2018.4.6',
          content: '充值充值充值充值充值充值充值充值充值充值'
        },
        {
          time: '2018.4.6',
          content: '充值充值充值充值充值充值充值充值充值充值'
        },
        {
          time: '2018.4.6',
          content: '充值充值充值充值充值充值充值充值充值充值'
        },
        {
          time: '2018.4.6',
          content: '充值充值充值充值充值充值充值充值充值充值'
        },
        {
          time: '2018.4.6',
          content: '充值充值充值充值充值充值充值充值充值充值'
        },
        {
          time: '2018.4.6',
          content: '充值充值充值充值充值充值充值充值充值充值'
        },
        {
          time: '2018.4.6',
          content: '充值充值充值充值充值充值充值充值充值充值'
        },
        {
          time: '2018.4.6',
          content: '充值充值充值充值充值充值充值充值充值充值'
        },
        {
          time: '2018.4.6',
          content: '充值充值充值充值充值充值充值充值充值充值'
        }]
      }
    },
    components: {

    },
    methods: {
      initScroll() {
        console.log(1)
        let scroll = new BScroll(this.$refs.logWrapper,{
          scrollY: true,
          click: true
        })
      },
      toggle(no) {
        if (no === 1) {
          this.isPayLog = true
        } else {
          this.isPayLog = false
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .pay-log
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    .title-wrapper
      height 93px
      background-image:linear-gradient(90deg, #48c6ef, #6f86d6)
      color #fff
      font-size 16px
      font-weight normal
      .title
        height 48px
        line-height 48px
        text-align center
      .pay-log-nav
        display flex
        margin 0 16px
        border-top 1px solid #fff
        font-size 15px
        height 38px
        justify-content center
        align-items center
        p
          padding 0 20px
          &.active
            color #444
    .log-wrapper
      position absolute
      top 93px
      left 0
      right 0
      bottom 64px
      overflow hidden
      .log-wrapper-title
        display flex
        height 40px
        line-height 40px
        color #999
        font-size 13px
        span
          flex 1
          text-align center
      .pay-log-list-wrapper
        padding 0 20px
        .pay-log-list
          display flex
          color #999
          font-size 12px
          line-height 16px
          padding 10px 0
          .list-time
            flex 1
          .list-content
            flex 1
</style>
