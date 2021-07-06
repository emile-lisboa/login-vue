import { createStore } from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
import router from '@/router'

export default createStore({
  state: {
    user: {
      display_name: null,
      email: null,
      uid: null
    },
    isAuthenticated: false
  },
  mutations: {
    setUser (state, usuario) {
      state.user.display_name = usuario.display_name
      state.user.email = usuario.email
      state.user.uid = usuario.uid
    },
    setAuthStatus (state, status) {
      state.isAuthenticated = status
    }
  },
  getters: {
    getUser (state) {
      return state.user
    }
  },
  actions: {
    async login ({ state, commit }, payload) {
      if (!state.isAuthenticated) {
        try {
          const userCredential = await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
          const user = userCredential.user
          commit('setUser', {
            display_name: user?.displayName,
            email: user?.email,
            uid: user?.uid
          })
          commit('setAuthStatus', true)
          router.push('/home')
        } catch (error) {
          console.log(error)
        }
      } else {
        const user = await firebase.auth().currentUser
        commit('setUser', {
          display_name: user?.displayName,
          email: user?.email,
          uid: user?.uid
        })
        router.push('/home')
      }
    },
    async loginGoogle ({ state, commit }) {
      if (!state.isAuthenticated) {
        try {
          const provider = new firebase.auth.GoogleAuthProvider()
          provider.addScope('profile')
          provider.addScope('email')
          const result = await firebase.auth().signInWithPopup(provider)
          const user = result.user
          commit('setUser', {
            display_name: user?.displayName,
            email: user?.email,
            uid: user?.uid
          })
          commit('setAuthStatus', true)
          router.push('/home')
        } catch (error) {
          console.log(error)
        }
      } else {
        const user = await firebase.auth().currentUser
        commit('setUser', {
          display_name: user?.displayName,
          email: user?.email,
          uid: user?.uid
        })
        router.push('/home')
      }
    },
    async logout ({ commit }) {
      try {
        await firebase.auth().signOut()
        commit('setUser', {})
        commit('setAuthStatus', false)
        router.push('/')
      } catch (error) {
        console.log(error)
      }
    },
    async createAccount ({ state, commit }, payload) {
      if (!state.isAuthenticated) {
        try {
          const userCredential = await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
          const user = userCredential.user
          if (user) {
            await user.updateProfile({
              displayName: payload.name
            })
            commit('setUser', {
              display_name: user?.displayName,
              email: user?.email,
              uid: user?.uid
            })
            commit('setAuthStatus', true)
            router.push('/home')
          }
        } catch (error) {
          console.log(error)
        }
      } else {
        const user = await firebase.auth().currentUser
        commit('setUser', {
          display_name: user?.displayName,
          email: user?.email,
          uid: user?.uid
        })
        router.push('/home')
      }
    }
  },
  modules: {}
})
