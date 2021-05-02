import { createStore } from 'vuex'

export default createStore({
  state: {
    token: localStorage.getItem('token') || '',
  },
  mutations: {
  },
  actions: {

  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  },
  modules: {
  }
})
