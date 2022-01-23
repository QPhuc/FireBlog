import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import './assets/styles/global.css';
import { firebaseAuth } from "@/firebase/firebaseInit";

let app;

firebaseAuth.onAuthStateChanged(() => {
    if (!app) {
        app = createApp(App);
        app.config.productionTip = false;
        app.use(router);
        app.use(store);

        app.mount("#app");
    }
})