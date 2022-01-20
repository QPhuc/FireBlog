<template>
  <div class="app-wrapper">
    <div class="app">
      <Navigation v-if="!navigation" />
      <router-view />
      <Footer />
    </div>
  </div>
</template>

<script>
import Navigation from './components/Navigation'
import Footer from './components/Footer'

import { firebaseAuth } from './firebase/firebaseInit';
export default {
  name: "app",
  components: { Navigation, Footer },
  data() {
    return {
      navigation: null,
    };
  },
  created() {
    firebaseAuth.onAuthStateChanged((user) => {
      this.$store.commit("updateUser", user);
      if (user) {
        this.$store.dispatch("getCurrentUser");
      }
    })

    this.checkRoute();
  },
  mounted() { },
  methods: {
    checkRoute() {
      if (this.$route.name === "Login" || this.$route.name === "Register" || this.$route.name === "ForgotPassword") {
        this.navigation = true;
        return;
      }
      this.navigation = false;
    }
  },
  watch: {
    $route() {
      this.checkRoute();
    }
  },
};
</script>

<style>
</style>
