import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Profile from '@/components/Profile'
import Vaults from '@/components/Vaults'
import MyKeeps from '@/components/MyKeeps'
import Vault from '@/components/Vault'
import Keep from '@/components/Keep'
import UserKeeps from '@/components/UserKeeps'


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
    },
    {
      path: '/vaults/:vaultId',
      name: 'Vault',
      component: Vault
    },
    {
      path: '/keeps/:keepId',
      name: 'Keep',
      component: Keep
    },
    {
      path: '/users/:userId',
      name: 'UserKeeps',
      compontnet: UserKeeps
    }
  ]
})
