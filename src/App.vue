<script setup>
import NavBar from "./componenmts/NavBar.vue";
import SummaryCards from "./componenmts/SummaryCards.vue";
import AddExpense from "./componenmts/AddExpense.vue";
import FilterAndSearch from "./componenmts/FilterAndSearch.vue";
import ExpenseList from "./componenmts/ExpenseList.vue";
import TheFooter from "./componenmts/TheFooter.vue";
/* import ExpenseHistory from "./componenmts/ExpenseHistory.vue"; */
import FinanceTracker from "./componenmts/FinanceTracker.vue";
</script>

<template>
  <NavBar />
  <SummaryCards />
  <AddExpense />
  <!--  <ExpenseHistory /> -->
  <FinanceTracker />
  <FilterAndSearch />
  <ExpenseList />
  <TheFooter />
</template>
