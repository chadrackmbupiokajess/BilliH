
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getIcebreaker = async (myProfile: any, theirProfile: any) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Génère 3 phrases d'accroche (icebreakers) originales et bienveillantes pour engager la conversation entre ces deux personnes.
    
    Moi: ${myProfile.name}, ${myProfile.age} ans, centres d'intérêt: ${myProfile.interests.join(', ')}.
    Cible: ${theirProfile.name}, ${theirProfile.age} ans, bio: "${theirProfile.bio}", centres d'intérêt: ${theirProfile.interests.join(', ')}.
    
    Format: JSON array de strings uniquement.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      }
    }
  });
  
  try {
    return JSON.parse(response.text || "[]");
  } catch (e) {
    return ["Salut ! J'aime beaucoup ton profil.", "Comment se passe ta journée ?", "Ravi de te croiser ici !"];
  }
};

export const getDatingAdvice = async (question: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: question,
    config: {
      systemInstruction: "Tu es un coach en relations amoureuses expert, empathique et moderne. Tu aides les gens à trouver un partenaire sérieux pour la vie. Tes conseils sont basés sur la communication saine et l'authenticité.",
    }
  });
  return response.text;
};
