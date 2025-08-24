import { createRouter, createWebHistory, createWebHashHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import DrinkView from '../views/DrinkView.vue'
import ThreecView from '../views/ThreecView.vue'

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
  {
    path: '/Drink',
    //name: 'Home',
    component: DrinkView
  },
  {
    path: '/Threec',
    //name: 'Home',
    component: ThreecView
  },
  // 可以在這裡加入更多 routes
]

// 取得 vite.config.js 中的 base URL
const prefix = import.meta.env.BASE_URL.replace(/\/$/, '')

// 將 prefix 加到每個路由的 path 前面
const routes = rawRoutes.map(route => ({
  ...route,
  // path: prefix + route.path // github pages 需要使用 createWebHashHistory，就不需要prefix
  path: route.path
}))


const router = createRouter({
  // history: createWebHistory(),  // github pages 需要使用 createWebHashHistory
  history: createWebHashHistory(), // 使用 prefix 作為基礎路徑
  routes
})

export default router