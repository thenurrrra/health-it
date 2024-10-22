import "./assets/main.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { useCartStore } from "./stores/cart";
import { useFavoritesStore } from "./stores/favorites";
const app = createApp(App);

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
// Components

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "dark",
  },
});

app.use(createPinia());
app.use(router);
app.use(vuetify);
const cartStore = useCartStore();
cartStore.loadCart();
const favoritesStore = useFavoritesStore();
favoritesStore.loadFavs();
app.mount("#app");
