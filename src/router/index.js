import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route      // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Register" */ '../views/Register.vue')
  },
  {
    path: '/content',
    name: 'Content',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route      // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Content" */ '../views/Content.vue'),
    children:[
      {
        path: '/home',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route      // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
      },
      {
        path: '/group',
        name: 'Group',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route      // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "Group" */ '../views/Groups.vue')
      },
      {
        path: '/mygroup/:id',
        name: 'MyGroup',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route      // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "Group" */ '../views/MyGroup.vue'),
        props: true
      },
      {
        path: '/stream',
        name: 'Stram',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route      // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "Stream" */ '../views/Stream.vue')
      },
    ]
  },
  { 
    path: "*",
    name: '404',
    component:()=> import('../views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router