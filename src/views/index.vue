<template>
    <div>
        <BlogPost :post="welcomeScreen" />
        <BlogPost :post="post" v-for="(post, index) in sampleBlogPost" :key="index" />
    </div>
</template>

<script>
import BlogPost from "../components/BlogPost.vue"
export default {
    components: { BlogPost },
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
            ]
        };
    },
}
</script>

<style scoped>
</style>