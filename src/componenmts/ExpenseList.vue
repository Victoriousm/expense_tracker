<template>
  <div class="w-full px-6 py-6">
    <div
      class="dark:bg-slate-800 dark:border-gray-700 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div v-if="expenses.length === 0" class="p-20 text-center">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white">
          No expenses yet
        </h3>
        <p class="text-gray-500 dark:text-white">
          Start by adding your first expense above.
        </p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr
              class="bg-gray-50 border-b border-gray-100 dark:bg-slate-800 dark:border-gray-900"
            >
              <th
                class="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest dark:text-white"
              >
                Date
              </th>
              <th
                class="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest dark:text-white"
              >
                Category
              </th>
              <th
                class="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest dark:text-white"
              >
                Description
              </th>
              <th
                class="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right dark:text-white"
              >
                Amount
              </th>
              <th
                class="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center dark:text-white"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50 dark:divide-gray-600">
            <tr
              v-for="item in expenses"
              :key="item.id"
              class="hover:bg-indigo-50/30 transition-colors"
            >
              <td class="p-4 text-gray-600 dark:text-white">{{ item.date }}</td>
              <td class="p-4">
                <span
                  class="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 capitalize w-20"
                >
                  {{ item.category }}
                </span>
              </td>
              <td class="p-4 text-gray-900 font-medium dark:text-white">
                {{ item.description }}
              </td>
              <td
                class="p-4 text-right font-bold text-gray-900 dark:text-white"
              >
                ${{ item.amount.toFixed(2) }}
              </td>
              <td class="p-4 text-center">
                <div class="flex justify-center gap-3">
                  <button
                    @click="openEditModal(item)"
                    class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
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
                    class="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
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
        <p class="text-gray-500 mt-2">
          Are you sure you want to delete
          <span class="font-bold text-gray-800"
            >"{{ selectedExpense?.description }}"</span
          >?
        </p>
        <div class="flex gap-3 mt-6">
          <button
            @click="showDeleteModal = false"
            class="flex-1 px-4 py-2 bg-gray-100 rounded-xl font-semibold"
          >
            Cancel
          </button>
          <button
            @click="confirmDelete"
            class="flex-1 px-4 py-2 bg-rose-600 text-white rounded-xl font-semibold"
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
      <div class="bg-white rounded-3xl p-8 max-w-lg w-full shadow-xl">
        <h3 class="text-2xl font-black text-indigo-600 mb-6">EDIT EXPENSE</h3>
        <form @submit.prevent="saveEdit" class="space-y-4">
          <input
            v-model="tempExpense.description"
            type="text"
            class="w-full p-3 border rounded-xl"
            placeholder="Description"
          />
          <input
            v-model.number="tempExpense.amount"
            type="number"
            class="w-full p-3 border rounded-xl"
            placeholder="Amount"
          />
          <input
            v-model="tempExpense.date"
            type="date"
            class="w-full p-3 border rounded-xl"
          />
          <select
            v-model="tempExpense.category"
            class="w-full p-3 border rounded-xl"
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
          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="showEditModal = false"
              class="flex-1 py-3 bg-gray-100 rounded-xl font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold"
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
import { useExpense } from "../composables/useComposables";
import type { Expense } from "../types/types";

const { expenses, removeExpense, updateExpense } = useExpense();

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
