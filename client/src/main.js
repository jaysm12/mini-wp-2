import App from './App.vue';
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Toast from 'buefy/dist/components/toast'
import axios from 'axios'
import 'buefy/dist/buefy.css'
Vue.use(Toast)
Vue.use(axios)
Vue.use(Vuetify)
new Vue(App).$mount('#app');