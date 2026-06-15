import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";

const pinia = createPinia();

createApp(App).use(pinia).mount("#app");

if (import.meta.hot) {
  import.meta.hot.on('vite:beforeUpdate', () => {
    console.clear();
  });
}