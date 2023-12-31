import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import Home from "./pages/Home.vue";
import ProductDetail from "./pages/ProductDetail.vue";
import { createRouter, createWebHistory } from "vue-router";
import "mdb-vue-ui-kit/css/mdb.min.css";
import "./style.css";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/vite-ms/", component: Home, name: "home" },
    { path: "/vite-ms/:productId", component: ProductDetail, name: "product-detail" },
  ],
});

loadFonts();

createApp(App).use(vuetify).use(router).mount("#app");
