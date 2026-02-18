import { ref } from "vue";
import { Expense } from "../types/types";

const STORAGE_KEY = "expenses";

const expenses = ref<Expense[]>(
  JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"),
);

export function useExpense() {
  const addExpense = (expense: Omit<Expense, "id">): void => {
    const newExpense: Expense = {
      ...expense,
      id: crypto.randomUUID(),
    };
    expenses.value.push(newExpense);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses.value));
  };

  const removeExpense = (id: string): void => {
    expenses.value = expenses.value.filter((expense) => expense.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses.value));
  };

  const updateExpense = (id: string, updatedExpense: Expense): void => {
    expenses.value = expenses.value.map((expense) =>
      expense.id === id ? updatedExpense : expense,
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses.value));
  };

  return {
    expenses,
    addExpense,
    removeExpense,
    updateExpense,
  };
}
