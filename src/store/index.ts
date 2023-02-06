import { createStore } from 'vuex'

export default createStore({
  state: {
    userUid: '' as string,
  },

  getters: {
  },

  mutations: {
    setUserUid(state: any, payload: any) {
      state.userUid = payload;
    },
  },

  actions: {
  },
  
  modules: {
  }
})
