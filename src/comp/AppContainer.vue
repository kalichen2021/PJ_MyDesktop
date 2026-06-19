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

const { AppContainerPadding: __padding } = useAppIconLayoutStore();


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