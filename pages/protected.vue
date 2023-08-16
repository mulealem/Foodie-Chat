<template>
  <div>This is protected page</div>
  <button @click="method1()">Send 1</button>
  <button @click="method2()">Send 2</button>
</template>
<script>
import io from "socket.io-client";
const socket = io("http://localhost:3007");
export default {
  name: "ProtectedPage",
  mounted() {
    socket.on("connect", () => {
      console.log("connected");
      socket.emit("create", "room1");
    });

    socket.on("chat message", (msg) => {
      console.log("received ://: ", msg);
    });
    // this.socket = this.$nuxtSocket({
    //   channel: "/protected1",
    // });
    // console.log(":::::::::::::mounted:::::::::::::");

    // this.socket.open();

    // this.socket.on("connection", (socket) => {
    //   console.log("connected");
    // });
    // /* Listen for events: */
    // this.socket.on("chat message", (msg, cb) => {
    //   /* Handle event */
    //   console.log("received ://: ", msg);
    // });
  },
  methods: {
    method1() {
      console.log("method1 invoked!");

      socket.emit("chat message", {
        room: "room1",
        message: "hello",
      });
    },
    method2() {
      console.log("method1 invoked!");

      socket.emit("chat message", {
        room: "room2",
        message: "hello",
      });
    },
  },
};
</script>
