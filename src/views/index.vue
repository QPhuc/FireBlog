<template>
    <div>
        <BlogPost :post="welcomeScreen" />
        <BlogPost :post="post" v-for="(post, index) in sampleBlogPost" :key="index" />
        <div class="blog-card-wrap">
            <div class="container">
                <h3>View More Recent Blogs</h3>
                <div class="blog-cards">
                    <BlogCard :post="post" v-for="(post, index) in sampleBlogCards" :key="index" />
                </div>
            </div>
        </div>
        <div class="updates">
            <div class="container">
                <h2>Never miss a post. Register for your account today!</h2>
                <router-link class="router-button" to="#">
                    Register for FireBlog
                    <i class="fas fa-arrow-right arrow arrow-light"></i>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import BlogPost from "../components/BlogPost.vue"
import BlogCard from "../components/BlogCard.vue";
export default {
    components: { BlogPost, BlogCard },
    data() {
        return {
            welcomeScreen: {
                title: "Welcome!",
                blogPost: "Weekly blog articles with all things programming including HTML, CSS, JavaScript and more.",
                welcomeScreen: true,
                photo: "coding",
            },
            sampleBlogPost: [
                {
                    title: "This is  a Filter Title!",
                    blogHTML: "This is a filter blog post title!",
                    blogCoverPhoto: "beautiful-stories",
                },
                {
                    title: "This is  a Filter Title2!",
                    blogHTML: "This is a filter blog post title!",
                    blogCoverPhoto: "designed-for-everyone",
                },
            ],
        };
    },
    computed: {
        sampleBlogCards() {
            return this.$store.state.sampleBlogCards;
        }
    }
}
</script>

<style scoped>
.blog-card-wrap .container h3 {
    font-weight: 400;
    font-size: 25px;
    margin-bottom: 32px;
}

.updates .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.router-button {
    display: flex;
    font-size: 14px;
    text-decoration: none;
}

.updates .container h2 {
    font-weight: 300;
    font-size: 32px;
    max-width: 425px;
    width: 100%;
    text-align: center;
    text-transform: uppercase;
}

@media (min-width: 800px) {
    .updates .container {
        padding: 125px 120px;
        flex-direction: row;
    }

    .router-button {
        margin-left: auto;
    }

    .updates .container h2 {
        text-align: initial;
        font-size: 40px;
    }
}
</style>