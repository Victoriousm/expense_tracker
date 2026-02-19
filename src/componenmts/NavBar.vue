<script setup lang="ts">
import { ref, Ref } from "vue";
import { useThemeContext } from "../composables/useThemeContext";
import { useIncome } from "../composables/useIcomeSaving";
import { useExpense } from "../composables/useExpenses";

const { isDark, toggleTheme } = useThemeContext();
const { setIncome, setSavings, addIncomeToBalance, income, currentAccount } =
  useIncome();
const { clearExpenses } = useExpense();

// Strictly typed refs for the modal state
const showModal: Ref<boolean> = ref(false);
const tempIncome: Ref<number> = ref(0);
const tempSavings: Ref<number> = ref(0);

const openModal = (): void => {
  tempIncome.value = income.value;
  tempSavings.value = 0;
  showModal.value = true;
};

const saveAndClose = (): void => {
  try {
    const newIncomeValue: number = Number(tempIncome.value);
    const newSavingsValue: number = Number(tempSavings.value);

    clearExpenses();

    // Update the base income variable
    setIncome(newIncomeValue);

    // Accumulate the income into the Current Account
    addIncomeToBalance(newIncomeValue);

    // Add the savings amount to the total
    setSavings(newSavingsValue);

    // Reset local state and close the modal
    tempSavings.value = 0;
    showModal.value = false;
  } catch (error: unknown) {
    console.error("Failed to save finance settings:", error);
    // Safety fallback to close modal
    showModal.value = false;
  }
};
</script>

<template>
  <div class="relative">
    <nav
      class="dark:bg-slate-800 dark:border-gray-700 fixed top-0 left-0 w-full flex flex-col md:flex-row items-center justify-between px-4 py-3 md:px-8 md:py-4 bg-white font-bold border-gray-300 border-b-2 z-50 transition-colors"
    >
      <div class="flex flex-col text-center md:text-left mb-3 md:mb-0">
        <span
          class="font-black text-indigo-600 text-2xl sm:text-3xl md:text-4xl lg:text-5xl dark:text-white leading-tight"
        >
          EXPENSE TRACKER
        </span>
        <p class="text-xs sm:text-sm text-gray-400 dark:text-gray-300">
          manage your finances with ease
        </p>
      </div>

      <div class="flex items-center gap-6">
        <button
          @click="openModal"
          type="button"
          class="bg-indigo-700 hover:bg-indigo-800 text-white px-3 py-1.5 sm:px-5 sm:py-2 rounded-lg text-sm sm:text-base transition-all shadow-md active:scale-95 cursor-pointer"
        >
          Enter Income & Savings
        </button>

        <button
          @click="toggleTheme"
          type="button"
          class="cursor-pointer text-xl sm:text-2xl hover:text-green-700 dark:hover:text-green-400 transition-all duration-200 active:scale-90 px-2 select-none"
        >
          {{ isDark ? "☀️" : "⏾" }}
        </button>
      </div>
    </nav>

    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
      @click.self="showModal = false"
    >
      <div
        class="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl max-w-sm w-full shadow-2xl border border-gray-100 dark:border-gray-700"
      >
        <h3
          class="text-xl font-black text-indigo-600 dark:text-white mb-6 uppercase"
        >
          Finance Settings
        </h3>

        <div class="space-y-5">
          <div>
            <label
              class="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 block mb-2"
              >Monthly Income (K)</label
            >
            <input
              v-model.number="tempIncome"
              type="number"
              class="w-full p-4 bg-gray-50 dark:bg-slate-900 border-2 border-transparent focus:border-indigo-500 rounded-2xl outline-none dark:text-white font-bold text-xl transition-all"
            />
          </div>

          <div>
            <label
              class="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 block mb-2"
              >Manual Savings (K)</label
            >
            <input
              v-model.number="tempSavings"
              type="number"
              class="w-full p-4 bg-gray-50 dark:bg-slate-900 border-2 border-transparent focus:border-indigo-500 rounded-2xl outline-none dark:text-white font-bold text-xl transition-all"
            />
          </div>

          <div class="flex gap-3 pt-2">
            <button
              @click="showModal = false"
              type="button"
              class="flex-1 py-3 text-gray-500 font-bold hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              @click="saveAndClose"
              type="button"
              class="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-all cursor-pointer"
            >
              Save All
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="h-28 md:h-24"></div>
  </div>
</template>
