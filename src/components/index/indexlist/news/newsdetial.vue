<template>
  <div class="news-detial">
    <h1>{{ article.post_title }}</h1>
    <div class="news-detial-box">
      <span class="time">{{ article.post_date }}</span>
      <a :href="article.post_link">开始</a>
    </div>
    <div class="news-detial-content" v-html="article.post_content"></div>

  </div>
</template>

<script>
export default {
  created(){
    this.getData()
  },
  data () {
    return {
      article:''
    }
  },
  methods:{
      getData(){
        this.$http.get('/api/h5/article/getarticle/id/'+this.$route.params.aid).then(function (res) {
          console.log('res.body.data'+res.body.data)
          console.log('res.body'+res.body)
          this.article = res.body.data
        },function (err) {
          console.log(err)
        })
      }
  },
  watch:{
    "$route":"getData"
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .news-detial{
    background-color: #f2f2f2;
    height: 100%;
  }
  .news-detial h1{
    height: 1.6rem;
    line-height: 1.6rem;
    font-size: 1.6rem;
    padding: 2rem 1.5rem 1rem;
    color: #333;
  }
  .news-detial-box{
    position: relative;
    height: 3rem;
    line-height: 3rem;
    background: url("../../../../assets/article-clock.png") 1.5rem center no-repeat;
    background-size: 1.2rem;
  }
  .news-detial-box .time{
    color: #bbb;
    font-size: 1.2rem;
    padding-left: 3.5rem;
  }
  .news-detial-box a{
    position: absolute;
    display: block;
    font-size: 1.4rem;
    height: 2.4rem;
    line-height: 2.4rem;
    width: 3.6rem;
    border: 0.1rem solid #4385f5;
    color: #4385f5;
    text-align: center;
    border-radius: 0.3rem;
    right: 1.5rem;
    top: 50%;
    margin-top: -1.2rem;
  }
  .news-detial-content{
    background-color: #f2f2f2;
    margin: 1rem 1.5rem 0;
    min-height: 30rem;
  }
  .news-detial-content p{
    line-height: 2rem;
  }
</style>
