
import { GoogleGenAI, Type } from "@google/genai";
import { Quote } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchNewQuotes = async (categoryName: string): Promise<Quote[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Gere 5 frases motivacionais inspiradoras em português para a categoria "${categoryName}". Retorne um JSON array de objetos com "text" (frase) e "author" (autor ou "Anônimo").`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING },
              author: { type: Type.STRING },
            },
            required: ["text", "author"],
          },
        },
      },
    });

    const data = JSON.parse(response.text);
    return data.map((item: any, index: number) => ({
      id: `ai-${Date.now()}-${index}`,
      text: item.text,
      author: item.author,
      category: categoryName.toLowerCase(),
    }));
  } catch (error) {
    console.error("Erro ao buscar frases no Gemini:", error);
    return [];
  }
};

export const getDailyQuote = async (): Promise<Quote> => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Gere uma frase de motivação excepcional para hoje em português. Retorne um JSON com 'text' e 'author'.",
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING },
              author: { type: Type.STRING },
            },
            required: ["text", "author"],
          },
        },
      });
  
      const data = JSON.parse(response.text);
      return {
        id: `daily-${Date.now()}`,
        text: data.text,
        author: data.author,
        category: "daily",
      };
    } catch (error) {
      return {
        id: "default-daily",
        text: "Acredite que você pode e você já está no meio do caminho.",
        author: "Theodore Roosevelt",
        category: "daily"
      };
    }
  };
