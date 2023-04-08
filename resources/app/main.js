import Vue from "vue";
import router from "./router";
import store from "./store";
import "./global-components";
import "./utils";
import "./libs";

// Midone Theme
import "./assets/sass/app.scss";

Vue.config.productionTip = false;

new Vue({
    router,
    store
}).$mount("#app");
