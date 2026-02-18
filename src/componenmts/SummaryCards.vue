<template>
  <div class="w-full px-6 py-6 pt-30 justify center">
    <div class="flex md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      <div
        class="bg-white p-8 rounded-2xl shadow-md border border-gray-100 w-full dark:bg-indigo-950 dark:border-gray-700"
      >
        <p
          class="text-sm font-semibold text-gray-500 uppercase tracking-widest dark:text-white dark:text-bold"
        >
          Total Balance
        </p>
        <p class="text-3xl font-bold text-gray-900 mt-3 dark:text-white">
          $12,450.00
        </p>
      </div>

      <div
        class="bg-white p-8 rounded-2xl shadow-md border border-gray-100 w-full dark:bg-cyan-950 dark:border-gray-700"
      >
        <p
          class="text-sm font-semibold text-gray-500 uppercase tracking-widest dark:text-white dark:text-bold"
        >
          Income
        </p>
        <p
          class="text-3xl font-bold text-emerald-600 mt-3 dark:text-white dark:text-bold"
        >
          +$3,200.00
        </p>
      </div>

      <div
        class="bg-white p-8 rounded-2xl shadow-md border border-gray-100 w-full dark:bg-rose-950 dark:border-gray-700"
      >
        <p
          class="text-sm font-semibold text-gray-500 uppercase tracking-widest dark:text-white dark:text-bold"
        >
          Expenses
        </p>
        <p
          class="text-3xl font-bold text-rose-600 mt-3 dark:text-white dark:text-bold"
        >
          -$1,150.00
        </p>
      </div>

      <div
        class="bg-white p-8 rounded-2xl shadow-md border border-gray-100 w-full dark:bg-green-950 dark:border-gray-700"
      >
        <p
          class="dark:text-white dark:text-bold text-sm font-semibold text-gray-500 uppercase tracking-widest dark:text-white dark:text-bold"
        >
          Savings
        </p>
        <p
          class="text-3xl font-bold text-blue-600 mt-3 dark:text-white dark:text-bold"
        >
          $450.00
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
