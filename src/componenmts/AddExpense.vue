<template>
  <div class="w-full px-6 py-6">
    <section
      class="dark:border-gray-700 w-full mx-auto p-6 bg-white rounded-3xl shadow-sm border border-gray-100 my-10 dark:bg-slate-800"
    >
      <div class="text-center mb-8">
        <h2
          class="text-3xl font-black text-indigo-600 uppercase tracking-tight dark:text-white"
        >
          ADD A NEW EXPENSE
        </h2>
        <p class="text-gray-500 mt-2 dark:text-white">
          Track your spending and save more
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex flex-col gap-2">
            <label
              for="desc"
              class="text-sm font-semibold text-gray-700 dark:text-white dark:font-bold"
              >Description</label
            >
            <input
              v-model="description"
              id="desc"
              type="text"
              placeholder="e.g. Weekly Groceries"
              class="dark:border-gray-700 dark:text-white w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              required
            />
          </div>

          <div class="flex flex-col gap-2">
            <label
              class="text-sm font-semibold text-gray-700 dark:text-white dark:font-bold"
              >Amount (ZMW)</label
            >
            <input
              v-model.number="amount"
              type="number"
              placeholder="0.00"
              class="dark:border-gray-700 dark:text-white w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              required
            />
          </div>

          <div class="flex flex-col gap-2">
            <label
              class="text-sm font-semibold text-gray-700 dark:text-white dark:font-bold"
              >Date</label
            >
            <input
              v-model="date"
              type="date"
              class="dark:border-gray-700 dark:text-white w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              required
            />
          </div>

          <div class="flex flex-col gap-2">
            <label
              for="category"
              class="text-sm font-semibold text-gray-700 dark:text-white dark:font-bold"
              >Category</label
            >
            <select
              v-model="category"
              id="category"
              class="dark:border-gray-700 w-full p-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer dark:bg-slate-800 dark:text-white"
              required
            >
              <option value="food & Dinning ">Food & Dining</option>
              <option value="transportation">Transportation</option>
              <option value="shopping">Shopping</option>
              <option value="health">Health</option>
              <option value="bills & utilities">Bills & Utilities</option>
              <option value="healthcare">Healthcare</option>
              <option value="entertainment">Entertainment</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div class="flex justify-center pt-4">
          <button
            type="submit"
            class="dark:bg-indigo-700 dark:shadow-none w-full md:w-auto px-10 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all transform active:scale-95"
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

// 1. Reactive variables for form inputs
const description = ref("");
const amount = ref<number>(0);
const date = ref(new Date().toISOString().split("T")[0]); // Default to today's date

// Using a type-safe ref for category
const category = ref<Expense["category"]>("other");

const handleSubmit = () => {
  // Simple validation to prevent empty submissions
  if (!description.value || amount.value <= 0) return;

  // Passing the data directly to the composable
  addExpense({
    description: description.value,
    amount: amount.value,
    date: date.value,
    category: category.value,
  });

  // Resetting fields after successful add
  description.value = "";
  amount.value = 0;
  category.value = "other";
};
</script>
