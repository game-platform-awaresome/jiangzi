<template>
  <div class="gamedetial">
    <div class="game-bg">
      <img :src="game.navimg" alt="" width="100%" height="100%">
    </div>


    <div class="game-head">
      <img :src="game.img" alt="">
      <p class="game-name">{{ game.name }}</p>
      <p class="game-brief">{{ game.excerpt }}</p>
      <a :href="game.url" class="game-start">开始</a>
    </div>

    <!--+++-->
 <!--   <div class="game-head">
      <img :src="game.img" alt="">
      <p class="game-name">game.name</p>
      <p class="game-brief">game.excerptgame.excerptgame.excerptgame.excerpt</p>
      <a :href="game.url" class="game-start">开始</a>
    </div>-->
    <!--+++-->

    <div class="game-intruction">
      <div class="game-intruction-tit">
        <p class="game-intruction-tit-border"></p>游戏简介
      </div>
      <p class="game-intruction-content" v-html="game.content"></p>
       </p>
    </div>
    <div class="game-bottom">
      <ul class="game-tit">
        <li :class="{'game-tit-active':selectActive===1}" @click="selectModel(1)">礼包</li>
        <li :class="{'game-tit-active':selectActive===2}" @click="selectModel(2)">资讯</li>
      </ul>
      <ul class="game-gift" v-if="selectActive===1">
        <li v-for="gift in gifts.gift">
          <p class="game-gift-name"><i class="fa fa-gift"></i>{{ gift.gamename }}</p>
          <p class="game-gift-content">{{ gift.card_context }}</p>
          <a href="javascript:;" v-show="gift.getstatus == 0" class="game-gift-get"@click="getGift(gift.id)">领取</a>
          <a href="javascript:;" v-show="gift.getstatus == 1" class="game-gift-get" @click="checkGiftCode(gift.card)">查看</a>
        </li>
      </ul>

      <!--+++++-->
  <!--    <ul class="game-gift">
        <li>
          <p class="game-gift-name"><i class="fa fa-gift"></i>gift.gamename </p>
          <p class="game-gift-content">gift.card_context </p>
          <a href="javascript:;" class="game-gift-get">领取</a>
          &lt;!&ndash;<a href="javascript:;"  class="game-gift-get" @click="checkGiftCode(gift.card)">查看</a>&ndash;&gt;
        </li>
      </ul>-->
      <!--+++++-->



      <ul class="game-article" v-if="selectActive===2">
        <router-link tag="li" v-for="article in articles" :to="{path:'/newsdetial/'+article.id}">
            <span class="game-article-style">公告</span>
            <span class="game-article-content">{{ article.post_title }}</span>
            <span class="game-article-time">{{ article.post_date }}</span>
        </router-link>
      </ul>
      <!--+++++-->
   <!--   <ul class="game-article">
        <li>

          <span class="game-article-style">公告</span>
          <span class="game-article-content">article.post_excerpt</span>
          <span class="game-article-time">article.post_date </span>

        </li>
      </ul>-->
      <!--+++++-->
    </div>

  </div>
</template>

<script>
  import { Toast,MessageBox } from 'mint-ui';
export default {
  created(){
    this.getData()
  },
  data () {
    return {
      game:'',
      selectActive:1,  //样式 1为礼包 2为资讯
      gifts:'',
      articles:''
    }
  },
  methods:{
    selectModel(model){
        //样式
      this.selectActive = model
      //确定模块
      if (model === 1){

      }
    },
    checkGiftCode(card){
      MessageBox({
        title:'领取提示',
        message: '<p style="color=#222;"><span style="padding-right: 1rem">兑换码</span><span style="-webkit-user-select:text;background: #ebebeb;padding: 0 .5rem;font-style: italic;">'+ card +'</span></p><p style="font-size: 1.2rem;padding-top: .3rem;line-height: 20px;"">复制兑换码,去游戏中使用</p>',
        showCancelButton: false
      });
    },
    getData(){
      this.$http.get('/api/h5/game/gameinfo/gid/'+this.$route.params.gid).then(function (res) {
        this.game = res.body
        console.log(this.$route.params.gid)
        console.log(this.game.articletype)

        //礼包接口
        this.$http.get('/api/h5/game/cardlist/gid/'+this.$route.params.gid).then(function (res) {
          this.gifts = res.body
        },function (err) {
          console.log(err)
        })

        //文章接口
        this.$http.get('/api/h5/article/getbyid/id/'+this.game.articletype).then(function (res) {
          this.articles = res.body
        },function (err) {
          console.log(err)
        })


      },function (err) {
        console.log(err)
      })
    },
    // 获取礼包
    getGift(id){
      this.$http.get('/api/h5/game/getcard?id='+id).then(function (res) {
        console.log(res)
        this.card = res.body
        if(this.card.status == 1){
          console.log('status == 1')
          console.log(this.card)
          MessageBox({
            title:'领取提示',
            message: '<p style="color=#222;"><span style="padding-right: 1rem">兑换码</span><span style="-webkit-user-select:text;background: #ebebeb;padding: 0 .5rem;font-style: italic;">'+ this.card.cardid +'</span></p><p style="font-size: 1.2rem;padding-top: .3rem;line-height: 20px;"">复制兑换码,去游戏中使用</p>',
            showCancelButton: false
          });

          this.$http.get('/api/h5/game/cardlist/gid/'+this.$route.params.gid).then(function (res) {
            this.gifts = res.body
          },function (err) {
            console.log(err)
          })
        }else{
          Toast({
            message:this.card.msg,
            position:'middle'
          })
        }
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
  .gamedetial{
    background-color: #ececec;
  }
  .game-bg{
    height: 16rem;
  }
  .game-head{
    position: relative;
    height: 6rem;
    background-color: #fff;
  }
  .game-head img{
    position: absolute;
    width: 7rem;
    height: 7rem;
    border-radius: 1rem;
    display: block;
    left: 2rem;
    top: -2rem;
    border:0.2rem solid #fff;
  }
  .game-head .game-name{
    position: absolute;
    color: #333;
    font-size: 1.4rem;
    left: 10rem;
    top: 1.5rem;
  }
  .game-head .game-brief{
    font-size: 1.2rem;
    color: #999;
    position: absolute;
    left: 10rem;
    top:3.3rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: 14rem;
  }
  .game-head .game-start{
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
  .game-intruction{
    margin-top: 1rem;
    background-color: #fff;
    min-height: 10rem;
  }
  .game-intruction-tit{
    height: 4rem;
    line-height: 4rem;
    font-size: 1.6rem;
    position: relative;
    text-indent: 3rem;
  }
  .game-intruction-tit-border{
    position: absolute;
    height: 1.6rem;
    width: 0.2rem;
    top: 50%;
    margin-top: -0.8rem;
    left: 2rem;
    background-color: #4385f5;
  }
  .game-intruction-content{
    color: #6a6a6a;
    margin:0 2rem;
    line-height: 1.6rem;
    font-size: 1.3rem;
    padding: 0 0 0.5rem;

  }
  .game-bottom{
    margin-top: 1rem;
    background-color: #fff;
  }
  .game-tit{
    height: 3rem;
  }
  .game-tit > li{
    float: left;
    width: 50%;
    text-align: center;
    height: 3rem;
    line-height: 3rem;
    font-size: 1.6rem;
    border-bottom: 0.2rem solid #f6f5fa;
  }
  .game-tit-active{
    border-bottom: 0.2rem solid #4385f5!important;
    color: #4385f5;
  }

  .game-gift > li{
    position: relative;
    border-bottom: 0.2rem solid #f1f1f1;
    height: 6rem;
  }
  .game-gift .game-gift-name{
    position: absolute;
    font-size: 1.6rem;
    line-height: 1.6rem;
    height: 1.6rem;
    color: #222;
    left: 2rem;
    top: 1.3rem;
  }
  .game-gift .game-gift-content{
    position: absolute;
    bottom:1rem;
    left: 2rem;
    color: #989898;
    max-width: 14rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .game-gift .game-gift-get{
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
  .game-article li{
    position: relative;
    height: 4rem;
    border-bottom: 0.1rem solid #f1f1f1;
  }

  .game-article li span{
    display: block;
  }

  .game-article-content{
    width: 40%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .game-article-style,
  .game-article-content,
  .game-article-time{
    position: absolute;
    height: 2rem;
    line-height: 2rem;
    font-size: 1.4rem;
    top: 50%;
    margin-top: -1rem;
  }
  .game-article-style{
    display: block;
    width: 3.5rem;
    border:0.1rem solid #4385f5;
    color: #4385f5;
    text-align: center;
    cursor: pointer;
    left: 1.8rem;
    border-radius: 0.3rem;
  }
  .game-article-content{
    position: absolute;
    font-size: 1.4rem;
    height: 2rem;
    line-height: 2rem;
    top:50%;
    margin-top: -1rem;
    left: 7rem;
    max-width: 15rem;
  }
  .game-article-time{
    position: absolute;
    font-size: 1.4rem;
    height: 2rem;
    line-height: 2rem;
    top:50%;
    margin-top: -1rem;
    right: 1.8rem;

  }
  .game-gift-name i{
    color: #4385f5;
    padding-right: 0.5rem;
    font-size: 1.6rem;
  }
</style>
