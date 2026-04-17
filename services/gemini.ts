
import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.API_KEY;
// On n'initialise l'IA que si la clé est présente
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getIcebreaker = async (myProfile: any, theirProfile: any) => {
  if (!ai) {
    // Mode démo sans clé API
    console.warn("Mode Démo: Pas de GEMINI_API_KEY trouvée.");
    return [
      `Salut ${theirProfile.name} ! J'ai vu que tu aimes ${theirProfile.interests[0]}, moi aussi !`,
      "Ta bio m'a beaucoup intrigué, comment vas-tu ?",
      `Ravi de te croiser ${theirProfile.name}, tu as l'air d'avoir une super énergie !`
    ];
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
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

    return JSON.parse(response.text || "[]");
  } catch (e) {
    console.error("Erreur Gemini:", e);
    return ["Salut ! J'aime beaucoup ton profil.", "Comment se passe ta journée ?", "Ravi de te croiser ici !"];
  }
};

export const getDatingAdvice = async (question: string) => {
  if (!ai) {
    return "Mode Démo : C'est une excellente question ! En général, l'authenticité est la clé d'une rencontre réussie. (Configurez une clé GEMINI_API_KEY pour des conseils personnalisés)";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: question,
      config: {
        systemInstruction: "Tu es un coach en relations amoureuses expert, empathique et moderne. Tu aides les gens à trouver un partenaire sérieux pour la vie. Tes conseils sont basés sur la communication saine et l'authenticité.",
      }
    });
    return response.text;
  } catch (e) {
    return "Désolé, je rencontre une petite difficulté technique pour vous répondre.";
  }
};
