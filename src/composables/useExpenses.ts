import { ref, Ref } from "vue";
import { Expense } from "../types/types";

const STORAGE_KEY = "expenses"; // This is the single source of truth

// Shared state outside the function
const expenses: Ref<Expense[]> = ref<Expense[]>(
  JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"),
);

export function useExpense() {
  // STRICT HELPER: Ensures we always use the correct STORAGE_KEY
  const syncToLocalStorage = (data: Expense[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const addExpense = (expense: Omit<Expense, "id">): void => {
    const newExpense: Expense = {
      ...expense,
      id: crypto.randomUUID(),
    };
    expenses.value.push(newExpense);
    syncToLocalStorage(expenses.value);
  };

  const removeExpense = (id: string): void => {
    expenses.value = expenses.value.filter((e) => e.id !== id);
    syncToLocalStorage(expenses.value);
  };

  const updateExpense = (id: string, updatedExpense: Expense): void => {
    expenses.value = expenses.value.map((e) =>
      e.id === id ? updatedExpense : e,
    );
    syncToLocalStorage(expenses.value);
  };

  // FIXED: Now uses the same STORAGE_KEY helper
  const clearExpenses = (): void => {
    expenses.value = [];
    syncToLocalStorage([]); // Wipes the "expenses" key specifically
    console.log("Expenses wiped from storage key:", STORAGE_KEY);
  };

  return {
    expenses,
    addExpense,
    removeExpense,
    updateExpense,
    clearExpenses,
  };
}
