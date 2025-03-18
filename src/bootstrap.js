import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';

// Function to bootstrap and mount the Vue.js application
export function bootstrap(target, attributes) {

    // Create a new Vue application instance
    // second argument is object of attributes that will be
    // converted to properites in App.vue
    const pinia = createPinia()
    const app = createApp(App, attributes)

     // Mount the Vue application onto the specified target element
    app.use(pinia)
    app.mount(target);
}
