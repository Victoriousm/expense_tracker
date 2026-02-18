<template>
  <div>
    <nav
      class="dark:bg-slate-800 dark:border-gray-700 fixed top-0 left-0 w-full flex flex-col md:flex-row items-center justify-between px-4 py-3 md:px-8 md:py-4 bg-white font-bold border-gray-300 border-b-2 z-50 transition-colors"
    >
      <div>
        <span
          class="font-black text-indigo-600 text-3xl dark:text-white uppercase"
          >Expense Tracker</span
        >
        <p class="text-xs sm:text-sm text-gray-400 dark:text-gray-300">
          manage your finances with ease
        </p>
      </div>

      <div class="flex items-center gap-4">
        <button
          @click.stop="openModal"
          type="button"
          class="bg-indigo-700 hover:bg-indigo-800 text-white px-5 py-2 rounded-lg font-bold z-[60] cursor-pointer"
        >
          Enter Income
        </button>

        <button
          @click="toggleTheme"
          type="button"
          class="cursor-pointer text-2xl"
        >
          {{ isDark ? "☀️" : "⏾" }}
        </button>
      </div>
    </nav>

    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[999] p-4"
    >
      <div
        class="bg-white dark:bg-slate-800 p-8 rounded-3xl max-w-sm w-full shadow-2xl"
      >
        <h3 class="text-xl font-black mb-4 dark:text-white uppercase">
          Set Income
        </h3>
        <input
          v-model.number="inputAmount"
          type="number"
          class="w-full p-4 bg-gray-100 dark:bg-slate-900 rounded-xl mb-6 outline-none dark:text-white border-2 border-transparent focus:border-indigo-500"
        />
        <div class="flex gap-4">
          <button
            @click="showModal = false"
            class="flex-1 font-bold text-gray-400"
          >
            Cancel
          </button>
          <button
            @click="saveAndClose"
            class="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold"
          >
            Save
          </button>
        </div>
      </div>
    </div>

    <div class="h-24"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useThemeContext } from "../composables/useThemeContext";
import { useIncome } from "../composables/useIncome"; // Double check this path!

const { isDark, toggleTheme } = useThemeContext();
const { setIncome } = useIncome();

const showModal = ref(false);
const inputAmount = ref(0);

// This function will tell us exactly what is happening in the Console
const openModal = () => {
  console.log("Button Clicked! showModal was:", showModal.value);
  showModal.value = true;
  console.log("showModal is now:", showModal.value);
};

const saveAndClose = () => {
  setIncome(Number(inputAmount.value));
  showModal.value = false;
};
</script>
