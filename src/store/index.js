import Vuex from 'vuex';
import { firebaseAuth, firebaseFirestore } from '../firebase/firebaseInit';


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
    user: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUserName: null,
    profileId: null,
    profileInitials: null
  },
  mutations: {
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },
    updateUser(state, payload) {
      state.user = payload;
    },
    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUserName = doc.data().username;
    },
    setProfileInitials(state) {
      state.profileInitials = state.profileFirstName.match(/(\b\S)?/g).join("") +
        state.profileLastName.match(/(\b\S)?/g).join("");
    }
  },
  actions: {
    async getCurrentUser({ commit }) {
      const dataBase = await firebaseFirestore.collection('users').doc(firebaseAuth.currentUser.uid);
      const dbResults = await dataBase.get();
      commit("setProfileInfo", dbResults);
      commit("setProfileInitials");
    },
  },
  getters: {

  }
})