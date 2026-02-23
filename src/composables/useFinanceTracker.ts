import { ref, computed, watch } from "vue";

const storageKey = "finance_history_v1";

const loadHistory = (): any[] => {
  try {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Critical: Failed to load history from storage:", error);
    return [];
  }
};

// Keep history and selectedMonth outside the function so they stay synced globally
const history = ref<any[]>(loadHistory());
const selectedMonth = ref(new Date().toISOString().slice(0, 7));

watch(
  history,
  (newVal) => {
    localStorage.setItem(storageKey, JSON.stringify(newVal));
    if (typeof window !== "undefined") {
      (window as any).financeHistory = newVal;
    }
  },
  { deep: true, immediate: true },
);

export function useFinanceTracker() {
  const isModalOpen = ref(false);

  const monthlyHistory = computed(() => {
    return history.value.filter((item) =>
      item.date.startsWith(selectedMonth.value),
    );
  });

  const trueBalance = computed(() => {
    return monthlyHistory.value.reduce((acc, item) => {
      if (item.type === "income") return acc + item.amount;
      if (item.type === "expense" || item.type === "savings")
        return acc - item.amount;
      return acc;
    }, 0);
  });

  const toggleModal = () => {
    isModalOpen.value = !isModalOpen.value;
  };

  /**
   * Method 1: Clear ONLY the selected month
   */
  const clearMonthlyHistory = (): void => {
    const confirmMessage = `Clear all history for ${selectedMonth.value}?`;
    if (confirm(confirmMessage)) {
      history.value = history.value.filter(
        (item) => !item.date.startsWith(selectedMonth.value),
      );
      console.log(`History for ${selectedMonth.value} cleared.`);
    }
  };

  /**
   * Method 2: Clear EVERYTHING (Entire Storage)
   */
  const clearAllHistory = (): void => {
    if (
      confirm(
        "Are you sure you want to delete your ENTIRE history log? This cannot be undone.",
      )
    ) {
      history.value = [];
      console.log("Entire finance history cleared.");
    }
  };

  const saveMonthlySnapshot = (
    income: number,
    savings: number,
    expenses: number,
    targetDate?: string,
  ): void => {
    const activeDate = targetDate || selectedMonth.value;

    // GUARD 1: Don't save if everything is zero (empty state)
    if (income === 0 && savings === 0 && expenses === 0) {
      console.log("Snapshot Guard: Skipping save because all values are zero.");
      return;
    }

    // GUARD 2: Don't save if this is an identical duplicate of the last entry for this month
    const existingMonthEntries = history.value.filter((item) =>
      item.date.startsWith(activeDate),
    );

    if (existingMonthEntries.length > 0) {
      // Find the last entries for this month group by reversing a copy
      const reversed = [...existingMonthEntries].reverse();
      const lastIncome = reversed.find((e) => e.label.includes("Total Income"));
      const lastSavings = reversed.find((e) =>
        e.label.includes("Total Savings"),
      );
      const lastExpenses = reversed.find((e) =>
        e.label.includes("Total Expenses"),
      );

      const isDuplicate =
        lastIncome?.amount === Number(income) &&
        lastSavings?.amount === Number(savings) &&
        lastExpenses?.amount === Number(expenses);

      if (isDuplicate) {
        console.log(
          "Snapshot Guard: Skipping save. Data is identical to the existing record for",
          activeDate,
        );
        return;
      }
    }

    const timestamp = targetDate
      ? `${targetDate}-01T00:00:00Z`
      : new Date().toISOString();

    const dateObj = new Date(activeDate + "-01");
    const monthName = dateObj.toLocaleString("default", { month: "long" });

    const snapshotGroup = [
      {
        id: Date.now() + 1,
        date: timestamp,
        label: `${monthName} Total Income`,
        amount: Number(income),
        type: "income",
      },
      {
        id: Date.now() + 2,
        date: timestamp,
        label: `${monthName} Total Savings`,
        amount: Number(savings),
        type: "savings",
      },
      {
        id: Date.now() + 3,
        date: timestamp,
        label: `${monthName} Total Expenses`,
        amount: Number(expenses),
        type: "expense",
      },
    ];

    history.value = [...history.value, ...snapshotGroup];
  };

  return {
    isModalOpen,
    selectedMonth,
    monthlyHistory,
    trueBalance,
    toggleModal,
    saveMonthlySnapshot,
    clearMonthlyHistory,
    clearAllHistory,
  };
}
