<template>
  <div class="boutique">
    <p class="boutique-title">精品推荐</p>
    <ul class="clearfix">
        <li v-for="game in hotgames">
          <router-link :to="{path:'/gamedetial/'+ game.id}">
            <img :src="game.img" alt="">
            <div class="game-box clearfix">
              <p class="game-name" :data-game="game.id">
                <span class="game-the-name">{{ game.name }}</span>
                <span v-if="game.ishot == 1" class="is-hot">热门</span>
                <!--<span v-if="game.isnew == 1" class="is-new">最新</span>-->
                <span v-if="game.gift !== null" class="is-gift">礼包</span>
              </p>
              <p class="game-content">{{ game.content }}</p>
            </div>
          </router-link>
          <a class="start-game" @click="clickBtn(game.name,game.url)">开始</a>

        </li>

    </ul>
  </div>
</template>

<script>
  import InfiniteLoading from 'vue-infinite-loading';
  import tools from '../../util/tool.js'
export default {
  created(){
    this.$http.get('/api/h5/game/hot').then(function (res) {
      this.hotgames = res.body
    },function (err) {
      console.log(err)
    })
  },
  data () {
    return {
      hotgames:[

      ]
    }
  },
  methods:{
      getGame(){
        this.$http.get('/api/h5/game/hot').then(function (res) {
          this.hotgames = res.body
        },function (err) {
          console.log(err)
        })
      },
   /* onInfinite() {
      setTimeout(() => {
        const temp = [];
        for (let i = this.list.length + 1; i <= this.list.length + 20; i++) {
          temp.push(i);
        }
        this.list = this.list.concat(temp);
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
      }, 1000);
    },*/
    //游戏点击
    clickBtn(name,url){
      tools.clickNum({
        url : '/api/h5/index/buttonClick',
        data : {
          name : name,
          type : '精品推荐',
          url : url
        },
        href : url
      })
    }
  },
  components: {
    InfiniteLoading,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .boutique-title{
    height: 3rem;
    line-height: 3rem;
    font-size: 1.6rem;
    font-weight: bolder;
    text-indent: 1.8rem;
    color: #4385f5;
    background: #fff;
  }
.boutique ul li{
  height:6.2rem;
  border-top: 0.1rem solid rgb(237,237,237);
  background-color: #fff;
  position: relative;
}
  .boutique ul li:last-of-type{
    margin-bottom: 5.2rem;
  }
.boutique ul li img{
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
  max-width: 14rem;
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
    .boutique ul li img{
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
