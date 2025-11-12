
import { GoogleGenAI } from "@google/genai";
import type { CartItem, Language } from '../types';

export const generateGiftIdeas = async (cartItems: CartItem[], language: Language, promptTemplate: string): Promise<string> => {
  if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set.");
    return "API Key not configured. Please ask the developer to set it up. In the meantime, how about a nice handmade card to go with your gift?";
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const itemNames = cartItems.map(item => {
    // For products with variants, show "Product Name (Variant Name)"
    if (item.variantName) {
      return `${item.productName[language]} (${item.variantName})`;
    }
    // Fallback for items that might not have variants in the future
    return item.productName[language];
  }).join(', ');

  const prompt = promptTemplate.replace('{items}', itemNames);

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: `You are a creative and friendly gift advisor. Respond in the language of the prompt (${language}). Format your response nicely using markdown.`,
            temperature: 0.7,
        }
    });
    return response.text;
  } catch (error) {
    console.error("Error generating gift ideas:", error);
    throw new Error("Failed to generate gift ideas from AI.");
  }
};
