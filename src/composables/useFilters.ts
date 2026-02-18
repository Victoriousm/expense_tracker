import { ref, computed, type Ref } from "vue";
import type { Expense } from "../types/types";

// Create the refs OUTSIDE the function so they are shared
const searchQuery = ref("");
const selectedCategory = ref("All");
const fromDate = ref("");
const toDate = ref("");
const sortBy = ref("date-desc");

export function useFilter(expenses: Ref<Expense[]>) {
  const filteredExpenses = computed(() => {
    // 1. Filtering Logic
    let result = expenses.value.filter((expense) => {
      const matchesSearch = expense.description
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());

      const matchesCategory =
        selectedCategory.value === "All" ||
        expense.category === selectedCategory.value;

      const expenseDate = new Date(expense.date).getTime();
      const start = fromDate.value ? new Date(fromDate.value).getTime() : null;
      const end = toDate.value ? new Date(toDate.value).getTime() : null;

      const matchesFromDate = !start || expenseDate >= start;
      const matchesToDate = !end || expenseDate <= end;

      return (
        matchesSearch && matchesCategory && matchesFromDate && matchesToDate
      );
    });

    return result.sort((a, b) => {
      switch (sortBy.value) {
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "amount-desc":
          return b.amount - a.amount;
        case "amount-asc":
          return a.amount - b.amount;
        case "category-asc":
          return a.category.localeCompare(b.category);
        case "category-desc":
          return b.category.localeCompare(a.category);
        default:
          return 0;
      }
    });
  });

  const clearFilters = () => {
    searchQuery.value = "";
    selectedCategory.value = "All";
    fromDate.value = "";
    toDate.value = "";
    sortBy.value = "date-desc";
  };

  return {
    searchQuery,
    selectedCategory,
    fromDate,
    toDate,
    sortBy,
    filteredExpenses,
    clearFilters,
  };
}
