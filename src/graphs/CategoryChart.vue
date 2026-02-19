<script setup lang="ts">
import { computed } from "vue";
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useExpense } from "../composables/useExpenses";

ChartJS.register(ArcElement, Tooltip, Legend);

const { expenses } = useExpense();

const categories = [
  "food & Dinning",
  "transportation",
  "shopping",
  "health",
  "bills & utilities",
  "entertainment",
  "other",
];

const chartData = computed(() => {
  // Calculate totals for each category
  const dataValues = categories.map((cat) => {
    return expenses.value
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + e.amount, 0);
  });

  return {
    labels: [
      "food & Dinning",
      "transportation",
      "shopping",
      "health",
      "bills & utilities",
      "entertainment",
      "other",
    ],
    datasets: [
      {
        data: dataValues,
        backgroundColor: [
          "#6366f1", // Indigo
          "#10b981", // Emerald
          "#f43f5e", // Rose
          "#fbbf24", // Amber
          "#8b5cf6", // Violet
          "#ec4899", // Pink
          "#F0F8FF", // Alice Blue
        ],
        hoverOffset: 10,
        borderWidth: 0,
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        usePointStyle: true,
        font: { size: 11 },
      },
    },
  },
  // to give it space inside
  cutout: "10%",
};
</script>

<template>
  <div class="w-full h-[300px] flex items-center justify-center mt-10">
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>
