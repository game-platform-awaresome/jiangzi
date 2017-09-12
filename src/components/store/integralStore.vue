<template>
  <div class="integral-store">
    <!--广播部分 S-->
    <Boardcast></Boardcast>
    <!--广播部分 E-->
    <!--商品列表 S-->
    <div class="commodity-list">
      <ul class="clearfix">
        <router-link tag="li" v-for="item in commodity" :to="{path:'/store/store/storedetial/'+item.id}">
          <img :src="item.product_img" alt="">
          <p class="commodity-list-tit">{{ item.product_name }}</p>
          <p class="commodity-list-integral">{{ item.integral_exchange }}积分  <span class="commodity-list-num">剩余: {{ item.product_num }}</span></p>
        </router-link>
      </ul>
    </div>
    <!--商品列表 E-->
  </div>
</template>

<script>
import Boardcast from "./integralstore/boardcast.vue"

  export default {
      created(){
        this.$axios.get('/api/h5/Goods/info')
          .then(res => {
              console.log(res)
            this.commodity = res.data
          })
          .catch(function(error){
              console.log(error)
          })
      },
    data(){
        return{
          commodity:[]
        }
    },
    components:{
      Boardcast
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .commodity-title{
    height: 5rem;
    line-height: 5rem;
    font-size: 1.8rem;
    font-weight:bold;
    text-align: center;
    background-color: #fff;
    color: #333;
  }
  /*积分列表*/
  .commodity-list{
    min-height: 35rem;
    background-color: #fff;
  }
.commodity-list ul li{
  width: calc((100% - 3rem)/2);
  margin-top: 1rem;
  float: left;


}
.commodity-list ul li:nth-of-type(even){
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
  .commodity-list ul li:nth-of-type(odd){
    margin-right: 0.5rem;
    margin-left: 0.5rem;
  }
  .commodity-list ul li img{
    display: block;
    margin:0 auto;
    width: 100%;
    border: none;
    outline: none;
    margin-top: .5rem;
    overflow: hidden;
    border-radius: 1rem;
  }

  .commodity-list-tit{
    font-size: 1.4rem;
    font-weight: bolder;
    color: #333;
    height: 2rem;
    line-height: 2rem;
    /*text-indent: 1rem;*/
  }
  .commodity-list-integral{
    font-size: 1.2rem;
    color: #666;
    /*text-indent: 1rem;*/
    height: 1.4rem;
    line-height: 1.4rem;
  }
  .commodity-list-num{
    float: right;
  }
</style>
