<script setup lang="ts">
import { ref, computed } from "vue";
import { useIncome } from "../composables/useIcomeSaving";
import { useExpense } from "../composables/useExpenses";
import { useResetFinance } from "../composables/useFiananceReset";
import ComparisonChart from "../graphs/ComparisonChart.vue";
import CategoryChart from "../graphs/CategoryChart.vue";
import DailySpending from "../graphs/DailySpending.vue";

const { income, savings, currentAccount } = useIncome();
const { expenses } = useExpense();
const { resetAllData } = useResetFinance();

const isConfirmingReset = ref<boolean>(false);

const totalExpenses = computed((): number => {
  return expenses.value.reduce(
    (acc: number, item: { amount: number }) => acc + item.amount,
    0,
  );
});

const totalBalance = computed((): number => {
  return currentAccount.value - totalExpenses.value - savings.value;
});

const handleReset = (): void => {
  resetAllData();
  isConfirmingReset.value = false;
};

const formatCurrency = (val: number): string => {
  return val.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
</script>

<template>
  <div
    class="w-full px-4 sm:px-6 lg:px-12 py-6 sm:py-8 pt-28 sm:pt-20 lg:pt-24 max-w-[1600px] mx-auto"
  >
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12"
    >
      <div
        class="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-md sm:shadow-lg border border-gray-100 dark:bg-slate-800 dark:border-gray-700 transition-all hover:shadow-xl lg:hover:-translate-y-1"
      >
        <p
          class="text-[10px] sm:text-xs lg:text-sm font-bold text-gray-400 uppercase tracking-widest dark:text-gray-400"
        >
          Current Balance
        </p>
        <p
          class="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-gray-900 mt-2 sm:mt-4 dark:text-white tabular-nums break-words"
        >
          K {{ formatCurrency(totalBalance) }}
        </p>
      </div>

      <div
        class="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-md sm:shadow-lg border border-gray-100 dark:bg-slate-800 dark:border-gray-700 transition-all hover:shadow-xl lg:hover:-translate-y-1"
      >
        <p
          class="text-[10px] sm:text-xs lg:text-sm font-bold text-gray-400 uppercase tracking-widest dark:text-gray-400"
        >
          Income
        </p>
        <p
          class="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-emerald-600 mt-2 sm:mt-4 dark:text-emerald-400 tabular-nums break-words"
        >
          K {{ formatCurrency(income) }}
        </p>
      </div>

      <div
        class="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-md sm:shadow-lg border border-gray-100 dark:bg-slate-800 dark:border-gray-700 transition-all hover:shadow-xl lg:hover:-translate-y-1"
      >
        <p
          class="text-[10px] sm:text-xs lg:text-sm font-bold text-gray-400 uppercase tracking-widest dark:text-gray-400"
        >
          Expenses
        </p>
        <p
          class="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-rose-600 mt-2 sm:mt-4 dark:text-rose-400 tabular-nums break-words"
        >
          K {{ formatCurrency(totalExpenses) }}
        </p>
      </div>

      <div
        class="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-md sm:shadow-lg border border-gray-100 dark:bg-slate-800 dark:border-gray-700 transition-all hover:shadow-xl lg:hover:-translate-y-1"
      >
        <p
          class="text-[10px] sm:text-xs lg:text-sm font-bold text-gray-400 uppercase tracking-widest dark:text-gray-400"
        >
          Savings
        </p>
        <p
          class="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-blue-600 mt-2 sm:mt-4 dark:text-blue-400 tabular-nums break-words"
        >
          K {{ formatCurrency(savings) }}
        </p>
      </div>
    </div>

    <div
      class="flex flex-col items-center justify-center pt-6 sm:pt-8 border-t border-gray-100 dark:border-gray-800"
    >
      <button
        @click="isConfirmingReset = true"
        class="w-full sm:w-auto group flex items-center justify-center gap-3 px-6 sm:px-10 py-3 sm:py-4 bg-rose-50 dark:bg-rose-950/20 text-rose-600 rounded-xl sm:rounded-2xl hover:bg-rose-600 hover:text-white transition-all active:scale-95 font-black text-[10px] sm:text-xs uppercase tracking-widest cursor-pointer"
      >
        Clear All Financial Data
      </button>
    </div>

    <Teleport to="body">
      <div
        v-if="isConfirmingReset"
        class="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[200] flex items-center justify-center p-4 sm:p-6"
        @click.self="isConfirmingReset = false"
      >
        <div
          class="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] max-w-sm w-full shadow-2xl border-4 border-rose-50 dark:border-rose-900/20 text-center"
        >
          <h3
            class="text-xl sm:text-2xl font-black text-gray-900 dark:text-white uppercase mb-2"
          >
            Hard Reset?
          </h3>
          <p
            class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium mb-6 sm:mb-8 leading-relaxed"
          >
            This will wipe your current account, income, savings, and delete all
            expense entries.
          </p>
          <div class="flex flex-col gap-2 sm:gap-3">
            <button
              @click="handleReset"
              class="w-full py-3 sm:py-4 bg-rose-600 text-white font-black rounded-xl sm:rounded-2xl shadow-lg hover:bg-rose-700 transition-all uppercase tracking-widest text-[10px] sm:text-xs cursor-pointer"
            >
              Confirm Wipe
            </button>
            <button
              @click="isConfirmingReset = false"
              class="w-full py-3 sm:py-4 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 font-bold rounded-xl sm:rounded-2xl hover:bg-gray-200 transition-all uppercase tracking-widest text-[10px] sm:text-xs cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Graphs -->
    <div
      v-if="expenses.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-4 sm:px-6 lg:px-12 pt-10 sm:pt-20 max-w-[1600px] mx-auto"
    >
      <div
        class="w-full bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col"
      >
        <div class="flex justify-between items-center mb-6">
          <h3
            class="font-black text-gray-400 dark:text-white uppercase text-[10px] sm:text-xs tracking-widest"
          >
            Expenses Vs Income
          </h3>
        </div>
        <div class="flex-grow">
          <ComparisonChart />
        </div>
      </div>

      <div
        class="w-full bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col"
      >
        <h3
          class="font-black text-gray-400 dark:text-white uppercase text-[10px] sm:text-xs tracking-widest"
        >
          Expense Categories
        </h3>
        <div class="pt-5 flex-grow">
          <CategoryChart />
        </div>
      </div>

      <div
        class="w-full bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col"
      >
        <h3
          class="font-black text-gray-400 dark:text-white uppercase text-[10px] sm:text-xs tracking-widest"
        >
          Daily Spending
        </h3>
        <div class="pt-5 flex-grow">
          <DailySpending />
        </div>
      </div>
    </div>
  </div>
</template>
