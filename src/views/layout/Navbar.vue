<template>
    <router-view></router-view>
    <nav class="navbar">
      <ul>
      <li><router-link to="/">主页</router-link></li>
      <li><router-link to="/consortium">财团</router-link></li>
      <li><router-link to="/characters">角色</router-link></li>
      </ul>
    </nav>
</template>
  
  <script>
  export default {
    name: 'NavBar'
  }
  </script>
  
  <style lang="scss">
.navbar {
    position: fixed;
  top: 0; /* 将导航栏放置在页面顶部 */
  right: 0; /* 将导航栏固定在页面的右侧 */
    background-color: rgba(255, 255, 255, 0); /* 设置透明背景 */
    padding: 14px 30px;
    z-index: 1000;
    display: flex;
    justify-content: flex-end;  /* 将内容向右对齐 */
    width: 100%; /* 保持导航栏宽度100% */
  }
  
  .navbar ul {
    list-style: none;
    margin: 0;
    margin-top:10px;
    padding: 0;
    display: flex;
    gap: 52px; //整大各个菜单项的间距
  }
  
  .navbar ul li {
    display: inline;
  }
  
  .navbar ul li a {
    color: black;
    text-decoration: none;
    font-size: 1.4em;
    font-weight: bold;
  }
  
  .navbar ul li a:hover {
    text-decoration: underline;
  }
  </style>
  