// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Layout from './components/layout.vue'
import VueRouter from 'vue-router'
import Axios from 'axios'
import VueResource from 'vue-resource'
import Index from './components/index.vue'
import Gift from './components/gift.vue'
import Person from './components/person.vue'
import Pay from './components/person/pay.vue'
import Qiandao from './components/person/qiandao.vue'
import Myinfo from './components/person/myinfo.vue'
import Paying from './components/person/paying.vue'
import Addtel from './components/person/addtel.vue'
import Realname from './components/person/realname.vue'
import Updatepsd from './components/person/updatepsd.vue'
import Gradeinfo from './components/person/gradeinfo.vue'
import Register from './components/person/register.vue'
import Gamedetial from './components/index/indexlist/hot/gamedetial.vue'
import Newsdetial from './components/index/indexlist/news/newsdetial.vue'
import Hot from './components/index/indexlist/list-hot.vue'
import NewServer from './components/index/indexlist/list-new-server.vue'
import News from './components/index/indexlist/list-news.vue'
import Subject from './components/index/indexlist/list-subject.vue'
import SubjectDetial from './components/index/indexlist/subject/subjectdetial.vue'
import Store from './components/store.vue'
import integralStore from './components/store/integralStore.vue'
import integralTask from './components/store/integralTask.vue'
import integralLog from './components/store/integralLog.vue'
import integralLuck from './components/store/integralLuck.vue'
import storeDetial from './components/store/integralstore/storedetial.vue'
import storeGet from './components/store/integralstore/storeget.vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Login from './components/base/login.vue'
Vue.use(VueAwesomeSwiper)
Vue.use(VueResource)
Vue.use(VueRouter)

Vue.prototype.$axios = Axios
Vue.http.options.emulateJSON = true


let router = new VueRouter({
  mode:'history',
  routes:[
    {
      path: '/',
      // redirect:'/index',
      component: Index
    },
    {
      path: '/index',
      component: Index
    },
    {
      path:'/gift',
      component: Gift
    },
    {
      path:'/person',
      component:Person
    },
    {
      path:'/person/pay',
      component:Pay
    },
    {
      path:'/person/qiandao',
      component:Qiandao
    },
    {
      path:'/person/myinfo',
      component:Myinfo
    },
    {
      path:'/pay/paying/:id',
      component:Paying
    },
    {
      path:'/person/addtel',
      component:Addtel
    },
    {
      path:'/person/realname',
      component:Realname
    },
    {
      path:'/person/updatepsd',
      component:Updatepsd
    },
    {
      path:'/person/gradeinfo',
      component:Gradeinfo
    },
    {
      path:'/register',
      component: Register
    },
    {
      path:'/gamedetial/:gid',
      component: Gamedetial
    },
    {
      path:'/newsdetial/:aid',
      component: Newsdetial
    },
    //indexList
    {
      path:'/hot',
      component: Hot
    },
    {
      path:'/new-server',
      component: NewServer
    },
    {
      path:'/news',
      component: News
    },
    {
      path:'/subject',
      component: Subject
    },
    {
      path:'/subjectdetial/:sjid',
      component: SubjectDetial
    },
    {
      path:'/store',
      component: Store,
      redirect:'/store/store',
      children:[
        {
          path:'/store/store',
          component: integralStore,
        },
        {
          path:'/store/task',
          component: integralTask,
        },
        {
          path:'/store/log',
          component: integralLog,
        },
        {
          path:'/store/luck',
          component: integralLuck,
        },
        {
          path:'/store/store/storedetial/:iid',
          component: storeDetial
        },
        {
          path:'/store/store/storedetial/get/:getid',
          component: storeGet
        },
      ]
    },
    {
      path:'/login',
      component: Login
    }
  ]
})
/* eslint-disable no-new */
new Vue({
  el: '#guoqianchen',
  router,
  // template: '<Layout/>',
  // components: { Layout }
  render:h => h(Layout)
})
