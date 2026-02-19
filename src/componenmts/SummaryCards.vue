<script setup lang="ts">
import { computed } from "vue";
import { useIncome } from "../composables/useIcomeSaving";
import { useExpense } from "../composables/useExpenses";

const { income, savings, currentAccount } = useIncome();
const { expenses } = useExpense();

const totalExpenses = computed((): number => {
  return expenses.value.reduce(
    (acc: number, item: { amount: number }) => acc + item.amount,
    0,
  );
});

const totalBalance = computed((): number => {
  return currentAccount.value - totalExpenses.value - savings.value;
});

const formatCurrency = (val: number): string => {
  return val.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
</script>

<template>
  <div
    class="w-full px-4 sm:px-6 lg:px-12 py-8 pt-48 sm:pt-0 lg:pt-20 max-w-[1600px] mx-auto lg:pb-2"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
      <div
        class="bg-white p-8 lg:p-10 rounded-3xl shadow-lg border border-gray-100 dark:bg-indigo-950 dark:border-gray-700 transition-all hover:shadow-2xl hover:-translate-y-1"
      >
        <p
          class="text-sm lg:text-base font-bold text-gray-400 uppercase tracking-widest dark:text-gray-300"
        >
          Current Balance
        </p>
        <p
          class="text-3xl lg:text-4xl xl:text-5xl font-black text-gray-900 mt-4 dark:text-white tabular-nums"
        >
          K {{ formatCurrency(totalBalance) }}
        </p>
      </div>

      <div
        class="bg-white p-8 lg:p-10 rounded-3xl shadow-lg border border-gray-100 dark:bg-cyan-950 dark:border-gray-700 transition-all hover:shadow-2xl hover:-translate-y-1"
      >
        <p
          class="text-sm lg:text-base font-bold text-gray-400 uppercase tracking-widest dark:text-gray-300"
        >
          Income
        </p>
        <p
          class="text-3xl lg:text-4xl xl:text-5xl font-black text-emerald-600 mt-4 dark:text-emerald-400 tabular-nums"
        >
          K {{ formatCurrency(income) }}
        </p>
      </div>

      <div
        class="bg-white p-8 lg:p-10 rounded-3xl shadow-lg border border-gray-100 dark:bg-rose-950 dark:border-gray-700 transition-all hover:shadow-2xl hover:-translate-y-1"
      >
        <p
          class="text-sm lg:text-base font-bold text-gray-400 uppercase tracking-widest dark:text-gray-300"
        >
          Expenses
        </p>
        <p
          class="text-3xl lg:text-4xl xl:text-5xl font-black text-rose-600 mt-4 dark:text-rose-400 tabular-nums"
        >
          K {{ formatCurrency(totalExpenses) }}
        </p>
      </div>

      <div
        class="bg-white p-8 lg:p-10 rounded-3xl shadow-lg border border-gray-100 dark:bg-green-950 dark:border-gray-700 transition-all hover:shadow-2xl hover:-translate-y-1"
      >
        <p
          class="text-sm lg:text-base font-bold text-gray-400 uppercase tracking-widest dark:text-gray-300"
        >
          Savings
        </p>
        <p
          class="text-3xl lg:text-4xl xl:text-5xl font-black text-blue-600 mt-4 dark:text-blue-400 tabular-nums"
        >
          K {{ formatCurrency(savings) }}
        </p>
      </div>
    </div>
  </div>
</template>
