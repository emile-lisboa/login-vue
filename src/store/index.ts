import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
      display_name: null,
      email: null,
      uid: null
    },

  },
  mutations: {
    setUser (state, usuario) {
      state.user.display_name = usuario.display_name
      state.user.email = usuario.email
      state.user.uid = usuario.uid
    },

  },
  getters: {
    getUser (state) {
      return state.user
    }
  },
  actions: {
  },
  modules: {
  }
})
