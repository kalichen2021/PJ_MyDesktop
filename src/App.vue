<template>
  <div id="app">
    <AppContainer />
    <TaskBar />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import AppContainer from '@comp/AppContainer.vue';
import TaskBar from '@comp/TaskBar.vue';

onMounted(() => {
  console.clear();
})
</script>

<style>
@import './assets/css/default.css';

#app {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
