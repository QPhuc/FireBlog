<template>
    <div class="create-post">
        <BlogCoverPreview v-show="this.$store.state.blogPhotoPreview" />
        <Loading v-show="loading" />
        <div class="container">
            <div :class="{ invisible: !error }" class="err-message">
                <p>
                    <span>Error:</span>
                    {{ this.errorMsg }}
                </p>
            </div>
            <div class="blog-info">
                <input type="text" placeholder="Enter Blog Title" v-model="blogTitle" />
                <div class="upload-file">
                    <label for="blog-photo">Update Cover Photo</label>
                    <input
                        type="file"
                        ref="blogPhoto"
                        id="blog-photo"
                        @change="fileChange"
                        accept=".png, .jpg, .jpeg"
                    />
                    <button
                        @click="openPreview"
                        class="preview"
                        :class="{ 'button-inactive': !this.$store.state.blogPhotoFileURL }"
                    >Preview Photo</button>
                    <span>File Chosen: {{ this.$store.state.blogPhotoName }}</span>
                </div>
            </div>
            <div class="editor">
                <QuillEditor
                    id="editor-container"
                    :options="editorOption"
                    v-model:content="blogHTML"
                    contentType="html"
                    theme="snow"
                    toolbar="full"
                />
            </div>
            <div class="blog-actions">
                <button @click="updateBlog">Save Changes</button>
                <router-link class="router-button" :to="{ name: 'BlogPreview' }">Preview Changes</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import BlogCoverPreview from '../components/BlogCoverPreview.vue';
import Loading from '../components/Loading.vue';

import firebase from "firebase/compat/app"
import { firebaseFirestore } from '../firebase/firebaseInit';
import "firebase/compat/storage";

import Quill from 'quill';
window.Quill = Quill;
import { QuillEditor } from '@vueup/vue-quill'
const ImageResize = require('quill-image-resize-module').default;
Quill.register('modules/imageResize', ImageResize);
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
    components: { QuillEditor, BlogCoverPreview, Loading },
    data() {
        return {
            file: null,
            error: null,
            errorMsg: null,
            load: null,
            loading: null,
            routeId: null,
            currentBlog: null,
            editorOption: {
                modules: {
                    imageResize: {},
                },
            },
        }
    },
    beforeCreate() {
        this.routeId = this.$route.params.blogid;
        this.currentBlog = this.$store.state.blogPosts.filter(post => {
            return post.blogId === this.$route.params.blogid;
        });
        this.$store.commit("setBlogState", this.currentBlog[0]);
    },
    methods: {
        fileChange() {
            this.file = this.$refs.blogPhoto.files[0];
            const fileName = this.file.name;
            this.$store.commit("fileNameChange", fileName);
            this.$store.commit("createFileURL", URL.createObjectURL(this.file));
        },
        openPreview() {
            this.$store.commit("openPhotoPreview");
        },
        async updateBlog() {
            if (this.blogTitle.lenght !== 0 && this.blogHTML.lenght !== 0) {
                const dataBase = firebaseFirestore.collection('blogPosts').doc(this.$route.params.blogid);
                if (this.file) {
                    this.loading = true;
                    const storageRef = firebase.storage().ref();
                    const docRef = storageRef.child(`documents/BlogCoverPhotos/${this.$store.state.blogPhotoName}`);
                    docRef.put(this.file).on(
                        "state_changed",
                        (snapshot) => {
                            console.log(snapshot);
                        },
                        (err) => {
                            console.log(err);
                            this.loading = false;
                        }, async () => {
                            const downloadURL = await docRef.getDownloadURL();

                            await dataBase.set({
                                blogHTML: this.blogHTML,
                                blogCoverPhoto: downloadURL,
                                blogCoverPhotoName: this.blogCoverPhotoName,
                                blogTitle: this.blogTitle,
                                profileId: this.profileId,
                            });
                            await this.$store.dispatch("updatePost", this.routeId);
                            this.loading = false;
                            this.$router.push({ name: 'ViewBlog', params: { blogid: dataBase.id } });
                        }
                    )
                    return;
                }
                this.loading = true;
                await dataBase.update({
                    blogHTML: this.blogHTML,
                    blogTitle: this.blogTitle,
                });
                await this.$store.dispatch("updatePost", this.routeId);
                this.loading = false;
                let refetch = await this.$router.resolve({ name: 'ViewBlog', params: { blogid: dataBase.id } });
                window.location.assign(refetch.href);
                return;
            }
            this.error = true;
            this.errorMsg = "Please ensure Blog Title & Blog Post has been filled!"
            setTimeout(() => {
                this.error = false;
            }, 5000)
        }
    },
    computed: {
        profileId() {
            return this.$store.state.profileId;
        },
        blogCoverPhotoName() {
            return this.$store.state.blogPhotoName;
        },
        blogTitle: {
            get() {
                return this.$store.state.blogTitle;
            },
            set(payload) {
                this.$store.commit("updateBlogTitle", payload);
            }
        },
        blogHTML: {
            get() {
                return this.$store.state.blogHTML;
            },
            set(payload) {
                this.$store.commit("newBlogPost", payload);
            }
        },
    }
}
</script>

<style scoped>
.create-post {
    position: relative;
    height: 100%;
}

.create-post button {
    margin-top: 0;
}

.router-button {
    text-decoration: none;
    color: #fff;
    margin-left: 16px;
}

.create-post,
.create-post label,
.create-post button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #303030;
    background-color: #fff;
    text-decoration: none;
}

.create-post:hover,
.create-post label:hover,
.create-post button:hover {
    background-color: rgba(48, 48, 48, 0.1);
}

.container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
}

/* error styling */
.invisible {
    opacity: 0 !important;
}

.err-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5 ease all;
}

.err-message p {
    font-size: 14px;
}

.err-message span {
    font-weight: 600;
}

.blog-info {
    display: flex;
    margin-bottom: 32px;
}

.blog-info input:nth-child(1) {
    min-width: 300px;
}

.blog-info input {
    transition: 0.5s ease-in-out all;
    padding: 10px 4px;
    border: none;
    border-bottom: 1px solid #303030;
}

.blog-info input:focus {
    outline: none;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.upload-file {
    flex: 1;
    margin-left: 16px;
    position: relative;
    display: flex;
}

.upload-file input {
    display: none;
}

.upload-file label,
.upload-file button,
.blog-actions button {
    color: #fff;
    background-color: #303030;
}

.upload-file span {
    display: flex;
    align-items: center;
    font-size: 13px;
    margin-left: 16px;
}

.upload-file label:hover,
.upload-file button:hover,
.blog-actions button:hover {
    background-color: rgba(48, 48, 48, 0.7);
}

.preview {
    margin: 0 16px;
    text-transform: initial;
}

.blog-actions {
    margin-top: 90px;
}

.editor {
    height: 47vh;
    display: flex;
    flex-direction: column;
}

.ql-editor {
    padding: 20px 16px 30px;
}
</style>