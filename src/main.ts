import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { firebaseApp } from './config'

createApp(App).use(firebaseApp).use(store).use(router).mount('#app')
