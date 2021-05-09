import { createStore } from 'vuex'

import { apiURL } from '../settings.js'

export default createStore({
  state: {
    token: localStorage.getItem('token') || '',
    status: '',
    userInformation: {}
  },
  mutations: {
    auth_success(state, userInformation) {
      state.status = true
      state.userInformation = userInformation
    },
    auth_logout(state) {
      state.status = false
      state.userInformation = {}
    }
  },
  actions: {
    auth_success({commit}, token) {
      fetch(`${apiURL}user/get/information`, {
          method: "GET",
          headers: {
            "authorization": token
          }
      }
      ).then(response =>
        response.json()
      ).then(data => {
        console.log(data)
        commit('auth_success', data.message)
      })
    },
    auth_logout({commit}) {
        localStorage.removeItem('token')
        commit('auth_logout')
    }
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    //Debug
  },
  modules: {
  }
})

