import { ref, watch, Ref } from "vue";

// Retrieve and parse initial values
const savedIncome: string | null = localStorage.getItem("user_income");
const savedSavings: string | null = localStorage.getItem("user_savings");
const savedCurrentAccount: string | null =
  localStorage.getItem("current_account");

// Initialize refs with explicit number types
const income: Ref<number> = ref(savedIncome ? parseFloat(savedIncome) : 0);
const savings: Ref<number> = ref(savedSavings ? parseFloat(savedSavings) : 0);
const currentAccount: Ref<number> = ref(
  savedCurrentAccount ? parseFloat(savedCurrentAccount) : 0,
);

export function useIncome() {
  // Watchers to sync with localStorage
  watch(income, (val: number) =>
    localStorage.setItem("user_income", val.toString()),
  );
  watch(savings, (val: number) =>
    localStorage.setItem("user_savings", val.toString()),
  );
  watch(currentAccount, (val: number) =>
    localStorage.setItem("current_account", val.toString()),
  );

  // Updates the base monthly income reference
  const setIncome = (amount: number): void => {
    income.value = amount;
  };

  // Adds to the total savings bucket
  const setSavings = (amount: number): void => {
    savings.value += amount;
  };

  /**
   * ADDS new income to the current account balance.
   * This ensures the "already saved" value is preserved.
   */
  const addIncomeToBalance = (amount: number): void => {
    currentAccount.value += amount;
  };

  return {
    income,
    savings,
    currentAccount,
    setIncome,
    setSavings,
    addIncomeToBalance,
  };
}
