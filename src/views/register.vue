<template>
    <div class="form-wrap">
        <form action class="register">
            <p class="login-register">
                Already have an account?
                <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
            </p>
            <h2>Create Your FireBlog Account</h2>
            <div class="inputs">
                <div class="input">
                    <input type="text" placeholder="First Name" v-model="firstName" />
                    <i class="far fa-user icon"></i>
                </div>
                <div class="input">
                    <input type="text" placeholder="Last Name" v-model="lastName" />
                    <i class="far fa-user icon"></i>
                </div>
                <div class="input">
                    <input type="text" placeholder="Username" v-model="username" />
                    <i class="far fa-user icon"></i>
                </div>
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
            <button @click.prevent="register">Sign Up</button>
            <div class="angle"></div>
        </form>
        <div class="background"></div>
    </div>
</template>

<script>
import { firebaseAuth, firebaseFirestore } from '../firebase/firebaseInit';
export default {
    data() {
        return {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            error: null,
            errorMsg: ""
        }
    },
    methods: {
        async register() {
            if (this.firstName !== "" && this.lastName !== "" && this.username !== "" && this.email !== "" && this.password !== "") {
                this.error = false;
                this.errorMsg = "";
                const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.email, this.password);
                const result = await createUser;
                const dataBase = await firebaseFirestore.collection("users").doc(result.user.uid);
                await dataBase.set({
                    firstName: this.firstName,
                    lastName: this.lastName,
                    username: this.username,
                    email: this.email,
                });
                this.$router.push({ name: 'Home' });
                return;
            }
            this.error = true;
            this.errorMsg = "Please full out all the fields!";
            return;
        }
    },
}
</script>

<style scoped>
.register h2 {
    max-width: 350px;
}
</style>