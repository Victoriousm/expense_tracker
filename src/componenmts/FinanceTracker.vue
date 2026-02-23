<script setup lang="ts">
import { useFinanceTracker } from "../composables/useFinanceTracker";
import { useIncome } from "../composables/useIcomeSaving";
import { useExpense } from "../composables/useExpenses";
import { computed, ref } from "vue"; // Added ref

const {
  isModalOpen,
  selectedMonth,
  monthlyHistory,
  toggleModal: originalToggleModal,
  clearMonthlyHistory,
  clearAllHistory,
} = useFinanceTracker();

const { expenses } = useExpense();

// State for confirmation modals
const isConfirmingMonth = ref(false);
const isConfirmingAll = ref(false);

const toggleModal = () => {
  originalToggleModal();
  // Reset confirmation states when closing/opening history
  isConfirmingMonth.value = false;
  isConfirmingAll.value = false;
};

const handleClearMonth = () => {
  clearMonthlyHistory();
  isConfirmingMonth.value = false;
};

const handleClearAll = () => {
  clearAllHistory();
  isConfirmingAll.value = false;
};

const totalExpenses = computed((): number => {
  return expenses.value.reduce((acc: number, item: { amount: number }) => acc + item.amount, 0);
});

const formatCurrency = (val: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ZMW",
  }).format(val || 0);
</script>

<template>
  <div class="flex flex-col items-center justify-center pt-6 sm:pt-8 border-t border-gray-100 dark:border-gray-800">
    <button @click="toggleModal"
      class="w-full sm:w-auto group flex items-center justify-center gap-3 px-6 sm:px-10 py-3 sm:py-4 bg-rose-50 dark:bg-rose-950/20 text-rose-600 rounded-xl sm:rounded-2xl hover:bg-gray-600 hover:text-white transition-all active:scale-95 font-black text-[10px] sm:text-xs uppercase tracking-widest cursor-pointer">
      Show History
    </button>
    <span class="mt-4 text-[10px] text-gray-900 dark:text-gray-400 uppercase tracking-tighter">
      View your History here after each rest
    </span>

    <Transition name="slide-up">
      <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-md" @click="toggleModal"></div>

        <div
          class="relative bg-white dark:bg-gray-900 w-full max-w-md rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 shadow-2xl border border-gray-100 dark:border-gray-800">

          <div v-if="!isConfirmingMonth && !isConfirmingAll">
            <div class="flex justify-between items-center mb-8">
              <div>
                <h2 class="text-2xl font-black text-gray-800 dark:text-white">History</h2>
                <p class="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{{ selectedMonth }}</p>
              </div>
              <input type="month" v-model="selectedMonth"
                class="bg-gray-100 dark:bg-gray-800 dark:text-white text-xs font-bold p-2 rounded-lg border-none focus:ring-2 focus:ring-rose-500" />
            </div>

            <div v-if="monthlyHistory.length > 0" class="grid grid-cols-2 gap-3 mb-6">
              <button @click="isConfirmingMonth = true"
                class="py-2 px-3 border border-rose-200 dark:border-rose-900/30 text-rose-500 rounded-xl font-black text-[8px] uppercase tracking-wider hover:bg-rose-500 hover:text-white transition-all active:scale-95">
                Clear Month
              </button>
              <button @click="isConfirmingAll = true"
                class="py-2 px-3 border border-gray-200 dark:border-gray-700 text-gray-400 rounded-xl font-black text-[8px] uppercase tracking-wider hover:bg-gray-800 hover:text-white transition-all active:scale-95">
                Clear All
              </button>
            </div>

            <div class="max-h-[50vh] overflow-y-auto pr-2 space-y-4 custom-scrollbar">
              <div v-for="item in monthlyHistory" :key="item.id"
                class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-colors">
                <div>
                  <p class="font-bold text-gray-700 dark:text-gray-200">{{ item.label }}</p>
                  <p class="text-[9px] uppercase text-gray-400 font-black tracking-tighter">{{ item.type }}</p>
                </div>
                <span
                  :class="{ 'text-emerald-500': item.type === 'income', 'text-rose-500': item.type === 'expense', 'text-blue-500': item.type === 'savings' }"
                  class="font-black text-sm">
                  {{ item.type === "income" ? "+" : "-" }}{{ formatCurrency(item.amount) }}
                </span>
              </div>
              <div v-if="monthlyHistory.length === 0" class="text-center py-12">
                <p class="text-gray-400 text-[10px] uppercase font-bold tracking-widest text-4xl mb-2">∅</p>
                <p class="text-gray-400 text-[10px] uppercase font-bold tracking-widest">No entries found</p>
              </div>
            </div>

            <button @click="toggleModal"
              class="mt-8 w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] active:scale-95 transition-transform">
              Close
            </button>
          </div>

          <div v-else-if="isConfirmingMonth" class="py-6 text-center">
            <h3 class="text-xl font-black text-gray-800 dark:text-white uppercase mb-2">Are you sure?</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-8 font-bold uppercase tracking-tighter">This will
              delete all history for {{ selectedMonth }}.</p>
            <div class="flex flex-col gap-3">
              <button @click="handleClearMonth"
                class="py-4 bg-rose-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest active:scale-95">Yes,
                Delete Month</button>
              <button @click="isConfirmingMonth = false"
                class="py-4 bg-gray-100 dark:bg-gray-800 text-gray-400 rounded-2xl font-black text-[10px] uppercase tracking-widest active:scale-95">Cancel</button>
            </div>
          </div>

          <div v-else-if="isConfirmingAll" class="py-6 text-center">
            <h3 class="text-xl font-black text-gray-800 dark:text-white uppercase mb-2">Wipe Everything?</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-8 font-bold uppercase tracking-tighter">This will
              clear your entire history storage permanently.</p>
            <div class="flex flex-col gap-3">
              <button @click="handleClearAll"
                class="py-4 bg-rose-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest active:scale-95">Yes,
                Clear All History</button>
              <button @click="isConfirmingAll = false"
                class="py-4 bg-gray-100 dark:bg-gray-800 text-gray-400 rounded-2xl font-black text-[10px] uppercase tracking-widest active:scale-95">Cancel</button>
            </div>
          </div>

        </div>
      </div>
    </Transition>
  </div>
</template>