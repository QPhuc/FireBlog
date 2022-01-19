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
</style>