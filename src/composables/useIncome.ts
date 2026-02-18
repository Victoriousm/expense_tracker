// useIncome.ts
import { ref, watch } from "vue";

const savedIncome = localStorage.getItem("user_income");
const income = ref(savedIncome ? parseFloat(savedIncome) : 0);

export function useIncome() {
  // Make sure 'export' is here!
  watch(income, (newVal) => {
    localStorage.setItem("user_income", newVal.toString());
  });

  const setIncome = (amount: number) => {
    income.value = amount;
  };

  return {
    income,
    setIncome,
  };
}
