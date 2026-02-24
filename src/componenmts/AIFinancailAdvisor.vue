<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAIFinance } from '../composables/useAIFinance';
import { useIncome } from '../composables/useIcomeSaving';
import { useExpense } from '../composables/useExpenses';
import { useFinanceTracker } from '../composables/useFinanceTracker';

const { income, savings } = useIncome();
const { expenses } = useExpense();
const { selectedMonth } = useFinanceTracker();
const { messages, isTyping, askAI } = useAIFinance();

const userInput = ref("");
const isOpen = ref(false);

const handleSend = () => {
    if (!userInput.value.trim()) return;

    // Calculate expenses for current selected month
    const currentMonthExpenses = expenses.value
        .filter(e => e.date.startsWith(selectedMonth.value))
        .reduce((acc, item) => acc + item.amount, 0);

    askAI(userInput.value, {
        income: income.value,
        savings: savings.value,
        expenses: currentMonthExpenses
    });

    userInput.value = "";
};
</script>

<template>
    <div class="fixed bottom-6 right-6 z-[60]">
        <!-- Trigger Button -->
        <button @click="isOpen = !isOpen"
            class="w-14 h-14 bg-indigo-600 rounded-full shadow-2xl flex items-center justify-center text-white text-2xl hover:scale-110 transition-transform">
            {{ isOpen ? '✕' : '֎🇦🇮' }}
        </button>

        <!-- Chat Window -->
        <div v-if="isOpen"
            class="absolute bottom-20 right-0 w-[350px] bg-white dark:bg-slate-800 rounded-3xl shadow-3xl border border-gray-100 overflow-hidden flex flex-col">
            <div class="p-4 bg-indigo-600 text-white font-black uppercase text-xs tracking-widest">
                AI Finance Advisor
            </div>

            <div class="flex-1 h-[400px] overflow-y-auto p-4 space-y-4">
                <div v-for="(msg, i) in messages" :key="i"
                    :class="msg.role === 'user' ? 'ml-auto bg-indigo-100' : 'mr-auto bg-gray-100'"
                    class="max-w-[80%] p-3 rounded-2xl text-sm font-medium">
                    {{ msg.content }}
                </div>
                <div v-if="isTyping" class="text-xs text-gray-400 font-bold animate-pulse">AI is thinking...</div>
            </div>

            <div class="p-4 border-t border-gray-50 flex gap-2">
                <input v-model="userInput" @keyup.enter="handleSend" placeholder="Ask anything..."
                    class="flex-1 p-3 bg-gray-50 rounded-xl outline-none text-sm" />
                <button @click="handleSend" class="p-3 bg-indigo-600 text-white rounded-xl">➤</button>
            </div>
        </div>
    </div>
</template>
