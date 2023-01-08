import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import { Quasar } from "quasar";
import quasarLang from "quasar/lang/de";
import quasarIconSet from "quasar/icon-set/svg-material-icons";

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";

// Import Quasar css
import "quasar/src/css/index.sass";

const app = createApp(App);

app.use(router);

app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
  lang: quasarLang,
  iconSet: quasarIconSet,
});

app.mount("#app");
