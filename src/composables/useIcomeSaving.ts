import { ref, watch } from "vue";

const savedIncome = localStorage.getItem("user_income");
const savedSavings = localStorage.getItem("user_savings");
const savedAccount = localStorage.getItem("current_account");

const income = ref(savedIncome ? parseFloat(savedIncome) : 0);
const savings = ref(savedSavings ? parseFloat(savedSavings) : 0);
const currentAccount = ref(savedAccount ? parseFloat(savedAccount) : 0);

export function useIncome() {
  watch(income, (val) => localStorage.setItem("user_income", val.toString()));
  watch(savings, (val) => localStorage.setItem("user_savings", val.toString()));
  watch(currentAccount, (val) =>
    localStorage.setItem("current_account", val.toString()),
  );

  const setIncome = (amount: number) => {
    income.value = amount;
  };

  const setSavings = (amount: number) => {
    savings.value += amount;
  };

  const setAccountBalance = (amount: number) => {
    currentAccount.value += amount;
  };

  return {
    income,
    savings,
    currentAccount,
    setIncome,
    setSavings,
    setAccountBalance,
  };
}
