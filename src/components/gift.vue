<template>
  <div>
    <!--<gqc-header></gqc-header>-->
    <listPublicHeader title="全部礼包"></listPublicHeader>
    <div class="gift">
      <ul class="clearfix game-list" id="gameList">
        <li class="clearfix" v-for="(game,index) in games" v-if="game.gift !== null">
          <div class="game-box">
            <img :src="game.pic" alt="" class="game-img">
            <p class="game-name">{{ game.gamename }}</p>
            <a :data-href="game.url" class="game-start-btn">开始</a>
          </div>
          <ul class="gift-list clearfix" >
            <li class="clearfix" v-for="(gift,index2) in game.gift" :class="{block: index == giftIndex}">
              <p class="gift-name">{{ gift.name }}</p>
              <p class="gift-content">{{ gift.card_context }}</p>

              <a href="javascript:;" v-show="gift.getstatus == 0" class="gift-get"
              @click="getGift(gift.id)" :gameid="game.gid" :giftid="gift.id" :idiscommon="gift.idiscommon">领取</a>

              <a :href="gift.url" v-show="gift.getstatus == 1" class="gift-get" @click="checkGiftCode(gift.card)">查看</a>
            </li>
          </ul>
          <div class="gift-select-all" @click="selectAllGift(index)" v-if="game.total_gift != 1" :class="{none:index == giftIndex}">查看更多礼包({{game.total_gift - 1}})</div>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
  import gqcHeader from './base/header'
  import { Toast,MessageBox } from 'mint-ui';
  import listPublicHeader from './index/indexlist/common/list-public-header.vue'
export default {

  created(){
    this.$http.get('/api/h5/game/cardlist').then(function (res) {
      this.games = res.body
      this.locationHref();
//      console.log('games.length'+this.games.length)
    },function (err) {
      console.log(err)
    })
  },
  components:{
    gqcHeader,
    listPublicHeader,
  },
  data () {
    return {
      games:[

      ],
      block:false,
      none:false,
      giftIndex:'0',
      card:''
    }
  },
  methods:{
      percentage(num,sum){
          return "width:"+num/sum*100+"%"
      },
      percentNum(num,sum){
        return parseInt(num/sum*100)
      },
      selectAllGift(index){

//        this.block = 'block'
          this.giftIndex = index;
          this.none = 'none'
      },
      checkGiftCode(card){
          MessageBox({
            title:'领取提示',
            message: '<p style="color=#222;"><span style="padding-right: 1rem">兑换码</span><span style="-webkit-user-select:text;background: #ebebeb;padding: 0 .5rem;font-style: italic;">'+ card +'</span></p><p style="font-size: 1.2rem;padding-top: .3rem;line-height: 20px;"">复制兑换码,去游戏中使用</p>',
            showCancelButton: false
          });
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
            this.$http.get('/api/h5/game/cardlist').then(function (res) {
              this.games = res.body
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
      },
      locationHref() {
        let hotGame = document.getElementById('gameList');
        hotGame.addEventListener('click',function(event){
            if (event.target.className == 'game-start-btn'){
              let dataHref = event.target.getAttribute('data-href');
              window.location.href = dataHref;
            }

        })
      }
  },
  computed:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .game-box{
   height:6.2rem;
   position: relative;
 }
  .game-img{
    position: absolute;
    top: 50%;
    margin-top: -2.5rem;
    height:5rem;
    width:5rem;
    border-radius: 1rem;
    left: 1.8rem;
    overflow: hidden;
  }
  .game-name{
    position: absolute;
    top: 50%;
    font-size: 1.6rem;
    height: 1.6rem;
    left: 8rem;
    margin-top: -0.8rem;
    color: #333;
  }
  .game-start-btn{
    position: absolute;
    display: block;
    width: 5rem;
    height: 2.5rem;
    line-height: 2.5rem;
    font-size: 1.4rem;
    border:0.1rem solid #4385f5;
    color: #4385f5;
    text-align: center;
    cursor: pointer;
    top: 50%;
    margin-top: -1.25rem;
    right: 1.8rem;
    border-radius: 0.5rem;
  }
  .gift-list{
    top:6.2rem;
    margin:0 1.8rem 0;
  }
  .gift-list > li{
    position: relative;
    height: 4.4rem;
    border-bottom: 0.1rem solid #f0f0f0;
  }
  .gift-list > li:first-of-type{
    border-top: 0.1rem solid #f0f0f0;
  }
  .gift-name{
    position: absolute;
    height: 1.4rem;
    font-size: 1.4rem;
    color: #333;
    top: 0.7rem;
  }
  .gift-content{
    position: absolute;
    height: 1.2rem;
    font-size: 1.2rem;
    color: #999;
    bottom: 0.7rem;
    width: 70%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .gift-get{
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
    right: 0;
    margin-top: -1.25rem;
    border-radius: 0.5rem;
  }
  .gift-select-all{
    height: 3rem;
    line-height: 3rem;
    color: #666;
    border-bottom: 0.1rem solid #dfdede;
    text-align: center;
    font-size: 1.2rem;
  }
  .block{
    display: block!important;
  }
  .none{
    display: none!important;
  }
  .gift-list li + li{
    display: none;
  }
  .game-list > li:last-of-type{
    margin-bottom: 6rem;
  }
</style>
