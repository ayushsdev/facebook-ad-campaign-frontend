<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="animated-gradient min-h-[50vh] w-full flex items-center justify-center">
    <h1 class="font-bold text-4xl text-black text-center">Facebook Ad Campaign Dashboard</h1>
  </div>
<!-- Navigation Links Section (Horizontal Row) -->
<div class="flex flex-row items-center justify-center mt-8 space-x-4">

    <RouterLink 
      to="/ctr" 
      class="px-4 py-2 text-white bg-purple-500 rounded hover:bg-purple-600 transition-all duration-200"
    >
      Click-Through Rate Prediction
    </RouterLink>
    <RouterLink 
      to="/advclicks" 
      class="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition-all duration-200"
    >
      Ads-Clicks
    </RouterLink>
  </div>

  <!-- Router View -->
  <RouterView />
</template>

<style scoped>
@import 'tailwindcss/tailwind.css';

@keyframes moveGradient {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
}
/* Apply the animation to the gradient background */
.animated-gradient {
  /* @apply min-h-screen w-full flex items-center justify-center; */
  background-color: hsla(336, 83%, 59%, 1);
  background-image: radial-gradient(at 62% 89%, hsla(359, 100%, 61%, 1) 0px, transparent 50%),
    radial-gradient(at 3% 34%, hsla(241, 40%, 45%, 1) 0px, transparent 50%),
    radial-gradient(at 34% 98%, hsla(18, 100%, 48%, 1) 0px, transparent 50%),
    radial-gradient(at 86% 77%, hsla(289, 100%, 74%, 1) 0px, transparent 50%),
    radial-gradient(at 31% 2%, hsla(360, 100%, 68%, 1) 0px, transparent 50%),
    radial-gradient(at 49% 83%, hsla(247, 100%, 60%, 1) 0px, transparent 50%),
    radial-gradient(at 71% 50%, hsla(240, 0%, 100%, 1) 0px, transparent 50%);
  background-size: 200% 200%;
  animation: moveGradient 20s ease infinite;
}
</style>
