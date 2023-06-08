import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children:[
      {
        path:"books",
        name:"books",
        meta:{
          isshow:true,
          title:"books"
        },
        component:()=> import('../views/BooksView.vue')
      },
      {
        path:"users",
        name:"users",
        meta:{
          isshow:true,
          title:"users"
        },
        component:()=> import('../views/UsersView.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
  {
    path: '/library',
    name: 'library',
    component: () => import(/* webpackChunkName: "library" */ '../views/LibraryView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
