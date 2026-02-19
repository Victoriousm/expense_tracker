import { ref, Ref } from "vue";
import { Expense } from "../types/types";

const STORAGE_KEY = "expenses";

// This MUST be outside the function to be shared across all components
const expenses: Ref<Expense[]> = ref<Expense[]>(
  JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"),
);

export function useExpense() {
  // Helper to ensure we always use the same key
  const syncStorage = (): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses.value));
  };

  const addExpense = (expense: Omit<Expense, "id">): void => {
    const newExpense: Expense = {
      ...expense,
      // Ensure id is a string to match your removeExpense type
      id: crypto.randomUUID(),
    };
    expenses.value.push(newExpense);
    syncStorage();
  };

  const removeExpense = (id: string): void => {
    expenses.value = expenses.value.filter((e) => e.id !== id);
    syncStorage();
  };
  const updateExpense = (id: string, updatedExpense: Expense): void => {
    expenses.value = expenses.value.map((expense) =>
      expense.id === id ? updatedExpense : expense,
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses.value));
  };

  const clearExpenses = (): void => {
    // We modify the value of the existing ref
    expenses.value = [];
  };

  return {
    expenses, // Return the same ref to everyone
    addExpense,
    removeExpense,
    updateExpense,
    clearExpenses,
  };
}
