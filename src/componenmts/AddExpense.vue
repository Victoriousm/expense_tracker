<template>
  <div class="w-full px-4 sm:px-6 lg:px-12 py-4">
    <section
      class="w-full mx-auto p-5 sm:p-8 lg:p-10 bg-white rounded-3xl shadow-sm border border-gray-100 my-4 sm:my-10 dark:bg-slate-800 dark:border-gray-700 transition-colors"
    >
      <div class="text-center mb-6 sm:mb-8">
        <h2
          class="text-2xl sm:text-3xl font-black text-indigo-600 uppercase tracking-tight dark:text-white"
        >
          ADD A NEW EXPENSE
        </h2>
        <p class="text-xs sm:text-sm text-gray-500 mt-2 dark:text-gray-300">
          Track your spending and save more
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4 sm:space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div class="flex flex-col gap-1.5 sm:gap-2">
            <label
              for="desc"
              class="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-200"
              >Description</label
            >
            <input
              v-model="description"
              id="desc"
              type="text"
              placeholder="e.g. Weekly Groceries"
              class="w-full p-3 sm:p-3.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white text-sm sm:text-base"
              required
            />
          </div>

          <div class="flex flex-col gap-1.5 sm:gap-2">
            <label
              class="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-200"
              >Amount (ZMW)</label
            >
            <input
              v-model.number="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              class="w-full p-3 sm:p-3.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white text-sm sm:text-base"
              required
            />
          </div>

          <div class="flex flex-col gap-1.5 sm:gap-2">
            <label
              class="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-200"
              >Date</label
            >
            <input
              v-model="date"
              type="date"
              class="w-full p-3 sm:p-3.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white text-sm sm:text-base"
              required
            />
          </div>

          <div class="flex flex-col gap-1.5 sm:gap-2">
            <label
              for="category"
              class="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-200"
              >Category</label
            >
            <select
              v-model="category"
              id="category"
              class="w-full p-3 sm:p-3.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer dark:text-white text-sm sm:text-base appearance-none"
              required
            >
              <option value="food & Dinning">Food & Dining</option>
              <option value="transportation">Transportation</option>
              <option value="shopping">Shopping</option>
              <option value="health">Health</option>
              <option value="bills & utilities">Bills & Utilities</option>
              <option value="entertainment">Entertainment</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div class="flex justify-center pt-4 sm:pt-6">
          <button
            type="submit"
            class="w-full md:w-auto px-12 py-3.5 sm:py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 dark:shadow-none transition-all transform active:scale-95 uppercase tracking-widest text-xs sm:text-sm"
          >
            Add Expense
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useExpense } from "../composables/useExpenses";
import type { Expense } from "../types/types";

const { addExpense } = useExpense();

const description = ref("");
const amount = ref<number | null>(null); // Changed to null for better placeholder behavior
const date = ref(new Date().toISOString().split("T")[0]);
const category = ref<Expense["category"]>("other");

const handleSubmit = () => {
  if (!description.value || !amount.value || amount.value <= 0) return;

  addExpense({
    description: description.value,
    amount: amount.value,
    date: date.value,
    category: category.value,
  });

  // Clear inputs
  description.value = "";
  amount.value = null;
  category.value = "other";
};
</script>
