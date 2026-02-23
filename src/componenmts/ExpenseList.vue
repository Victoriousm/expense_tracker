<template>
  <div class="w-full px-2 sm:px-6 py-4 sm:py-6">
    <div
      class="dark:bg-slate-800 dark:border-gray-700 bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div v-if="paginatedData.length === 0" class="p-10 sm:p-20 text-center">
        <h3 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
          No results found
        </h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Try adding an expense or changing your filters.
        </p>
      </div>

      <div v-else class="overflow-x-auto scrollbar-hide">
        <table class="w-full text-left border-collapse min-w-[600px] md:min-w-full">
          <thead>
            <tr class="bg-gray-50 border-b border-gray-100 dark:bg-slate-900/50 dark:border-gray-900">
              <th
                class="p-3 sm:p-4 text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest dark:text-gray-300">
                Date
              </th>
              <th
                class="p-3 sm:p-4 text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest text-center dark:text-gray-300">
                Category
              </th>
              <th
                class="p-3 sm:p-4 text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest dark:text-gray-300">
                Description
              </th>
              <th
                class="p-3 sm:p-4 text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest text-right dark:text-gray-300">
                Amount
              </th>
              <th
                class="p-3 sm:p-4 text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest text-center dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50 dark:divide-gray-700">
            <tr v-for="item in paginatedData" :key="item.id"
              class="hover:bg-indigo-50/30 dark:hover:bg-slate-700/50 transition-colors">
              <td class="p-3 sm:p-4 text-xs sm:text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                {{ item.date }}
              </td>
              <td class="p-3 sm:p-4 text-center whitespace-nowrap">
                <span
                  class="inline-block px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 capitalize">
                  {{ item.category }}
                </span>
              </td>
              <td class="p-3 sm:p-4 text-xs sm:text-sm text-gray-900 font-medium dark:text-white min-w-[150px]">
                {{ item.description }}
              </td>
              <td class="p-3 sm:p-4 text-right font-bold text-xs sm:text-sm text-gray-900 dark:text-white tabular-nums">
                ZMW {{ item.amount.toFixed(2) }}
              </td>
              <td class="p-3 sm:p-4 text-center">
                <div class="flex justify-center gap-1 sm:gap-3">
                  <button @click="openEditModal(item)"
                    class="p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button @click="openDeleteModal(item)"
                    class="p-1.5 sm:p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="filteredExpenses.length > 5"
        class="p-4 sm:p-6 bg-gray-50/50 dark:bg-slate-900/40 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          Page {{ currentPage }} of {{ totalPages }}
          <span class="ml-2 text-indigo-500">({{ filteredExpenses.length }} total expenses)</span>
        </p>
        <div class="flex items-center gap-2">
          <button @click="prevPage" :disabled="currentPage === 1"
            class="px-4 py-2 text-[10px] font-black uppercase border rounded-xl disabled:opacity-20 bg-white dark:bg-slate-800 dark:text-white dark:border-gray-600 transition-all active:scale-95">
            Prev
          </button>
          <button @click="nextPage" :disabled="currentPage === totalPages"
            class="px-4 py-2 text-[10px] font-black uppercase border rounded-xl disabled:opacity-20 bg-white dark:bg-slate-800 dark:text-white dark:border-gray-600 transition-all active:scale-95">
            Next
          </button>
        </div>
      </div>
    </div>

    <div v-if="showDeleteModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-xl">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white">
          Confirm Deletion
        </h3>
        <p class="text-gray-500 dark:text-gray-400 mt-2 text-sm">
          Are you sure you want to delete
          <span class="font-bold text-indigo-600">"{{ selectedExpense?.description }}"</span>?
        </p>
        <div class="flex gap-3 mt-6">
          <button @click="showDeleteModal = false"
            class="flex-1 px-4 py-2 bg-gray-100 dark:bg-slate-700 dark:text-white rounded-xl font-semibold text-sm">
            Cancel
          </button>
          <button @click="confirmDelete"
            class="flex-1 px-4 py-2 bg-rose-600 text-white rounded-xl font-semibold text-sm">
            Delete
          </button>
        </div>
      </div>
    </div>

    <div v-if="showEditModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="dark:bg-slate-800 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 max-w-lg w-full shadow-xl">
        <h3 class="dark:text-white text-xl sm:text-2xl font-black text-indigo-600 mb-6 uppercase">
          Edit Expense
        </h3>
        <form @submit.prevent="saveEdit" class="space-y-4">
          <input v-model="tempExpense.description" type="text"
            class="w-full p-3 border rounded-xl text-sm dark:bg-slate-900 dark:border-gray-700 dark:text-white"
            placeholder="Description" required />
          <input v-model.number="tempExpense.amount" type="number" step="0.01"
            class="w-full p-3 border rounded-xl text-sm dark:bg-slate-900 dark:border-gray-700 dark:text-white"
            placeholder="Amount" required />
          <input v-model="tempExpense.date" type="date"
            class="w-full p-3 border rounded-xl text-sm dark:bg-slate-900 dark:border-gray-700 dark:text-white"
            required />
          <select v-model="tempExpense.category"
            class="w-full p-3 border rounded-xl text-sm dark:bg-slate-900 dark:border-gray-700 dark:text-white">
            <option value="food & Dinning">Food & Dining</option>
            <option value="transportation">Transportation</option>
            <option value="shopping">Shopping</option>
            <option value="health">Health</option>
            <option value="bills & utilities">Bills & Utilities</option>
            <option value="entertainment">Entertainment</option>
            <option value="other">Other</option>
          </select>
          <div class="flex gap-3 pt-4">
            <button type="button" @click="showEditModal = false"
              class="flex-1 py-3 bg-gray-100 dark:bg-slate-700 dark:text-white rounded-xl font-bold text-sm">
              Cancel
            </button>
            <button type="submit" class="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { useExpense } from "../composables/useExpenses";
import { useFilter } from "../composables/useFilters";
import { usePagination } from "../composables/usePagination";
import type { Expense } from "../types/types";

// Composables
const { expenses, removeExpense, updateExpense } = useExpense();
const { filteredExpenses } = useFilter(expenses);

// Pagination Setup (5 items per page)
const { paginatedData, currentPage, totalPages, nextPage, prevPage } =
  usePagination(filteredExpenses, 5);

// Modal States
const showDeleteModal = ref(false);
const showEditModal = ref(false);
const selectedExpense = ref<Expense | null>(null);

// Watch modal states to prevent background scroll
watch([showDeleteModal, showEditModal], ([isDelOpen, isEditOpen]) => {
  document.body.style.overflow = (isDelOpen || isEditOpen) ? 'hidden' : '';
});

// Temporary state for editing
const tempExpense = reactive<Expense>({
  id: "",
  description: "",
  amount: 0,
  date: "",
  category: "other",
});

// Modal Actions
const openDeleteModal = (item: Expense) => {
  selectedExpense.value = item;
  showDeleteModal.value = true;
};

const confirmDelete = () => {
  if (selectedExpense.value) {
    removeExpense(selectedExpense.value.id);
    showDeleteModal.value = false;
  }
};

const openEditModal = (item: Expense) => {
  selectedExpense.value = item;
  Object.assign(tempExpense, item); // Fill the form with current item data
  showEditModal.value = true;
};

const saveEdit = () => {
  if (selectedExpense.value) {
    updateExpense(selectedExpense.value.id, { ...tempExpense });
    showEditModal.value = false;
  }
};
</script>
