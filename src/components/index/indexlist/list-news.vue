<template>
  <div class="list-news">
    <!--<div class="list-public-title">-->
      <!--<p>全部资讯</p>-->
    <!--</div>-->
    <listPublicHeader title="全部资讯"></listPublicHeader>

    <ul>
<!--      <li v-for="onenew in news" class="clearfix" @click="pageUrl(onenew.url)">
        <span>{{ articleName(onenew.term_id) }}</span>
        <span>{{ onenew.post_title }}</span>
        <span>{{ onenew.post_date }}</span>
      </li>-->


      <li v-for="onenew in news">
        <router-link :to="{path:'/newsdetial/'+onenew.id}" class="clearfix" >
          <span>{{ articleName(onenew.term_id) }}</span>
          <span>{{ onenew.post_title }}</span>
          <span>{{ onenew.post_date }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import listPublicHeader from './common/list-public-header.vue'
export default {
  created(){
    this.$http.get('/api/h5/article').then((res) => {
      this.news = res.body
//      console.log('news---',res)
    },(err) => {
      console.log(err)
    })
  },
  data () {
    return {
      news:[],
    }
  },
  methods:{
      articleClass(id){
          //21活动
          //22公告
          //23新闻

          if(id == 21){
              return 'huodong'
          }else if(id == 22){
              return 'gonggao'
          }else if(id == 23){
              return 'xinwen'
          }
      },
      articleName(id){
          if(id == 21){
            return '活动'
          }else if(id == 22){
            return '公告'
          }else if(id == 23){
            return '新闻'
          }
      },
      pageUrl(url){
          if(url){
            window.location.href = url
          }
      }
  },
  components:{
    listPublicHeader
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-news ul li{
  line-height: 4.4rem;
  height: 4.4rem;
  position: relative;
  border-bottom: 0.1rem solid #d9d9d9;
}
.list-news ul li:first-of-type{
  border-top: 0.1rem solid #d9d9d9;
}
  .list-news ul li span:first-of-type{
    position: absolute;
    left: 1.8rem;
    top: 50%;
    margin-top: -1.1rem;
    line-height:2.2rem;
    text-align: center;
    display: block;
    width:3.2rem;
    height:2.2rem;
    color: #4385f5;
    border: 0.1rem solid #4385f5;
    border-radius: 0.4rem;
    font-size: 1.2rem;
  }
.list-news ul li span:nth-of-type(2){
  position: absolute;
  top: 50%;
  margin-top: -0.7rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: block;
  width:18rem;
  left: 6.5rem;
  line-height: 1.4rem;
  height: 1.4rem;
  font-size: 1.2rem;
  color: #333;
}
.list-news ul li span:last-of-type{
  position: absolute;
  top: 50%;
  margin-top: -0.7rem;
  font-size: 1.2rem;
  height: 1.4rem;
  line-height: 1.4rem;
  color: #666;
  right: 1.8rem;
}
  .gonggao{
    background-color: #02ca7a;
  }
  .xinwen{
    background-color: #f366c7;
  }
  .huodong{
    background-color: #0088d7;
  }
</style>
