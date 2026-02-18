<script setup>
import { ref } from "vue";

import { useThemeContext } from "../composables/useThemeContext";

const { isDark, toggleTheme } = useThemeContext();
</script>

<template>
  <nav
    class="dark:bg-slate-800 dark:border-gray-700 fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 bg-white font-bold border-gray-300 border-2"
  >
    <div class="flex flex-col">
      <span class="font-black text-indigo-600 text-5xl dark:text-white"
        >EXPENSE TRACKER</span
      >
      <p class="text-gray-300">manage your finances with ease</p>
    </div>
    <button class="bg-indigo-700 text-white px-4 py-2 rounded-lg ml-280">
      Enter Income
    </button>
    <button
      @click="toggleTheme"
      class="cursor-pointer text-lg hover:text-green-700 dark:hover:text-green-400 transition-all duration-200 active:scale-90 px-2 select-none"
      title="Toggle Light/Dark Mode"
    >
      {{ isDark ? "☀️" : "⏾" }}
    </button>
  </nav>
</template>
