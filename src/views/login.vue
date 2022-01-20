<template>
    <div class="form-wrap">
        <form action class="login">
            <p class="login-register">
                Don't have an account?
                <router-link class="router-link" :to="{ name: 'Register' }">Register</router-link>
            </p>
            <h2>Login to FireBlog</h2>
            <div class="inputs">
                <div class="input">
                    <input type="text" placeholder="Email" v-model="email" />
                    <i class="far fa-envelope icon"></i>
                </div>
                <div class="input">
                    <input type="password" placeholder="Password" v-model="password" />
                    <i class="fas fa-lock icon"></i>
                </div>
                <div v-show="error" class="error">{{ this.errorMsg }}</div>
            </div>
            <router-link
                class="forgot-password"
                :to="{ name: 'ForgotPassword' }"
            >Forgot your password ?</router-link>
            <button @click.prevent="signIn">Sign In</button>
            <div class="angle"></div>
        </form>
        <div class="background"></div>
    </div>
</template>

<script>
import { firebaseAuth } from '../firebase/firebaseInit';
export default {
    data() {
        return {
            email: null,
            password: null,
            error: null,
            errorMsg: ""
        }
    },
    methods: {
        signIn() {
            firebaseAuth.signInWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    this.$router.push({ name: 'Home' });
                    this.error = false;
                    this.errorMsg = "";
                }).catch(err => {
                    this.error = true;
                    this.errorMsg = err.message;
                });
        }
    },
}
</script>

<style>
</style>