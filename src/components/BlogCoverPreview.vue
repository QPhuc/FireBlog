<template>
    <div class="modal" ref="modal">
        <div class="modal-content">
            <i @click="closePreview" class="far fa-times-circle icon"></i>
            <img :src="this.blogCoverPhoto" alt />
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        closePreview() {
            this.$store.commit("openPhotoPreview");
        }
    },
    computed: {
        blogCoverPhoto() {
            return this.$store.state.blogPhotoFileURL;
        }
    }
}
</script>

<style scoped>
</style>