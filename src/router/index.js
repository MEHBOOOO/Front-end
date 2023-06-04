import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView/HomeView.vue'
import ServicesView from '@/views/ServicesView/ServicesView.vue'
import BookingView from '@/views/BookingView/BookingView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/services',
    name: 'Services',
    component: ServicesView
  },
  {
    path: '/booking/:serviceType',
    name: 'Booking',
    component: BookingView,
    props: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
