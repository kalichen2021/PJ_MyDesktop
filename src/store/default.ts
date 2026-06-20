import { defineStore } from "pinia";
import { ref } from "vue";


export const useDefaultConfigStore = defineStore("defaultConfig", () => {
  const HtmlFontSize = ref("16px");

  return {
    HtmlFontSize,
  }
})