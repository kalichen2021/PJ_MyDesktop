import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import { Vector } from "@utils/DataType";
import { WidgetInfo } from "@utils/widget";
// import { useDefaultConfigStore } from "@store/default";

// const defaultConfigStore = useDefaultConfigStore();
// const HtmlFontSize = computed(() => defaultConfigStore.HtmlFontSize);
const HtmlFontSize = ref("16px")

export const useAppIconLayoutStore = defineStore("appIconLayout", () => {
  const appIconLayout = ref("grid");
  const AppIconSize = ref<Vector>(new Vector(60, 80));

  // default unit: rem
  const AppContainerPadding = ref(".8rem");
  const AppContainerPaddingNum = computed(() =>
    Number(AppContainerPadding.value.replace("rem", ""))
  )

  const __AppContainerPaddingPx = computed(() =>
    AppContainerPaddingNum.value *
    Number(HtmlFontSize.value.replace("px", ""))
  )

  const AppGap = ref<Vector>(
    AppIconSize.value.add(0, __AppContainerPaddingPx.value)
  )
  const ContainerNet = ref<Array<Vector>>([])
  return {
    appIconLayout,
    AppIconSize,
    AppContainerPadding,
    AppContainerPaddingNum,
    __AppContainerPaddingPx,
    ContainerNet,
    AppGap,
  }
})

type order = `${number}`;
export const useAppIconItemInfoStore = defineStore("appIconItemLayoutInfo", () => {
  const appIconItemLayoutInfoDic = reactive<Record<string, WidgetInfo>>({});
  return {
    appIconItemLayoutInfoDic,
  }
})
