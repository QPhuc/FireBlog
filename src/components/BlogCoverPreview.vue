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
.modal {
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.modal-content {
    display: flex;
    justify-content: center;
    position: relative;
    border-radius: 12px;
    background-color: #fff;
    height: 400px;
    width: 600px;
    padding: 50px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.icon {
    width: 24px;
    height: auto;
    cursor: pointer;
    font-size: 24px;
    position: absolute;
    top: 15px;
    color: #1eb8b8;
}

.modal-content img {
    margin-top: 16px;
    display: block;
    width: auto;
    height: 100%;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}
</style>