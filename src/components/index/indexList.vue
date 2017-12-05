<template>
  <div class="index-list">
    <ul class="index-content-nav clearfix">
      <router-link :to="{path:'/hot'}" tag="li">
        <p>热门</p>
      </router-link>
      <router-link :to="{path:'/new-server'}" tag="li">
        <div class="red-rot" :class="redHas('new_server')"></div>
        <p>新开服</p>
      </router-link>
      <router-link :to="{path:'/news'}" tag="li">
        <div class="red-rot" :class="redHas('message')"></div>
        <p>资讯</p>
      </router-link>
      <router-link :to="{path:'/subject'}" tag="li">
        <div class="red-rot" :class="redHas('special')"></div>
        <p>专题</p>
      </router-link>
    </ul>

  </div>
</template>

<script>
  import Hot from './indexlist/list-hot.vue'
  import Recommond from './indexlist/list-subject.vue'
  import News from './indexlist/list-news.vue'
  import Server from './indexlist/list-new-server.vue'
  import tools from '../../util/tool.js'
export default {
  created(){
      this.$http.get('/api/indexlists').then((res) => {
        this.indexLists = res.data
      },(err) => {
        console.log(err)
      })

       //新内容
      this.$axios.get('/api/h5/index/redsign')
      .then((res) => {
        if(res.data.code == 2000) {
          this.redDate = res.data.data
        }
      })

      this.getLocalDate()
  },
  components:{
    Hot,
    Recommond,
    News,
    Server
  },
  data () {
    return {
      currentList:'Hot',
      redDate: {},
      active:0,
      localDate: {

      },
      defaultDate: {
        new_server: 0,
        message: 0,
        special: 0,
        gift: 0,
        mall: 0
      }
    }
  },
  methods:{
    getLocalDate() {
      if (localStorage.getItem('red')) {
        this.localDate = JSON.parse(localStorage.getItem('red'))
      } else {
        this.localDate = this.defaultDate
      }
    },
    saveDate(content) {
      if (content === 'new-server') {
        content = 'new_server'
      }
      if (content === 'news') {
        content = 'message'
      }
      if (content === 'subject') {
        content = 'special'
      }
      // console.log(this.localDate[content],this.redDate[content])
      if (parseInt(this.localDate[content]) < parseInt(this.redDate[content])) {
        console.log('save it')
        let obj = {}
        obj[content] = parseInt(Date.now() / 1000)
        this.localDate = Object.assign({},this.localDate,obj)
        localStorage.setItem('red',JSON.stringify(this.localDate))
      }
    },
    redHas(content) {
      if (this.redDate[content] === 0) {
        return ''
      } else if (this.localDate[content] < this.redDate[content]) {
        return 'has'
      } else {
        return ''
      }
    },
    updateList(num,index){
      this.currentList = num
      this.active = index
    },
    clickRouter(path,name){
      tools.clickNum({
        url : '/api/h5/index/buttonClick',
        data : {
          url : path,
          name : name,
          type : '首页导航'
        },
      },'router')
    },
    clickRouterUrl(val){
        this.saveDate(val.path.substr(1))
        let data = {
            path : '',
            name : '',
        }
        if(val.path === "/hot"){
             console.log(val.path)
             data.path = val.path
             data.name = "热门"
        }
        if(val.path === "/new-server"){
            console.log(val.path)
            data.path = val.path
            data.name = "新开服"
        }
        if(val.path === "/news"){
            console.log(val.path)
            data.path = val.path
            data.name = "资讯"
        }
        if(val.path === "/subject"){
            console.log(val.path)
            data.path = val.path
            data.name = "专题"
        }
        if (data.path){
          this.clickRouter(data.path,data.name)
        }
    }
  },
  watch:{
    "$route" : "clickRouterUrl"
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .index-list{

    background-color: #fff;
  }
.index-content-nav li{
  position: relative;
  float: left;
  width: 25%;
  line-height: 3.6rem;
  font-size: 1.5rem;
  text-align: center;
  cursor: pointer;
  color: #333;
  height: 8rem;
  background-size: 4rem!important;
}
.red-rot{
  position: absolute;
  top: 12px;
  right: 20px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
.red-rot.has{
  background-color: red;
}
.index-content-nav li p{
  position: absolute;
  font-size: 1.4rem;
  height: 1.4rem;
  line-height: 1.4rem;
  text-align: center;
  width: 100%;
  bottom: 0.5rem;

}
.index-content-nav li:first-of-type{
  background: url("../../assets/list-hot.png") center 1rem no-repeat;
}
.index-content-nav li:nth-child(2){
  background: url("../../assets/list-new-server.png") center 1rem no-repeat;
}
.index-content-nav li:nth-child(3){
  background: url("../../assets/list-news.png") center 1rem no-repeat;
}
.index-content-nav li:last-of-type{
  background: url("../../assets/list-subject.png") center 1rem no-repeat;
}


/*previous*/

/*.list-line{*/
  /*position: absolute;*/
  /*width: 6rem;*/
  /*bottom: 0;*/
  /*left: 50%;*/
  /*margin-left: -3rem;*/
/*}*/

/*div.listLineActive{*/
  /*border: 0.1rem solid #4385f5;*/
/*}*/
/*.index-content-nav li.listFontActive{*/
  /*color: #4385f5;*/
/*}*/
  /*@media only screen and (max-width:400px){*/
    /*.index-content-nav li{*/
      /*line-height: 3rem;*/
      /*height: 3rem;*/
      /*font-size: 1.4rem;*/
    /*}*/
  /*}*/
</style>
