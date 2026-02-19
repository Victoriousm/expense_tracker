<script setup lang="ts">
import { computed } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
} from "chart.js";
import { useExpense } from "../composables/useExpenses";

// Register Line-specific components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
);

const { expenses } = useExpense();

const chartData = computed(() => {
  // removes duplicates and arranges fron newest to oldest
  const sortedExpenses = [...expenses.value].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  //Group totals by date
  const dateTotals: Record<string, number> = {};
  sortedExpenses.forEach((exp) => {
    dateTotals[exp.date] = (dateTotals[exp.date] || 0) + exp.amount;
  });

  return {
    //dates on x-axis
    labels: Object.keys(dateTotals),
    datasets: [
      {
        label: "Daily Spending",
        //amounts on y-axis
        data: Object.values(dateTotals),
        borderColor: "#6366f1",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        fill: true,
        //for a smooth curvy line
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#6366f1",
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: { beginAtZero: true, grid: { color: "#f3f4f6" } },
    x: { grid: { display: false } },
  },
};
</script>

<template>
  <div class="h-[300px] w-full mt-10">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>
