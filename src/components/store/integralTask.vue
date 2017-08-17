<template>
  <div class="integral">
    <div class="select">
      <ul>
        <li @click="selectTaskType(1)">新手任务 <div :class="{'integral-task-select-type': 1 == active}"></div></li>
        <li @click="selectTaskType(2)">日常任务 <div :class="{'integral-task-select-type': 2 == active}"></div></li>
      </ul>
    </div>
    <ul class="task" v-if="active == 1">
      <li v-for="task in tasks" v-if="task.type === '2'">
        <img :src="task.image" alt="">
        <p class="task-name">{{ task.title }} <span>+{{ task.integral }}积分</span></p>
        <p class="task-content">{{ task.content }}</p>
        <a class="btn task-btn task-get"  v-if="task.showStatus === 0">任务未完成</a>
        <a class="btn task-btn task-get" v-if="task.showStatus === 2" @click="getIntegral(task.id)">积分领取</a>
        <a class="btn task-btn task-got"  v-if="task.showStatus === 1">积分已领取</a>
      </li>
    </ul>

    <ul class="task" v-if="active == 2">
      <li v-for="task in tasks" v-if="task.type === '1'">
        <img :src="task.image" alt="">
        <p class="task-name">{{ task.title }} <span>+{{ task.integral }}积分</span></p>
        <p class="task-content">{{ task.content }}</p>
        <a class="btn task-btn task-got"  v-if="task.showStatus === 0" disabled>任务未完成</a>
        <a class="btn task-btn task-get" v-if="task.showStatus === 2" @click="getIntegral(task.id)">积分领取</a>
        <a class="btn task-btn task-got"  v-if="task.showStatus === 1 || task.showStatus === 3" disabled>积分已领取</a>
      </li>
    </ul>
  </div>
</template>

<script>
  import { Toast,MessageBox } from 'mint-ui';
export default {
    created(){
        this.getData();
    },
  data () {
    return {
        tasks:[],
        //1日常任务 2新手任务
        active:'1'
    }
  },
  methods:{
    selectTaskType(status){
      this.active = status
    },
    getIntegral(taskId){
        this.$axios.get('/api/integral/task/receiveRewards?taskid=' + taskId)
          .then(res => {
//              console.log(res)
              if(res.data.code === 1){
                Toast({
                  message: '领取成功',
                  position: 'middle',
                  duration: 1000
                })
                this.getData();
              }

          })
          .catch(function(error){
            console.log(error)
          })
    },
    getData(){
      this.$axios.get('/api/integral/task')
        .then(res => {
          this.tasks = res.data.data
        })
        .catch(function(error){
          console.log(error)

        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .integral .select{
    margin-top: 1rem;
  }
.integral .select ul{
  overflow: hidden;
}
.integral .select ul li{
  float: left;
  width: 50%;
  height: 4rem;
  line-height: 4rem;
  text-align: center;
  background-color: #fff;
  color: #666;
  font-size: 1.4rem;
  position: relative;
}
  .integral .select ul li div.integral-task-select-type{
    width: 8rem;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -4rem;
    background-color: #4385f5;
    height: 0.2rem;
  }
  .task{
    position: relative;
    margin-top: 0.5rem;
    background-color: #fff;
  }
  .task li{
    height: 6rem;
    border-bottom: 0.1rem solid #ececec;
    position: relative;
  }
  .task li img{
    width: 4rem;
    height: 4rem;
    position: absolute;
    top:50%;
    margin-top: -2rem;
    left: 1rem;
  }
  .task li .task-name,.task li .task-content{
    position: absolute;
    left: 6rem;
  }
  .task li .task-name{
    top: 1.5rem;
    font-size: 1.4rem;
    color: #333;
  }
  .task li .task-content{
    top:3.5rem;
    font-size: 1.2rem;
    color: #999;
  }
  .task li .task-btn{
    position: absolute;
    height: 3rem;
    width: 7rem;
    top: 50%;
    margin-top: -1.5rem;
    right: 1rem;
    border-radius: 0.4rem;
    font-size: 1.4rem;
    text-align: center;
    line-height: 3rem;
  }
  .task-get{
    border: 0.1rem solid #4385f5;
    color: #4385f5;
  }
  .task-got{
    border: 0.1rem solid #999;
    color: #999;
  }
</style>
