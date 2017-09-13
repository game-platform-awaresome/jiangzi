<template>
  <div class="subjectdetial">
    <listPublicHeader title="精选专题"></listPublicHeader>
    <div class="subjectdetial-wrap">
      <img :src="subject.image" alt="">
      <div class="subjectdetial-box">
        <p class="subjectdetial-title">{{ subject.title }}</p>
        <div class="subjectdetial-content">{{ subject.content }}</div>
      </div>
    </div>
    <div class="subject-about-game">
      <ul class="clearfix" id="subjectList">
        <li v-for="game in subject.games">
          <router-link :to="{path:'/gamedetial/'+ game.id}">
            <img :src="game.img" alt="">
            <div class="game-box clearfix">
              <p class="game-name" :data-game="game.id">
                <span class="game-the-name">{{ game.gamename }}</span>
                <!--<span v-if="game.ishot == 1" class="is-hot">热门</span>-->
                <!--<span v-if="game.isnew == 1" class="is-new">最新</span>-->
                <!--<span v-if="game.gift !== null" class="is-gift">礼包</span>-->
              </p>
              <p class="game-content">{{ game.excerpt }}</p>
            </div>
          </router-link>
          <a :data-href="game.url" class="start-game">开始</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import listPublicHeader from '../common/list-public-header.vue'
export default {
  created(){
    this.getSubject()
  },
  data () {
    return {
      subject:''
    }
  },
  methods:{
    getSubject(){
      this.$http.get('/api/h5/activity/details/id/'+this.$route.params.sjid).then((res) => {
        this.subject = res.body.data
        this.locationHref()
      },(err) => {
        console.log(err)
      })
    },
    locationHref() {
      let hotGame = document.getElementById('subjectList');
      hotGame.addEventListener('click',function(event){
        let dataHref = event.target.getAttribute('data-href');
        window.location.href = dataHref;
      })
    }
  },
  components:{
    listPublicHeader
  },
  watch:{
    "$route":"getSubject"
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .subjectdetial{
    background-color: #ececec;
  }
  .subjectdetial-wrap img{
    height: 20rem;
    width: 100%;
    background-size: cover;
  }
  .subjectdetial-box{
    background-color: #fff;
  }
  .subjectdetial-title{
    font-size: 1.6rem;
    height: 1.6rem;
    line-height: 1.6rem;
    padding:1rem 1.5rem .8rem;
  }
  .subjectdetial-content{
    height: 100%;
    line-height: 1.6rem;
    font-size: 1.3rem;
    padding:0 1.5rem 1rem;
  }
  .subject-about-game{
    margin-top: 1rem;
  }



  /*some game list*/

  .subject-about-game ul li{
    height:6.2rem;
    border-top: 0.1rem solid rgb(237,237,237);
    background-color: #fff;
    position: relative;
  }
  .subject-about-game ul li:last-of-type{
    margin-bottom: 5.4rem;
  }
  .subject-about-game ul li img{
    position: absolute;
    top: 50%;
    margin-top: -2.5rem;
    float: left;
    height:5rem;
    width:5rem;
    border-radius: 1rem;
    left: 1.8rem;
    overflow: hidden;
  }
  .game-box{
    position: absolute;
    left: 6rem;
  }
  .game-name{
    line-height: 1.6rem;
    padding-left: 2rem;
    color: #272727;
    margin-top: 1.2rem;
    font-size: 1.6rem;
  }
  p.game-content{
    color: #717171;
    font-size: 1.2rem;
    line-height: 3rem;
    padding-left: 2rem;
    max-width: 18rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .start-game{
    position: absolute;
    display: block;
    width: 5rem;
    height: 2.5rem;
    line-height: 2.5rem;
    font-size: 1.4rem;
    border:0.1rem solid #4385f5;
    color: #4385f5;
    text-align: center;
    /*margin-right: 1.8rem;*/
    /*margin-top: 2.4rem;*/
    cursor: pointer;
    top: 50%;
    margin-top: -1.25rem;
    right: 1.8rem;
    border-radius: 0.5rem;
  }
  @media only screen and (max-width: 350px){
    .list-hot ul li img{
      margin-top: -2rem;
      height:4rem;
      width:4rem;
      left: 1rem;
    }
    .game-box{
      left: 4rem;
    }
    .start-game{
      right: 1rem;
    }
    p.game-content{
      max-width: 15rem;
    }
  }
</style>
