import { ref } from "vue";
import { GoogleGenAI } from "@google/genai";

export function useAIFinance() {
  const isTyping = ref(false);
  const messages = ref<{ role: "user" | "ai"; content: string }[]>([]);

  // ⚠️ Security Tip: In production, use environment variables (import.meta.env.VITE_GEMINI_KEY)
  const apiKey = "AIzaSyCGFmn6BZoK4MnR8WJvX0q6OQ-4prFQ3IQ";

  const askAI = async (
    userPrompt: string,
    context: { income: number; savings: number; expenses: number },
  ) => {
    isTyping.value = true;
    messages.value.push({ role: "user", content: userPrompt });

    try {
      // Logic adjustment: Current balance = Income - Expenses - Savings
      const currentBalance =
        context.income - context.expenses - context.savings;

      const systemContext = `You are a professional Financial Advisor. 
      The user's current financial snapshot:
      - Monthly Income: K ${context.income}
      - Allocated Savings: K ${context.savings}
      - Monthly Expenses: K ${context.expenses}
      - Remaining Disposable Balance: K ${currentBalance}
      
      Advice should be actionable. If they want to buy something, base it on their Disposable Balance.`;

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `${systemContext}\n\nUser Question: ${userPrompt}`,
      });

      const aiResponse =
        response.text || "I'm having trouble generating a response.";

      messages.value.push({ role: "ai", content: aiResponse });
    } catch (error) {
      console.error("AI Error:", error);
      messages.value.push({
        role: "ai",
        content:
          "Sorry, I couldn't connect to the advisor service. Please check your connection.",
      });
    } finally {
      isTyping.value = false;
    }
  };

  return { messages, isTyping, askAI };
}
