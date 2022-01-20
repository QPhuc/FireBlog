<template>
    <footer>
        <div class="container">
            <div class="left">
                <div class="col-1">
                    <router-link class="header" :to="{ name: 'Home' }">FireBlog</router-link>
                    <div class="nav-links">
                        <ul>
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
                <div class="col-2">
                    <ul>
                        <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
                        <router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
                        <router-link class="link" :to="{ name: 'Newpost' }">Create Post</router-link>
                        <router-link
                            v-if="!user"
                            class="link"
                            :to="{ name: 'Login' }"
                        >Login / Register</router-link>
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
    computed: {
        user() {
            return this.$store.state.user;
        }
    }
}
</script>

<style scoped>
footer {
    margin-top: auto;
    padding: 100px 25px;
    background-color: #303030;
}
.container {
    display: flex;
    flex-direction: column;
    gap: 32px;
    margin-left: 24px;
}

.container > div {
    display: flex;
    flex: 1;
}

.left {
    gap: 32px;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.header {
    font-size: 24px;
    color: #fff;
    text-decoration: none;
    font-weight: 600;
}

.container ul {
    gap: 16px;
    list-style: none;
    display: flex;
}

.col-1,
.col-2 {
    gap: 32px;
    display: flex;
    flex: 1;
}

.col-1 {
    flex-direction: column;
}

.col-1 .h2 {
    text-align: center;
}

.col-1 ul {
    margin-top: auto;
}

.col-1 li {
    display: flex;
    align-items: center;
}

.col-2 ul {
    height: 100%;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
}

.icon {
    width: 24px;
    height: auto;
    color: #fff;
}

.link {
    font-size: 16px;
    font-weight: 500;
    color: #fff;
    text-decoration: none;
}

.link:hover {
    text-decoration: underline;
}

p {
    margin-top: auto;
    margin-bottom: auto;
}

.right {
    gap: 32px;
    color: #fff;
    align-items: center;
    flex-direction: column;
}

@media (min-width: 800px) {
    .container {
        flex-direction: row;
        gap: 0;
    }

    .left {
        flex-direction: row;
        align-items: initial;
        gap: 0;
    }

    .col-1,
    .col-2 {
        gap: 0;
    }

    .col-1 .h2 {
        text-align: initial;
    }

    .col-2 ul {
        flex-direction: column;
    }

    .ritght {
        align-items: flex-end;
        gap: 0;
    }
}
</style>