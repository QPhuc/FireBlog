import Vuex from 'vuex';

export default new Vuex.Store({
  modules: {

  },
  state: {
    sampleBlogCards: [
      { blogTitle: "Blog Card #1", blogCoverPhoto: "stock-1", blogDate: "01/01/2022" },
      { blogTitle: "Blog Card #2", blogCoverPhoto: "stock-2", blogDate: "01/02/2022" },
      { blogTitle: "Blog Card #3", blogCoverPhoto: "stock-3", blogDate: "01/03/2022" },
      { blogTitle: "Blog Card #4", blogCoverPhoto: "stock-4", blogDate: "01/04/2022" },
    ],
    editPost: null,
  },
  mutations: {
    toggleEditPost(state, payload) {
      state.editPost = payload;
    }
  },
  actions: {

  },
  getters: {

  }
})