import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App)
app.config.globalProperties.$axios = axios
app.component('VueDatePicker', VueDatePicker)
app.use(store).use(router).mount('#app')
