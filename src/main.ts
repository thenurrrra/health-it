import "./assets/main.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { initializeApp } from "firebase/app";
import App from "./App.vue";
import router from "./router";
const firebaseConfig = {
  apiKey: "AIzaSyA8Cs4QJt5KXOTGBYxS4NPxt_3WzX4WuJU",
  authDomain: "healthit-db.firebaseapp.com",
  projectId: "healthit-db",
  storageBucket: "healthit-db.appspot.com",
  messagingSenderId: "905566198685",
  appId: "1:905566198685:web:c70ae4297a6b1645c42d74",
};
initializeApp(firebaseConfig);
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

app.mount("#app");
