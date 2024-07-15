// plugins/socket.io.js
import { io } from "socket.io-client";

export default defineNuxtPlugin(({ vueApp: { config, provide } }) => {
  const socket = io("http://localhost:3003", {});
  provide("$socket", socket);
});
