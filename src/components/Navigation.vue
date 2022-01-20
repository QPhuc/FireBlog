<template>
    <header>
        <nav class="container">
            <div class="branding">
                <router-link class="header" :to="{ name: 'Home' }">FireBlog</router-link>
            </div>
            <div class="nav-links">
                <ul v-show="!mobile">
                    <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
                    <router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
                    <router-link class="link" :to="{ name: 'Newpost' }">Create Post</router-link>
                    <router-link class="link" :to="{ name: 'Login' }">Login / Register</router-link>
                </ul>
                <div v-if="user" @click="toggleProfileMenu" class="profile" ref="profile">
                    <span>{{ this.$store.state.profileInitials }}</span>
                    <div v-show="profileMenu" class="profile-menu">
                        <div class="info">
                            <p class="initials">{{ this.$store.state.profileInitials }}</p>
                            <div class="right">
                                <p>{{ this.$store.state.profileFirstName }} {{ this.$store.state.profileLastName }}</p>
                                <p>{{ this.$store.state.profileUserName }}</p>
                                <p>{{ this.$store.state.profileEmail }}</p>
                            </div>
                        </div>
                        <div class="options">
                            <div class="option">
                                <router-link class="option" to="#">
                                    <i class="far fa-user icon"></i>
                                    <p>Profile</p>
                                </router-link>
                            </div>
                            <div class="option">
                                <router-link class="option" to="#">
                                    <i class="fas fa-users-cog icon"></i>
                                    <p>Admin</p>
                                </router-link>
                            </div>
                            <div @click="signOut" class="option">
                                <i class="fas fa-sign-out-alt icon"></i>
                                <p>Sign Out</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <i @click="toggleMobileNav" class="fas fa-bars menu-icon" v-show="mobile"></i>
        <transition name="mobile-nav">
            <ul class="mobile-nav" v-show="mobileNav">
                <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
                <router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
                <router-link class="link" :to="{ name: 'Newpost' }">Create Post</router-link>
                <router-link class="link" :to="{ name: 'Login' }">Login / Register</router-link>
            </ul>
        </transition>
    </header>
</template>

<script>
import { firebaseAuth } from '../firebase/firebaseInit';
export default {
    name: 'navigation',
    data() {
        return {
            profileMenu: null,
            mobile: null,
            mobileNav: null,
            windownWidth: null,
        }
    },
    created() {
        window.addEventListener('resize', this.checkScreen);
        this.checkScreen();
    },
    methods: {
        checkScreen() {
            this.windownWidth = window.innerWidth;
            if (this.windownWidth <= 750) {
                this.mobile = true;
                return;
            }
            this.mobile = false;
            this.mobileNav = false;
            return;
        },

        toggleMobileNav() {
            this.mobileNav = !this.mobileNav;
        },
        toggleProfileMenu(e) {
            if (e.target === this.$refs.profile) {
                this.profileMenu = !this.profileMenu;
            }
        },
        signOut() {
            firebaseAuth.signOut();
            window.location.reload();
        }
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    }
}
</script>

<style scoped>
header {
    background-color: #fff;
    padding: 0 25px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    z-index: 99;
}

header .link {
    font-weight: 500;
    padding: 0 8px;
    height: 48px;
    transition: 0.3 color ease;
}

header .link:hover {
    color: #1eb8b8;
}

nav {
    display: flex;
    padding: 0 25px;
}

.branding {
    display: flex;
    align-items: center;
    height: 48px;
}

.header {
    font-weight: 600;
    font-size: 26px;
    color: #000;
    text-decoration: none;
}

.nav-links {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
}

.nav-links ul {
    margin-right: 32px;
}

.link {
    margin-right: 32px;
}

.link:last-child {
    margin-right: 0;
}

.profile {
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: #fff;
    background-color: #303030;
}

.profile span {
    pointer-events: none;
}

.profile-menu {
    position: absolute;
    top: 60px;
    right: -16px;
    width: 250px;
    background-color: #303030;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.profile-menu::before {
    content: "";
    position: absolute;
    top: -32px;
    right: 16px;
    width: 0;
    height: 0;
    border-top: 15px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 32px solid #303030;
    border-left: 20px solid transparent;
}

.profile-menu .info {
    display: flex;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid #fff;
}

.initials {
    position: initial;
    width: 40px;
    height: 40px;
    background-color: #fff;
    color: #303030;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}

.right {
    flex: 1;
    margin-left: 24px;
}

.right:nth-child(1) {
    font-size: 14px;
}

.right:nth-child(2),
.right:nth-child(3) {
    font-size: 12px;
}

.options {
    padding: 15px;
}

.option {
    text-decoration: none;
    display: flex;
    color: #fff;
    align-items: inherit;
    margin-bottom: 12px;
}

.option .icon {
    width: 18px;
    height: auto;
}

.option p {
    font-size: 14px;
    margin-left: 12px;
}

.options:last-child {
    margin-bottom: 0;
}

.option:last-child {
    margin-bottom: 0;
}

.menu-icon {
    cursor: pointer;
    position: absolute;
    font-size: 32px;
    top: 8px;
    right: 25px;
    height: 25px;
    width: auto;
}

.mobile-nav {
    padding: 20px;
    width: 70%;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    background-color: #303030;
    top: 0;
    left: 0;
}

.mobile-nav .link {
    padding: 15px 0;
    color: #fff;
}

.mobile-nav-enter-active,
.mobile-nav-leave-active {
    transition: all 1s ease;
}

.mobile-nav-enter {
    transform: translateX(-250px);
}

.mobile-nav-enter-to {
    transform: translateX(0);
}

.mobile-nav-leave-to {
    transform: translateX(-250px);
}
</style>