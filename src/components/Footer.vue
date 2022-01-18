<template>
    <footer>
        <div class="container">
            <div class="left">
                <div class="col-1">
                    <router-link class="header" :to="{ name: 'Home' }">FireBlog</router-link>
                    <div class="nav-links">
                        <ul v-show="!mobile">
                            <li>
                                <a href="#" class="icon">
                                    <i class="fab fa-youtube"></i>
                                </a>
                                <a href="#" class="icon">
                                    <i class="fab fa-twitter"></i>
                                </a>
                                <a href="#" class="icon">
                                    <i class="fab fa-linkedin"></i>
                                </a>
                                <a href="#" class="icon">
                                    <i class="fab fa-instagram"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div name="col-2">
                    <ul>
                        <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
                        <router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
                        <router-link class="link" :to="{ name: 'Newpost' }">Create Post</router-link>
                        <router-link class="link" :to="{ name: 'Login' }">Login / Register</router-link>
                    </ul>
                </div>
            </div>
            <div class="right">
                <p>Copy right 2022 All Rights Reserved</p>
            </div>
        </div>
    </footer>
</template>

<script>
export default {

}
</script>

<style scoped>
</style>