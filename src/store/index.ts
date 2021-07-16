import { createStore } from 'vuex'
import user from './modules/user';
import findMatchingTenants from './modules/findMatchingTenants';

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    findMatchingTenants
  }
})
