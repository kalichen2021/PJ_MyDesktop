<template>
  <div class="app-container">
    <AppIcon />
    <AppIcon />
    <AppIcon />
    <AppIcon />
    <AppIcon />
    <AppIcon />
  </div>
</template>

<script setup lang="ts">
import AppIcon from '@widget/AppIcon.vue';
import { useAppIconLayoutStore } from '@store/AppIconLayout';
import { Vector } from "@utils/DataType";
import { onMounted } from 'vue';

const {
  AppContainerPaddingNum: __padding,
  ContainerNet,
  AppGap
} = useAppIconLayoutStore();


const InitContainerNet = (width: number, height: number) => {
  console.log(AppGap.x)
  for (let i = 0; i < width / AppGap.x; i += 1) {
    for (let j = 0; j < height / AppGap.y; j += 1) {
      ContainerNet.push(new Vector(i * AppGap.x, j * AppGap.y))
    }
  }
}

onMounted(() => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  InitContainerNet(w, h);
  console.log(ContainerNet[1],)

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