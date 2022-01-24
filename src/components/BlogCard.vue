<template>
    <div class="blog-card">
        <div v-show="editPost" class="icons">
            <div class="icon">
                <i class="far fa-edit edit"></i>
            </div>
            <div class="icon">
                <i class="far fa-trash-alt delete"></i>
            </div>
        </div>
        <img :src="post.blogCoverPhoto" alt />
        <div class="info">
            <h4>{{ post.blogTitle }}</h4>
            <h6>Posted on: {{ new Date(post.blogDate).toLocaleString('en-us', { dateStyle: "long" }) }}</h6>
            <router-link class="link" to="#">
                View The Post
                <i class="fas fa-arrow-right arrow"></i>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    props: ["post"],
    computed: {
        editPost() {
            return this.$store.state.editPost;
        }
    }
}
</script>

<style scoped>
.blog-card {
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    min-height: 420px;
    transition: 0.5s ease all;
}

.blog-card:hover {
    transform: rotateZ(-1deg) scale(1.01);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.icons {
    display: flex;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 30;
}

.icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-color: #fff;
    transition: 0.5s ease all;
}

.icon:hover {
    background-color: #303030;
}

.icon:hover .edit,
.icon:hover .delete {
    color: #fff;
}

.icon:nth-child(1) {
    margin-right: 8px;
}

.edit,
.delete {
    pointer-events: none;
    height: 15px;
    width: auto;
}

.blog-card img {
    display: block;
    border-radius: 8px 8px 0 0;
    z-index: 1;
    width: 100%;
    min-height: 200px;
    object-fit: cover;
}

.info {
    display: flex;
    flex-direction: column;
    height: 100%;
    z-index: 3;
    padding: 32px 16px;
    color: #000;
}

.info h4 {
    padding-bottom: 8px;
    font-size: 20px;
    font-weight: 300;
}

.info h6 {
    font-weight: 400;
    font-size: 12px;
    padding-bottom: 16px;
}

.link {
    display: inline-flex;
    align-items: center;
    margin-top: auto;
    font-weight: 500;
    padding-top: 20px;
    font-size: 12px;
    padding-bottom: 4px;
    transition: 0.5s ease-in all;
}

.link:hover {
    color: rgba(48, 48, 48, 0.8);
}

.arrow {
    width: 10px;
}
</style>