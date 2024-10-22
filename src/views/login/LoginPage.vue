<template>
  <div></div>
  <div>
    <NavBar />
    <section v-for="(bgImage, index) in bgImages" :key="index">
      <div class="bg" :style="{ backgroundImage: `url(${bgImage})` }"></div>
      <div class="login-page">
        <h1>Simple Parallax {{ index + 1 }}</h1>
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from '@/views/layout/Navbar.vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import sunset from '@/assets/image/夕阳.jpg'
import glacier from '@/assets/image/冰川.jpg'
import slash from '@/assets/image/斩.jpg'
gsap.registerPlugin(ScrollTrigger)

let getRatio = (el) =>
  window.innerHeight / (window.innerHeight + el.offsetHeight)

export default {
  name: 'LoginPage',
  components: {
    NavBar //注册顶栏组件
  },
  data() {
    return {
      // 在这里定义你想要的背景图片URL
      bgImages: [sunset, glacier, slash]
    }
  },
  mounted() {
    gsap.utils.toArray('section').forEach((section, i) => {
      gsap.fromTo(
        section.querySelector('.bg'),
        {
          backgroundPosition: () =>
            i ? `50% ${-window.innerHeight * getRatio(section)}px` : '50% 0px'
        },
        {
          backgroundPosition: () =>
            `50% ${window.innerHeight * (1 - getRatio(section))}px`,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: () => (i ? 'top bottom' : 'top top'),
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true
          }
        }
      )
    })
  }
}
</script>

<style lang="scss">
section {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.login-page {
  z-index: 1;
  text-align: center;
}

h1 {
  color: white;
  text-shadow: 1px 1px 3px black;
  font-size: 3em;
  font-weight: 400;
}
</style>
