<template>
    <div class="reset-password">
        <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" />
        <Loading v-if="loading" />
        <div class="form-wrap">
            <form action class="reset">
                <div class="login-register">
                    Back to
                    <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
                </div>
                <h2>Reset Password</h2>
                <p>Forgot your password? Enter your email to reset it</p>
                <div class="inputs">
                    <div class="input">
                        <input type="text" placeholder="Email" v-model="email" />
                        <i class="far fa-envelope icon"></i>
                    </div>
                </div>
                <button @click.prevent="resetPassword">Reset</button>
                <div class="angle"></div>
            </form>
            <div class="background"></div>
        </div>
    </div>
</template>

<script>
import Modal from "../components/Modal.vue";
import Loading from "../components/Loading.vue";

import { firebaseAuth } from '../firebase/firebaseInit';
export default {
    components: { Modal, Loading },
    data() {
        return {
            email: null,
            modalActive: false,
            modalMessage: "",
            loading: null,
        }
    },
    methods: {
        resetPassword() {
            this.loading = true;
            firebaseAuth.sendPasswordResetEmail(this.email).then(() => {
                this.modalMessage = "If your account exists, you will receive a email";
                this.loading = false;
                this.modalActive = true;
            }).catch(err => {
                this.modalMessage = err.message;
                this.loading = false;
                this.modalActive = true;
            });
        },
        closeModal() {
            this.modalActive = !this.modalActive;
            this.email = "";
        }
    },
}
</script>

<style scoped>
.reset-password {
    position: relative;
}

.form-wrap .reset h2 {
    margin-bottom: 8px;
}

.form-wrap .reset p {
    text-align: center;
    margin-bottom: 32px;
}
</style>