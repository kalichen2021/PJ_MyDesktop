<template>
  <div id="app-icon" class="app-icon" ref="elAppIcon">
    <div class="wrap">
      <img :src="icon" alt="app-icon" />
      <span class="app-name">{{ name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Axis } from '@utils/DataType';
import { useAppIconLayoutStore } from '@store/AppIconLayout.ts';

import icon from '@assets/img/vue.svg';


const name = ref<string>('Vue');
const elAppIcon = ref<HTMLDivElement | null>(null);
const { AppContainerPaddingNum: __paddingNum } = useAppIconLayoutStore();

/**
 * onMounted: comp mounted mousedown event
 * onMouseDown: mouse down process: 
 *  - add mousemove event listener
 *  - add mouseup event listener
 * onMouseUp: mouse up process: 
 *  - remove mousemove event listener
 *  - remove mouseup event listener
*/
let startAxis: Axis = Axis(0, 0);
let direction: Axis = Axis(0, 0);
let endAxis: Axis = Axis(0, 0);
let currentAxis: Axis = Axis(0, 0);
let originAxis: Axis = Axis(0, 0);

const GetOriginDirection = () => {
  const parentRect = elAppIcon.value!.parentElement!.getBoundingClientRect()
  const itemRect = elAppIcon.value!.getBoundingClientRect()
  return Axis(
    itemRect.left - parentRect.left - __paddingNum,
    itemRect.top - parentRect.top - __paddingNum
  )
}

const GetNearNetAxis = (axis: Axis) => {
  // return axis.subtract(originAxis).divide(2).round(0).multiply(2).add(originAxis)
}
const onMouseDown = (e: MouseEvent) => {
  console.log('app-icon mouse down');
  startAxis = Axis(e.clientX, e.clientY);
  originAxis = GetOriginDirection()
  console.log({ startAxis });
  console.log({ originAxis });
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}
const onMouseMove = (e: MouseEvent) => {
  e.preventDefault();
  currentAxis = Axis(e.clientX, e.clientY);
  direction = currentAxis.add(originAxis).subtract(startAxis)

  // dragging animation
  elAppIcon.value!.style.transform = `
  translate(${direction.x}px, ${direction.y}px)
  `;
}
const onMouseUp = () => {
  // console.log('app-icon mouse up');
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
  endAxis = currentAxis;
  direction = currentAxis.add(originAxis).subtract(startAxis)
  console.log({ direction })

  elAppIcon.value!.style.transform = `translate(${direction.x}px, ${direction.y}px)`;

  // reset 
  startAxis = Axis(0, 0);
  direction = Axis(0, 0);
  endAxis = Axis(0, 0);
  currentAxis = Axis(0, 0);
}
onMounted(() => {
  elAppIcon.value?.addEventListener('mousedown', (e: MouseEvent) => {
    e.preventDefault();
    onMouseDown(e);
  });
});

</script>

<style scoped>
.app-icon {
  position: absolute;
}

.app-icon .wrap {
  display: flex;

  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
}

.app-icon {
  width: 3.2rem;
  height: 5rem;
}

.wrap {
  width: 3rem;
  height: 4.6rem;

  border-radius: .4rem;
}

.wrap:hover {
  background-color: rgb(24, 24, 24);
}

.wrap:focus {
  outline: none;
}

.app-icon img {
  width: 2.4rem;
  height: 2.4rem;
}

.app-icon .app-name {
  font-size: 1rem;
}
</style>