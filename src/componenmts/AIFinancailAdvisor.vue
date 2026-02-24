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
    <div class="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[60] font-sans">
        <button @click="isOpen = !isOpen"
            class="w-14 h-14 bg-indigo-600 rounded-2xl shadow-lg flex items-center justify-center text-white transition-all duration-300 hover:shadow-indigo-300/50 hover:-translate-y-1 active:scale-95">
            <span v-if="!isOpen" class="text-2xl">֎</span>
            <span v-else class="text-xl">✕</span>
        </button>

        <transition enter-active-class="transition duration-300 ease-out"
            enter-from-class="transform scale-95 opacity-0 translate-y-10"
            enter-to-class="transform scale-100 opacity-100 translate-y-0"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="transform scale-100 opacity-100 translate-y-0"
            leave-to-class="transform scale-95 opacity-0 translate-y-10">
            <div v-if="isOpen" class="absolute bottom-18 right-0 
               /* Responsive Widths */
               w-[92vw] sm:w-[380px] md:w-[420px] 
               /* Responsive Heights & Scrolling Fix */
               h-[70vh] max-h-[600px] min-h-[400px]
               bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl 
               border border-slate-100 dark:border-slate-800 
               flex flex-col overflow-hidden">
                <div class="px-6 py-4 bg-indigo-600 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span class="text-white font-semibold text-sm tracking-wide">AI Financial Advisor</span>
                    </div>
                    <button @click="isOpen = false" class="text-indigo-200 hover:text-white transition-colors">
                        <small>Hide</small>
                    </button>
                </div>

                <div class="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50 dark:bg-slate-900/50 custom-scrollbar">
                    <div v-for="(msg, i) in messages" :key="i"
                        :class="msg.role === 'user' ? 'justify-end' : 'justify-start'" class="flex w-full">
                        <div :class="msg.role === 'user'
                            ? 'bg-indigo-600 text-white rounded-2xl rounded-tr-none'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-2xl rounded-tl-none'"
                            class="max-w-[85%] p-4 shadow-sm text-sm leading-relaxed break-words">
                            {{ msg.content }}
                        </div>
                    </div>

                    <div v-if="isTyping" class="flex gap-1 items-center p-2">
                        <span class="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
                        <span
                            class="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                        <span
                            class="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                </div>

                <div class="p-4 bg-white dark:bg-slate-900 border-t border-slate-50 dark:border-slate-800">
                    <div class="relative flex items-center">
                        <input v-model="userInput" @keyup.enter="handleSend" placeholder="Ask about your budget..."
                            class="w-full pl-4 pr-12 py-3 bg-slate-100 dark:bg-slate-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all dark:text-white" />
                        <button @click="handleSend"
                            class="absolute right-2 p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                        </button>
                    </div>
                    <p class="text-[10px] text-slate-400 text-center mt-2 uppercase tracking-tighter opacity-60">
                        Powered by Gemini 1.5 Flash
                    </p>
                </div>
            </div>
        </transition>
    </div>
</template>

<style scoped>
/* Custom Scrollbar for a "SaaS" look */
.custom-scrollbar::-webkit-scrollbar {
    width: 5px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 10px;
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #334155;
}

/* Fix for long text breaking the layout */
.break-words {
    word-break: break-word;
    overflow-wrap: break-word;
}
</style>