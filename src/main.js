import { createApp } from "vue";
import App from "./App.vue";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Твои компоненты
import BackgroundSVG from "./components/BackgroundSVG.vue";
import MyHeader from "./components/Header.vue";
import BaseButton from "./components/BaseButton.vue";
import BaseInput from "./components/BaseInput.vue";
import BaseCheckbox from "./components/BaseCheckbox.vue";
import BaseSlider from "./components/BaseSlider.vue";
import BaseTooltip from "./components/BaseTooltip.vue";
import CopyButton from "./components/CopyButton.vue";
import SaveButton from "./components/SaveButton.vue";
import InfoWindow from "./components/InfoWindow.vue";
import "./styles/main.css";
import "./styles/variables.css";

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

// Глобальная регистрация кастомных компонентов
app.component("BackgroundSVG", BackgroundSVG);
app.component("MyHeader", MyHeader);
app.component("BaseButton", BaseButton);
app.component("BaseInput", BaseInput);
app.component("BaseCheckbox", BaseCheckbox);
app.component("BaseSlider", BaseSlider);
app.component("BaseTooltip", BaseTooltip);
app.component("CopyButton", CopyButton);
app.component("SaveButton", SaveButton);
app.component("InfoWindow", InfoWindow);

app.use(vuetify).mount("#app");

