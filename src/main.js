import { createApp } from 'vue'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAnalytics from 'vue-analytics';


createApp(App).mount('#app')

Vue.use(VueAnalytics, {
    id: 'UA-259472717',
    router
}); 
