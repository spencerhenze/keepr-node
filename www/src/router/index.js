import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Profile from '@/components/Profile'
import Vaults from '@/components/Vaults'
import MyKeeps from '@/components/MyKeeps'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: "Login",
      component: Login
    },
    {
      path: '/profile',
      name: "Profile",
      component: Profile
    },
    {
      path: '/vaults',
      name: "Vaults",
      component: Vaults
    },
    {
      path: '/mykeeps',
      name: "MyKeeps",
      component: MyKeeps
    }
  ]
})
