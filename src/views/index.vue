<template>
    <div>
        <BlogPost :post="welcomeScreen" />
        <BlogPost :post="post" v-for="(post, index) in sampleBlogPost" :key="index" />
        <div class="blog-card-wrap">
            <div class="container">
                <h3>View More Recent Blogs</h3>
                <div class="blog-cards">
                    <BlogCard :post="post" v-for="(post, index) in sampleCards" :key="index" />
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
            sampleCards: [
                { blogTitle: "Blog Card #1", blogCoverPhoto: "stock-1", blogDate: "01/01/2022" },
                { blogTitle: "Blog Card #2", blogCoverPhoto: "stock-2", blogDate: "01/02/2022" },
                { blogTitle: "Blog Card #3", blogCoverPhoto: "stock-3", blogDate: "01/03/2022" },
                { blogTitle: "Blog Card #4", blogCoverPhoto: "stock-4", blogDate: "01/04/2022" },
            ]
        };
    },
}
</script>

<style scoped>
.blog-card-wrap h3 {
    font-weight: 400;
    font-style: 20px;
    margin-bottom: 32px;
}

.updates .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

@media (min-height: 800px) {
    .updates .container {
        padding: 125px 25px;
        flex-direction: row;
    }
}
</style>