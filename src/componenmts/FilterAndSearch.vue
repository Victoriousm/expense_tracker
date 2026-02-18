<template>
  <div class="w-full px-6 py-6">
    <div
      class="dark:bg-slate-800 dark:border-gray-700 bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
    >
      <div class="mb-6">
        <h3
          class="text-2xl font-black text-indigo-600 uppercase tracking-tight dark:text-white"
        >
          Search & Filter
        </h3>
        <p class="text-sm text-gray-500 dark:text-white">
          Find specific transactions by date, category, or amount
        </p>
      </div>

      <div class="space-y-6">
        <div class="flex flex-col gap-2">
          <label
            class="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 dark:text-white"
            >Search</label
          >
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="🔍 Search for expense..."
              class="w-full p-4 border border-gray-100 rounded-2xl bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="flex flex-col gap-2">
            <label
              class="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 dark:text-white"
              >Category</label
            >
            <select
              v-model="selectedCategory"
              class="h-12 p-3 border border-gray-100 rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
            >
              <option value="All">All Categories</option>
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

          <div class="flex flex-col gap-2">
            <label
              class="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 dark:text-white"
              >From Date</label
            >
            <input
              v-model="fromDate"
              type="date"
              class="h-12 p-3 border border-gray-100 rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label
              class="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 dark:text-white"
              >To Date</label
            >
            <input
              v-model="toDate"
              type="date"
              class="h-12 p-3 border border-gray-100 rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label
              class="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 dark:text-white"
              >Sort By</label
            >
            <select
              v-model="sortBy"
              class="h-12 p-3 border border-gray-100 rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
            >
              <option value="date-desc">Date (Newest)</option>
              <option value="date-asc">Date (Oldest)</option>
              <option value="amount-desc">Amount (Highest)</option>
              <option value="amount-asc">Amount (Lowest)</option>
              <option value="category-asc">Category (A-Z)</option>
              <option value="category-desc">Category (Z-A)</option>
            </select>
          </div>
        </div>
      </div>

      <div class="flex justify-end mt-6">
        <button
          @click="clearFilters"
          class="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors dark:text-white"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFilter } from "../composables/useFilters";
import { useExpense } from "../composables/useExpenses";

// We need the expenses from the store to initialize the filter logic
const { expenses } = useExpense();
const {
  searchQuery,
  selectedCategory,
  fromDate,
  toDate,
  sortBy,
  clearFilters,
} = useFilter(expenses);
</script>
