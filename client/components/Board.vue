<template lang="pug">
  div.title {{ message }}
  div(class="board")
    Cell(v-for="[index, value] of board.entries()" :key="index" :index="index" :symbol="value")
</template>

<script setup>
import { ref, inject, onMounted } from "vue";
import Cell from "./Cell.vue";

const board = reactive(Array(9).fill(null));
const socket = inject("$socket");
const message = ref("searching...");

const updateBoard = (newBoard) => {
  for (const [i, v] of newBoard.entries()) {
    board[i] = v;
  }
  board.value = newBoard;
};

onMounted(() => {
  socket.on("game.update", (data) => {
    if (data && data.board) {
      updateBoard(data.board);
    }
  });

  socket.on("connect", () => {
    message.value = "Connected!";
  });

  socket.on("message", (data) => {
    message.value = data.text;
  });

  socket.on("game.done", (data) => {
    message.value = data.text;
  });
});
</script>

<style scoped>
.title {
  margin-bottom: 20px;
}
.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: fit-content;
}
</style>
