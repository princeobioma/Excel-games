import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

// Initialize Gemini
// We assume process.env.API_KEY is pre-configured and valid.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSantaResponse = async (history: ChatMessage[], userMessage: string): Promise<string> => {
  try {
    // Construct a simple history string or use the chat API. 
    // For simplicity and specialized persona, we'll send a generation request with system instructions.
    
    const prompt = `
      You are Cyber-Santa, a futuristic version of Santa Claus who is obsessed with video games, esports, and technology.
      
      User message: "${userMessage}"
      
      Guidelines:
      1. Use gamer slang (poggers, gg, noob, glitch, nerf, buff) mixed with Christmas cheer.
      2. Be helpful but keep it entertaining.
      3. Keep response under 300 characters.
      4. If asked about games, recommend high-energy titles.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Glitch in the matrix... Ho ho no?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "My servers are frozen solid! Try again later, gamer.";
  }
};