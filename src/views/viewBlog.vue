<template>
    <div class="post-view">
        <div class="container quillWrapper">
            <h2>{{ this.currentBlog[0].blogTitle }}</h2>
            <h4>Posted on: {{ new Date(this.currentBlog[0].blogDate).toLocaleString('en-us', { dateStyle: "long" }) }}</h4>
            <img :src="this.currentBlog[0].blogCoverPhoto" alt />
            <div class="post-content ql-editor" v-html="this.currentBlog[0].blogHTML"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentBlog: null,
        }
    },
    async beforeMount() {
        this.currentBlog = await this.$store.state.blogPosts.filter(post => {
            return post.blogId === this.$route.params.blogid;
        });
        console.log(this.currentBlog);
    }
}
</script>

<style scoped>
.post-view {
    min-height: 100%;
}

.container {
    max-width: 1000px;
    padding: 60px 25px;
}

.post-view h2 {
    margin-bottom: 16px;
    font-weight: 300;
    font-size: 32px;
}

.post-view h4 {
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 24px;
}

.post-view img {
    width: 100%;
    margin-bottom: 32px;
}
</style>