import { defineStore } from "pinia";
import { ref } from "vue";
import type { AppearanceMetric } from "@utils/DataType";
import { Metrics } from "@utils/DataType";


export const useDefaultConfigStore = defineStore("defaultConfig", () => {
  const HtmlFontSize = ref<Metrics<"px">>(Metrics<"px">("16px"));

  return {
    HtmlFontSize,
  }
})