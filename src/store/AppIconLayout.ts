import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { Vector } from "@utils/DataType";

export const useAppIconLayoutStore = defineStore("appIconLayout", () => {
  const appIconLayout = ref("grid");
  const AppIconSize = ref<Vector>(new Vector(100, 100))
  const AppContainerPadding = ref(".8rem");
  const AppContainerPaddingNum = computed(() =>
    Number(AppContainerPadding.value.replace("rem", "")) * 16)
  return {
    appIconLayout,
    AppIconSize,
    AppContainerPadding,
    AppContainerPaddingNum,
  }
})

