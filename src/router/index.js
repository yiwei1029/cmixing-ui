import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Test from '../components/Test.vue'
import Coordinator from '../components/Coordinator/Coordinator.vue'
import Request from '../components/Request/Request.vue'
import Query from '../components/Query/Query.vue'

Vue.use(VueRouter)

const routes = [
  {path:'/',redirect:'/login'},
  {
    path: '/login',
    name: 'login',
    component:Login
  },
  {
    path:'/home',
    component:Home,
    children:[
      {path:'/coordinator',component:Coordinator},
      {path:'/request',component:Request},
      {path:'/query',component:Query}

    ]
  },
  {
    path:'/test',
    component:Test
  }

]

const router = new VueRouter({
  routes
})

export default router
