export const state = () => ({
  user: localStorage.getItem('tokutestLocalStrage') === null ? null : JSON.parse(localStorage.getItem('tokutestLocalStrage')).Account.user,
  info: null,
})

 export const mutations = {
  setUser (state, payload) {
    if (payload) {
      state.user = payload
    } else {
      state.user = null
    }
  },
  clearUser (state) {
    state.user = null
  },
  setInfo (state, payload) {
    if (payload) {
      state.info = payload
    } else {
      state.info = null
    }
  },
}

export const actions = {
  setUser ({ commit }, payload) {
    commit('setUser', payload)
  },
  crearUser ({ commit }) {
    commit('clearUser')
  },
  setInfo ({ commit }, payload) {
    commit('setInfo', payload)
  },
}

export const getters = {
  user: state => {
    return state.user
  },
  info: state => {
    return state.info
  },
}

