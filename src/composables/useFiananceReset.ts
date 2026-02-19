import { useIncome } from "./useIcomeSaving";
import { useExpense } from "./useExpenses";

export function useResetFinance() {
  const { income, savings, currentAccount } = useIncome();
  const { clearExpenses } = useExpense();

  /**
   * Resets all financial data to initial state
   */
  const resetAllData = (): void => {
    clearExpenses();
    income.value = 0;
    savings.value = 0;
    currentAccount.value = 0;
    localStorage.removeItem("user_income");
    localStorage.removeItem("user_savings");
    localStorage.removeItem("current_account");
  };

  return {
    resetAllData,
  };
}
