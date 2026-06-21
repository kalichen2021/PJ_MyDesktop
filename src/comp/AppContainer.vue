<template>
  <div class="app-container">
    <AppIcon v-for="(item, i) in ContainerNet" :key="i" :origin-position="item" :id="i.toString()" />
  </div>
</template>

<script setup lang="ts">
import AppIcon from '@widget/AppIcon.vue';
import { useAppIconLayoutStore, useAppIconItemInfoStore } from '@store/AppIconLayout';
import { Vector } from "@utils/DataType";
import { onBeforeMount, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

const AILStore = useAppIconLayoutStore();
const AIISStore = useAppIconItemInfoStore();

const {
  AppContainerPaddingNum: __padding,
  ContainerNet,
  AppGap
} = storeToRefs(AILStore);


const initContainerNet = (width: number, height: number) => {
  console.log(AppGap.value.x)
  for (let i = 0; i < width / AppGap.value.x; i += 1) {
    for (let j = 0; j < height / AppGap.value.y; j += 1) {
      ContainerNet.value.push(new Vector(i * AppGap.value.x, j * AppGap.value.y))
    }
  }
}
const a_s_d = 1
console.log(a_s_d)
const loadAppIconItemLayoutInfoDic = () => {
  for (let i = 0; i < ContainerNet.value.length; i += 1) {
    const item = ContainerNet.value[i];
    AIISStore.appIconItemLayoutInfoDic[i.toString()] = {
      position_id: item,
      size_id: new Vector(1, 1),
      position: item,
      size: new Vector(1, 1),
      name: item.toString(),
    }
  }
}

onMounted(() => {

  const w = window.innerWidth;
  const h = window.innerHeight;
  initContainerNet(w, h);
  console.log(ContainerNet.value[9])
  loadAppIconItemLayoutInfoDic();
})


</script>

<style scoped>
.app-container {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgb(35, 35, 35);
  color: #fff;

  /* display: flex;
  flex-flow: column wrap;
  align-items: flex-start;
  justify-content: flex-start; */

  padding: v-bind(__padding);

}
</style>