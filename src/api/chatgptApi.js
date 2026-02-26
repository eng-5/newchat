// import { GoogleGenerativeAI } from "@google/generative-ai";
// const API_KEY;
// const API_KEY_PRO;
export async function sendMsgToGemini(prompt, history = []) {
  try {
    const safeUserMessage = String(prompt ?? '').trim();
    const messages = [
      {
        role: 'system',
        content: 'You are a friendly, helpful assistant like a best friend. Be concise, fun when it fits, and remember the full conversation context.',
      },
      ...history.map(msg => ({
        role: msg.isbot ? 'assistant' : 'user',
        content: msg.message.trim(),
      })),
      // Finally add the newest user message
      { role: 'user', content: safeUserMessage },
    ];
    console.log('Sending messages to server:', messages);
    const API_BASE_URL = 'https://chatbot-bfnu.onrender.com'
    const res = await fetch(`${API_BASE_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages
      }),
    });

    const data = await res.json();
    return data.text;
  } catch (err) {
    console.error(err);
  }
}
  


// Make sure to include the following import:
// import {GoogleGenAI} from '@google/genai';
// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// const response = await ai.models.generateContentStream({
//   model: "gemini-2.0-flash",
//   contents: "Write a story about a magic backpack.",
// });
// let text = "";
// for await (const chunk of response) {
//   console.log(chunk.text);
//   text += chunk.text;
// }

// import { GoogleGenerativeAI } from "@google/generative-ai";

// const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
// const genAI = new GoogleGenerativeAI(API_KEY);
// export async function sendMsgToGemini(message, onChunk) {
//     try {
//         const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        
//         // Switch to generateContentStream for that "typing" effect
//         const result = await model.generateContentStream(message);

//         let fullText = "";
//         for await (const chunk of result.stream) {
//             const chunkText = chunk.text();
//             fullText += chunkText;
            
//             // Pass the updated text back to your UI in real-time
//             if (onChunk) onChunk(fullText); 
//         }

//         return fullText;
//     } catch (error) {
//         console.error("Gemini API Error:", error);
//         // This helps you see the REAL error in the console
//         throw new Error(error.message || "Failed to get response from AI");
//     }
// }

