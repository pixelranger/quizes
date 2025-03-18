import './assets/styles/main.scss'

import { createApp } from 'vue'
import App from './Dev.vue'
import { createPinia } from 'pinia';

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app');
