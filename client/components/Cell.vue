<template>
  <div class="cell" @click="handleClick">{{ symbol }}</div>
</template>

<script setup>
import { inject, ref } from "vue";

const props = defineProps({
  index: Number,
  symbol: String,
});

const emit = defineEmits(["move"]);
const socket = inject("$socket");

const handleClick = () => {
  socket.emit("move", { index: props.index });
};
</script>

<style scoped>
.cell {
  width: 100px;
  height: 100px;
  border: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  cursor: pointer;
}
</style>
