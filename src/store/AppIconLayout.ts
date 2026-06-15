import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useAppIconLayoutStore = defineStore("appIconLayout", () => {
  const appIconLayout = ref("grid");
  const AppContainerPadding = ref(".8rem");
  const AppContainerPaddingNum = computed(() =>
    Number(AppContainerPadding.value.replace("rem", "")) * 16)
  return {
    appIconLayout,
    AppContainerPadding,
    AppContainerPaddingNum,
  }
})

