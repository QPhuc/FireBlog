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
                <button @click="uploadBlog">Publish Blog</button>
                <router-link class="router-button" :to="{ name: 'BlogPreview' }">Post Preview</router-link>
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
            loading: null,
            editorOption: {
                modules: {
                    imageResize: {
                        displayStyles: {
                            backgroundColor: 'black',
                            border: 'none',
                            color: 'white'
                        },
                        modules: ['Resize', 'DisplaySize', 'Toolbar']
                    },
                },
            },
            //     toolbar:
            //     {
            //         container: [                          // Toolbar configuration, default is all
            //             ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            //             ['blockquote', 'code-block'],

            //             [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            //             [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            //             [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            //             [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            //             [{ 'direction': 'rtl' }],                         // text direction

            //             [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            //             [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            //             [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            //             [{ 'font': [] }],
            //             [{ 'align': [] }],

            //             ['clean'],
            //             ['image'],
            //             [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            //         ],
            //     }
        }
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
        uploadBlog() {
            if (this.blogTitle.lenght !== 0 && this.blogHTML.lenght !== 0) {
                if (this.file) {
                    this.loading = true;
                    console.log(this.file);
                    console.log(this.$store.state.blogPhotoName);
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
                            const timestamp = await Date.now();
                            const dataBase = await firebaseFirestore.collection("blogPosts").doc();

                            await dataBase.set({
                                blogId: dataBase.id,
                                blogHTML: this.blogHTML,
                                blogCoverPhoto: downloadURL,
                                blogCoverPhotoName: this.blogCoverPhotoName,
                                blogTitle: this.blogTitle,
                                profileId: this.profileId,
                                date: timestamp
                            });
                            await this.$store.dispatch("getPost");
                            this.loading = false;
                            this.$router.push({ name: 'ViewBlog', params: { blogid: dataBase.id } });
                        }
                    )
                    return;
                }
                this.error = true;
                this.errorMsg = "Please ensure you upload a cover photo!"
                setTimeout(() => {
                    this.error = false;
                }, 5000)
            }
            this.error = true;
            this.errorMsg = "Please ensure Blog Title & Blog Post has been filled!"
            setTimeout(() => {
                this.error = false;
            }, 5000)
        }
        // imageHandler(file, Editor, cursorLocation, resetUploader) {
        //     const storageRef = firebaseFirestore.ref();
        //     const docRef = storageRef.child(`documents/blogPostPhotos/${file.name}`);
        //     docRef.put(file).on("state_changed", (snapshot) => {
        //         console.log(snapshot);
        //     }, (err) => {
        //         console.log(err);
        //     }, async () => {
        //         const downloadURL = await docRef.getDownloadURL();
        //         Editor.insertEmbed(cursorLocation, "image", downloadURL);
        //         resetUploader();
        //     })
        // }
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