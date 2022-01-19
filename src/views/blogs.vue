<template>
    <div class="blog-card-wrap">
        <div class="blog-cards container">
            <div class="toggle-edit">
                <span>Toggle Editting Post</span>
                <input type="checkbox" v-model="editPost" />
            </div>
            <BlogCard :post="post" v-for="(post, index) in sampleBlogCards" :key="index" />
        </div>
    </div>
</template>

<script>
import BlogCard from "../components/BlogCard.vue";
export default {
    components: { BlogCard },
    computed: {
        sampleBlogCards() {
            return this.$store.state.sampleBlogCards;
        }
    }
}
</script>

<style scoped>
.blog-cards {
    position: relative;
}

.toggle-edit {
    display: flex;
    align-items: center;
    position: absolute;
    top: -70px;
    right: 0;
}

.toggle-edit span {
    margin-right: 16px;
}

input[type="checkbox"] {
    position: relative;
    border: none;
    -webkit-appearance: none;
    background-color: #fff;
    outline: none;
    width: 80px;
    height: 30px;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

input[type="checkbox"]::before {
    content: "";
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 20px;
    top: 0;
    left: 0;
    background: #303030;
    transform: scale(1.1);
    transition: 750ms ease all;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

input:checked[type="checkbox"]::before {
    background: #fff;
    left: 52px;
}
</style>