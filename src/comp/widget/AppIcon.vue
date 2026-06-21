<template>
  <div id="app-icon" class="app-icon" ref="elAppIcon">
    <div class="wrap">
      <img :src="icon" alt="app-icon" />
      <span class="app-name">{{ name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { Vector, UnitVector } from '@utils/DataType';
import { useAppIconLayoutStore, useAppIconItemInfoStore } from '@store/AppIconLayout';

import icon from '@assets/img/vue.svg';


const props = defineProps({
  OriginPosition: {
    type: Vector,
    default: () => new Vector(0, 0)
  },
  id: {
    type: String,
    default: ''
  }
})


const name = ref<string>('Vue');
const elAppIcon = ref<HTMLDivElement | null>(null);
const { AppContainerPaddingNum: __paddingNum } = useAppIconLayoutStore();
const AIISStore = useAppIconItemInfoStore();
const itemPositionId = computed(() => AIISStore.appIconItemLayoutInfoDic[props.id].position_id)
console.log(props.id, itemPositionId.value)

/**
 * onMounted: comp mounted mousedown event
 * onMouseDown: mouse down process: 
 *  - add mousemove event listener
 *  - add mouseup event listener
 * onMouseUp: mouse up process: 
 *  - remove mousemove event listener
 *  - remove mouseup event listener
*/
let startVector: Vector = new Vector(0, 0);
let direction: Vector = new Vector(0, 0);
let endVector: Vector = new Vector(0, 0);
let currentVector: Vector = new Vector(0, 0);
let originVector: Vector = new Vector(0, 0);

const tran = ref<Vector>(itemPositionId.value);
const tranU = computed(() => new UnitVector(tran.value, 'px'))

tran.value = itemPositionId.value;

const GetOriginDirection = () => {
  const parentRect = elAppIcon.value!.parentElement!.getBoundingClientRect()
  const itemRect = elAppIcon.value!.getBoundingClientRect()
  return new Vector(
    itemRect.left - parentRect.left - __paddingNum,
    itemRect.top - parentRect.top - __paddingNum
  )
}

const GetNearNetVector = (vector: Vector) => {
  // return vector.subtract(originVector).divide(2).round(0).multiply(2).add(originVector)
}
const onMouseDown = (e: MouseEvent) => {
  console.log('app-icon mouse down');
  startVector = new Vector(e.clientX, e.clientY);
  originVector = GetOriginDirection()
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}
const onMouseMove = (e: MouseEvent) => {
  e.preventDefault();
  currentVector = new Vector(e.clientX, e.clientY);
  direction = currentVector.add(originVector).subtract(startVector)

  // dragging animation
  // elAppIcon.value!.style.transform = `
  // translate(${direction.x}px, ${direction.y}px)`;
  tran.value.x = direction.x
  tran.value.y = direction.y
}
const onMouseUp = () => {
  // console.log('app-icon mouse up');
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
  endVector = currentVector;
  direction = currentVector.add(originVector).subtract(startVector)

  // elAppIcon.value!.style.transform = `translate(${direction.x}px, ${direction.y}px)`;
  tran.value.x = direction.x
  tran.value.y = direction.y

  // reset 
  startVector = new Vector(0, 0);
  direction = new Vector(0, 0);
  endVector = new Vector(0, 0);
  currentVector = new Vector(0, 0);
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
  transform: translate(v-bind('tranU.x'), v-bind('tranU.y'));
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