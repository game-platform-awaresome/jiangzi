<template>
  <div class="broadcast">
    <swiper :options="swiperOption">
      <swiper-slide class="broadcast-list"  v-for="item in boardcast" :key="item.id">
        <!--<p class="broadcast-list"  v-for="item in boardcast">-->
          <span>{{ item.user_nicename }}</span>兑换了{{item.product_name}}
        <!--</p>-->
      </swiper-slide>

    </swiper>
  </div>
</template>

<script>
  import { swiper,swiperSlide } from 'vue-awesome-swiper'
export default {
created(){
    this.$axios.get('/api/h5/Goods/broadcast')
      .then(res => {
//          console.log(res)
        this.boardcast = res.data.data
      })
      .catch(function(error){
        console.log(error)
      })
},
  data () {
    return {
      swiperOption: {
        direction: 'vertical',
        autoplay:2000,
        width:window.innerWidth,
        height: 30,
        autoHeight:true
      },
      boardcast:''
    }
  },
  components: {
    swiper,
    swiperSlide
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .broadcast{
    height: 3rem;
    background-color: #ececec;
  }
  .broadcast-list{
    height: 3rem;
    line-height: 3rem;
    font-size: 1.3rem;
    color: #999;
    background-size: 1.4rem!important;
    background: url("../../../assets/store/store-boradcast.png") no-repeat 1rem center;
  }
  .broadcast-list span{
    color: #ff6b4f;
    padding: 0 1rem 0 3rem;
  }
</style>
