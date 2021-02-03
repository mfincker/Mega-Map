import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    liveQuery: { query: null, entries: [] },
    markers: []
  },
  mutations: {
    setCurrentLiveQuery: (state, { entries, query }) => {
      state.liveQuery = { query, entries }
    },
    setCurrentMarkers: (state, payload) => {
      state.markers = payload
    }
  },
  getters: {
    getCurrentLiveQuery: (state) => {
      return state.liveQuery
    },
    getCurrentMarkers: (state) => {
      return state.markers
    }
  },
  actions: {},
  modules: {}
})
