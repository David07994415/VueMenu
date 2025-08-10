import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'

const rawRoutes = [
  {
    path: '/',
    //name: 'Home',
    component: HomeView
  },
  {
    path: '/Register',
    //name: 'Home',
    component: RegisterView
  },
  // 可以在這裡加入更多 routes
]

// 取得 vite.config.js 中的 base URL
const prefix = import.meta.env.BASE_URL.replace(/\/$/, '')

// 將 prefix 加到每個路由的 path 前面
const routes = rawRoutes.map(route => ({
  ...route,
  path: prefix + route.path
}))


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router