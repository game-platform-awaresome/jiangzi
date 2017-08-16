<template>
  <div>
    <gqc-header></gqc-header>
    <div class="index">
      <slide></slide>
      <index-list></index-list>
      <recent v-if="userInfo !== ''"></recent>
      <boutique></boutique>
    </div>
  </div>
</template>

<script>
  import Slide from './index/slide'
  import Recent from './index/recent'
  import indexList from './index/indexList'
  import gqcHeader from './base/header'
  import Boutique from './index/boutique'
export default {
  created(){
    this.$axios.get('/api/h5/user/getUserinfo')
      .then(res => {
        console.log(res)
        if (res.data.user){
          this.userInfo = res.data.user
        }
      })
      .catch(function(error){
        console.log(error)
      })
  },
  components:{
    Slide,
    Recent,
    indexList,
    gqcHeader,
    Boutique
  },
  data () {
    return {
        userInfo:''
    }
  },



}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
