<template>
  <div class="list-new-server">
    <ul class="server-select">
      <li v-for="(server,index) in serverStyle" @click="toggleServer(index)" :class="{'server-select-content':active === index}">{{ server.name }}</li>
    </ul>

    <ul class="clearfix list-content" id="listContent" v-if="active === 0">
      <li v-for="game in yikai">
        <router-link :to="{path:'/gamedetial/'+ game.gid}">
        <img :src="game.img" alt="">
        <div class="game-box clearfix">
          <p class="game-name">
            <span class="game-the-name">{{ game.gamename }}</span>
          </p>
          <p class="game-content">{{ game.servername }}</p>
        </div>
        <p class="game-status">已开服</p>
        </router-link>
        <a :data-href="game.url" class="start-game">开始</a>
      </li>
    </ul>
    <ul class="clearfix list-content" v-if="active === 1">
      <li v-for="game in yugao">
        <img :src="game.img" alt="">
        <div class="game-box clearfix">
          <p class="game-name">
            <span class="game-the-name">{{ game.gamename }}</span>
          </p>
          <p class="game-content">{{ game.servername }}</p>
        </div>
        <p class="game-time">开服时间{{ game.start_time }}</p>
      </li>
     <!-- <li>
        <img src="" alt="">
        <div class="game-box clearfix">
          <p class="game-name">
            <span class="game-the-name">游戏名</span>
          </p>
          <p class="game-content">123456798</p>
        </div>
        <p class="game-time">开服时间7月1日</p>
      </li>-->
    </ul>
  </div>
</template>

<script>
export default {
  created(){
    //已开新服
    this.$http.get('/api/h5/game/server').then((res) => {
      this.yikai = res.body
      this.locationHref();
    },(err) => {
      console.log(err)
    })
    //新服预告
    this.$http.get('/api/h5/game/server/type/yugao').then((res) => {
      this.yugao = res.body
    },(err) => {
      console.log(err)
    })
  },
  data () {
    return {
      serverStyle:[
        {
            name:'已开新服',
        },
        {
            name:'新服预告'
        }
      ],
      active:0,
      yikai:[],
      yugao:[]
    }

  },
  methods:{
    toggleServer(index){
      this.active = index
    },
    locationHref() {
      let hotGame = document.getElementById('listContent');
      hotGame.addEventListener('click',function(event){
        let dataHref = event.target.getAttribute('data-href');
        window.location.href = dataHref;
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .list-new-server .list-content li{
    height:6.2rem;
    border-top: 0.1rem solid rgb(237,237,237);
    background-color: #fff;
    position: relative;
  }
  .list-new-server .list-content li:last-of-type{
    margin-bottom: 6rem;
  }
  .list-new-server ul li img{
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
    color: #ec5f56;
    font-size: 1.2rem;
    line-height: 3rem;
    padding-left: 2rem;
    max-width: 18rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .game-status{
    position: absolute;
    top:50%;
    height: 1.2rem;
    font-size: 1.2rem;
    line-height: 1.2rem;
    margin-top: -0.6rem;
    right: 8rem;
    color: #999;
  }
  .game-time{
    position: absolute;
    font-size: 1.6rem;
    height: 1.6rem;
    line-height: 1.6rem;
    right: 1.8rem;
    top: 50%;
    margin-top: -0.9rem;
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

  .list-new-server .server-select{
    text-align: center;
    margin:1.4rem 0;

  }
  .list-new-server .server-select li{
    display: inline-block ;
    width: 49%;
    border: 0.1rem solid #4385f5;
    line-height: 2rem;
    color: #999 ;
    font-size: 1.4rem;
    cursor: pointer;
  }
  .list-new-server .server-select li:first-of-type{
    border-radius: 0.5rem 0 0 0.5rem;
  }
  .list-new-server .server-select li:last-of-type{
    border-radius: 0 0.5rem 0.5rem 0;
  }
  .list-new-server .server-select li.server-select-content{
    background-color: #4385f5;
    color: #fff;
  }
  .server-select{
    margin-top: 1.5rem;
  }
  .is-hot,.is-new,.is-gift{
    display: inline-block;
    color: #fff;
    font-size: 0.8rem;
    line-height: 1.4rem;
    height: 1.4rem;
    padding: 0 0.3rem;
    transform: translateY(-0.2rem);
    border-radius: 0.3rem;
  }
  .is-hot{
    border: 0.1rem solid #e32e16;
    color: #e32e16;
  }
  .is-new{
    border: 0.1rem solid #4db233;
    color: #4db233;
  }
  .is-gift{
    border: 0.1rem solid #4385f5;
    color: #4385f5;
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
