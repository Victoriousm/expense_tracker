<template>
  <div class="w-full px-2 sm:px-6 py-4 sm:py-6">
    <div
      class="dark:bg-slate-800 dark:border-gray-700 bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div
        v-if="filteredExpenses.length === 0"
        class="p-10 sm:p-20 text-center"
      >
        <h3 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
          No results found
        </h3>
        <p class="text-sm text-gray-500 dark:text-white">
          Try changing your filters or search terms.
        </p>
      </div>

      <div v-else class="overflow-x-auto scrollbar-hide">
        <table
          class="w-full text-left border-collapse min-w-[600px] md:min-w-full"
        >
          <thead>
            <tr
              class="bg-gray-50 border-b border-gray-100 dark:bg-slate-800 dark:border-gray-900"
            >
              <th
                class="p-3 sm:p-4 text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest dark:text-white"
              >
                Date
              </th>
              <th
                class="p-3 sm:p-4 text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest text-center dark:text-white"
              >
                Category
              </th>
              <th
                class="p-3 sm:p-4 text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest dark:text-white"
              >
                Description
              </th>
              <th
                class="p-3 sm:p-4 text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest text-right dark:text-white"
              >
                Amount
              </th>
              <th
                class="p-3 sm:p-4 text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest text-center dark:text-white"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50 dark:divide-gray-600">
            <tr
              v-for="item in filteredExpenses"
              :key="item.id"
              class="hover:bg-indigo-50/30 transition-colors"
            >
              <td
                class="p-3 sm:p-4 text-xs sm:text-sm text-gray-600 dark:text-white whitespace-nowrap"
              >
                {{ item.date }}
              </td>

              <td class="p-3 sm:p-4 text-center whitespace-nowrap">
                <span
                  class="inline-block px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-indigo-100 text-indigo-700 capitalize"
                >
                  {{ item.category }}
                </span>
              </td>

              <td
                class="p-3 sm:p-4 text-xs sm:text-sm text-gray-900 font-medium dark:text-white min-w-[150px]"
              >
                {{ item.description }}
              </td>

              <td
                class="p-3 sm:p-4 text-right font-bold text-xs sm:text-sm text-gray-900 dark:text-white tabular-nums"
              >
                ${{ item.amount.toFixed(2) }}
              </td>

              <td class="p-3 sm:p-4 text-center">
                <div class="flex justify-center gap-1 sm:gap-3">
                  <button
                    @click="openEditModal(item)"
                    class="p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 sm:h-5 sm:w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    @click="openDeleteModal(item)"
                    class="p-1.5 sm:p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 sm:h-5 sm:w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
        <h3 class="text-xl font-bold text-gray-900">Confirm Deletion</h3>
        <p class="text-gray-500 mt-2 text-sm">
          Are you sure you want to delete
          <span class="font-bold text-gray-800"
            >"{{ selectedExpense?.description }}"</span
          >?
        </p>
        <div class="flex gap-3 mt-6">
          <button
            @click="showDeleteModal = false"
            class="flex-1 px-4 py-2 bg-gray-100 rounded-xl font-semibold text-sm"
          >
            Cancel
          </button>
          <button
            @click="confirmDelete"
            class="flex-1 px-4 py-2 bg-rose-600 text-white rounded-xl font-semibold text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div
        class="dark:bg-gray-800 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 max-w-lg w-full shadow-xl overflow-y-auto max-h-[90vh]"
      >
        <h3
          class="dark:text-white text-xl sm:text-2xl font-black text-indigo-600 mb-4 sm:mb-6 uppercase"
        >
          Edit Expense
        </h3>
        <form @submit.prevent="saveEdit" class="space-y-3 sm:y-4">
          <input
            v-model="tempExpense.description"
            type="text"
            class="dark:text-white w-full p-2.5 sm:p-3 border rounded-xl text-sm dark:border-gray-600"
            placeholder="Description"
          />
          <input
            v-model.number="tempExpense.amount"
            type="number"
            class="dark:text-white w-full p-2.5 sm:p-3 border rounded-xl text-sm dark:border-gray-600"
            placeholder="Amount"
          />
          <input
            v-model="tempExpense.date"
            type="date"
            class="dark:text-white w-full p-2.5 sm:p-3 border rounded-xl text-sm dark:border-gray-600"
          />
          <select
            v-model="tempExpense.category"
            class="dark:text-white w-full p-2.5 sm:p-3 border rounded-xl text-sm dark:border-gray-600"
          >
            <option value="food & Dinning">Food & Dining</option>
            <option value="transportation">Transportation</option>
            <option value="shopping">Shopping</option>
            <option value="health">Health</option>
            <option value="bills & utilities">Bills & Utilities</option>
            <option value="healthcare">Healthcare</option>
            <option value="entertainment">Entertainment</option>
            <option value="other">Other</option>
          </select>
          <div class="flex gap-2 sm:gap-3 pt-4">
            <button
              type="button"
              @click="showEditModal = false"
              class="flex-1 py-2.5 sm:py-3 bg-gray-100 rounded-xl font-bold text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="flex-1 py-2.5 sm:py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useExpense } from "../composables/useExpenses";
import { useFilter } from "../composables/useFilters";
import type { Expense } from "../types/types";

const { expenses, removeExpense, updateExpense } = useExpense();
const { filteredExpenses } = useFilter(expenses);

const showDeleteModal = ref(false);
const showEditModal = ref(false);
const selectedExpense = ref<Expense | null>(null);

const tempExpense = reactive<Expense>({
  id: "",
  description: "",
  amount: 0,
  date: "",
  category: "other",
});

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
  Object.assign(tempExpense, item);
  showEditModal.value = true;
};

const saveEdit = () => {
  if (selectedExpense.value) {
    updateExpense(selectedExpense.value.id, { ...tempExpense });
    showEditModal.value = false;
  }
};
</script>
