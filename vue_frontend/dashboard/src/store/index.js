import { createStore } from 'vuex'

export default createStore({
  state: {
    token: localStorage.getItem('token') || '',
  },
  mutations: {
  },
  actions: {
    logout (state) {
        state.token = ''
        localStorage.removeItem('token')
    }
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  },
  modules: {
  }
})
