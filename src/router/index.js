import Vue from 'vue';
import Router from 'vue-router';

import Index from '@/components/index.vue'
import Gift from '@/components/gift.vue'
import Person from '@/components/person.vue'
import Pay from '@/components/person/pay.vue'
import Qiandao from '@/components/person/qiandao.vue'
import Myinfo from '@/components/person/myinfo.vue'
import Paying from '@/components/person/paying.vue'
import Addtel from '@/components/person/addtel.vue'
import Realname from '@/components/person/realname.vue'
import Updatepsd from '@/components/person/updatepsd.vue'
import Gradeinfo from '@/components/person/gradeinfo.vue'
import MyCollection from '@/components/person/myCollection.vue'
import Register from '@/components/person/register.vue'
import Gamedetial from '@/components/index/indexlist/hot/gamedetial.vue'
import Newsdetial from '@/components/index/indexlist/news/newsdetial.vue'
import Hot from '@/components/index/indexlist/list-hot.vue'
import NewServer from '@/components/index/indexlist/list-new-server.vue'
import News from '@/components/index/indexlist/list-news.vue'
import Subject from '@/components/index/indexlist/list-subject.vue'
import SubjectDetial from '@/components/index/indexlist/subject/subjectdetial.vue'
import Store from '@/components/store.vue'
import integralStore from '@/components/store/integralStore.vue'
import integralTask from '@/components/store/integralTask.vue'
import integralLog from '@/components/store/integralLog.vue'
import integralLuck from '@/components/store/integralLuck.vue'
import storeDetial from '@/components/store/integralstore/storedetial.vue'
import storeGet from '@/components/store/integralstore/storeget.vue'
import Login from '@/components/base/login-pre.vue'
import LoginLatest from '@/components/base/loginLatest.vue'
/* 
  增加第一版新路由
*/
import LoginLatestNewOne from '@/components/base/new-login-one/loginLatest.vue'
/* 
  增加第二版新路由
*/
import LoginLatestNewTwo from '@/components/base/new-login-two/loginLatest.vue'
/* 
  增加第三版新路由
*/
import LoginLatestNewThree from '@/components/base/new-login-three/loginLatest.vue'
/* 
  增加第四版新路由
*/
import LoginLatestNewFour from '@/components/base/new-login-four/loginLatest.vue'

Vue.use(Router);
export default new Router({
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
        path:'/person/mycollection',
        component:MyCollection
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
        component: LoginLatest
      },
      {
        path:'/login-ios-one',
        component: LoginLatestNewOne
      },
      {
        path:'/login-ios-two',
        component: LoginLatestNewTwo
      },
      {
        path:'/login-ios-three',
        component: LoginLatestNewThree
      },
      {
        path:'/login-ios-four',
        component: LoginLatestNewFour
      },
      {
        path:'/login-pre',
        component: Login
      }
    ]
})
