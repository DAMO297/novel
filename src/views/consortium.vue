<template>
    <div>
      <p>{{ message }}</p>
      <button @click="changeMessage">点击我改变内容</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        message: '1' // 初始化消息为 "1"
      }
    },
    methods: {
      changeMessage() {
        this.message = '你点击了按钮!' // 点击按钮时改变消息内容
      }
    }
  }
  </script>
  
  <style scoped>
  p {
    font-size: 24px;
    color: blue;
  }
  
  button {
    margin-top: 10px;
    padding: 10px;
    background-color: lightgray;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: gray;
    color: white;
  }
  </style>
  