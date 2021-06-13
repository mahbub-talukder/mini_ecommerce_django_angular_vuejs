import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: {
      items: [],
    },
    isAuthenticated: false,
    token: '',
    isLoading: false,
    showsnack :  false,
    snackduration : 2000,
    snackmsg : ''

  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem('cart')) {
        state.cart = JSON.parse(localStorage.getItem('cart'))
      } else {
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }

      if (localStorage.getItem('token')) {
          state.token = localStorage.getItem('token')
          state.isAuthenticated = true
      } else {
          state.token = ''
          state.isAuthenticated = false
      } 
    },
    addToCart(state, item) {
      const exists = state.cart.items.filter(i => i.id === item.id)
      if (exists.length) {
        exists[0].qty = parseInt(exists[0].qty) + parseInt(item.qty)
      } else {
        state.cart.items.push(item)
      }

      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    setIsLoading(state, status) {
      state.isLoading = status
    },
    setToken(state, token) {
      state.token = token
      state.isAuthenticated = true
    },  
    removeToken(state) {
      state.token = ''
      state.isAuthenticated = false
    },
    clearCart(state) {
    state.cart = { items: [] }

    localStorage.setItem('cart', JSON.stringify(state.cart))
  },
  },
  actions: {
  },
  modules: {
  }
})
