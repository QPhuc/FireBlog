import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vue2Editor from "vue2-editor";


let app;

app = createApp(App);
app.config.productionTip = false;
app.use(router);
app.use(store);
app.use(Vue2Editor);

app.mount("#app");
