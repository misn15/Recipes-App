import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify';
import { library } from '@fortawesome/fontawesome-svg-core'
// import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';
import router from './router';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0,
    greetingName:'',
    signedIn: false
  },
  mutations: {
    increment (state) {
      state.count++
    },
    setName(state, payload) {
      state.greetingName = payload.name;
      console.log(state.greetingName);
    },
    isSignedIn(state, payload) {
      state.signedIn = payload.name;
      console.log(state.signedIn);
    }
  }
})

library.add(far, faHeart, faCoffee)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
