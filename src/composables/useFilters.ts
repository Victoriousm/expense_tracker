import { ref, computed, type Ref } from "vue";
import type { Expense } from "../types/types";

export function useFilter(expenses: Ref<Expense[]>) {
  const searchQuery = ref("");
  const selectedCategory = ref("All");

  const filteredExpenses = computed(() => {
    return expenses.value.filter((expense) => {
      const matchesSearch = expense.description
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());
      const matchesCategory =
        selectedCategory.value === "All" ||
        expense.category === selectedCategory.value;
      return matchesSearch && matchesCategory;
    });
  });

  return {
    searchQuery,
    selectedCategory,
    filteredExpenses,
  };
}
