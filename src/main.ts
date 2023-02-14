import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Storage from "./plugins/Storage";
import "../src/assets/styles/main.css";
// import "../src/assets/variables.css";
import "@/firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

createApp(App).use(store).use(Storage).use(router).mount("#app");
