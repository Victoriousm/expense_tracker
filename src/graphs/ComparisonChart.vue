<script setup lang="ts">
import { computed } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartOptions,
} from "chart.js";
import { useIncome } from "../composables/useIcomeSaving";
import { useExpense } from "../composables/useExpenses";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
);

const { income } = useIncome();
const { expenses } = useExpense();

// Calculate total expenses for the bar
const totalSpent = computed((): number => {
  return expenses.value.reduce((acc, curr) => acc + curr.amount, 0);
});

// Chart Data mapping
const chartData = computed(() => ({
  labels: ["Financial Health"],
  datasets: [
    {
      label: "Total Income",
      backgroundColor: "#10b981",
      data: [income.value],
    },
    {
      label: "Total Spent",
      backgroundColor: "#f43f5e",
      data: [totalSpent.value],
    },
  ],
}));

//Chart Options
const chartOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      labels: {
        usePointStyle: true,
        padding: 20,
        font: { size: 12, weight: "bold" },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: { display: false },
      ticks: {
        callback: (value) => "K " + value,
      },
    },
    x: {
      grid: { display: false },
    },
  },
};
</script>

<template>
  <div class="w-60 h-[300px] sm:h-[400px]">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
