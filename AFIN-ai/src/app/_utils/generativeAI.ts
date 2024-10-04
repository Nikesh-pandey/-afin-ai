// src/utils/generativeAI.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

// Ensure the API key is available from the environment
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('API Key is missing in environment variables.');
}

// Initialize the Google Generative AI with the API key
const genAI = new GoogleGenerativeAI(apiKey);

// Define the generation model configuration
const model = genAI.getGenerativeModel({
  model: 'gemini-1.0-pro',
});

const generationConfig = {
  temperature: 0.9,
  topP: 1,
  maxOutputTokens: 2048,
  responseMimeType: 'text/plain',
};

// Define TypeScript interface for the response
interface MessageResponse {
  response: {
    text(): string;
  };
}

// Define the async function to send a message and get a response from the model
export const sendMessage = async (message: string): Promise<string> => {
  try {
    // Check if the message contains a question about the creator of the website
    const creatorKeywords = [
      "who's the creator",
      'who created',
      'creator of the website',
      'made this website',
    ];
    const lowerCaseMessage = message.toLowerCase();

    for (const keyword of creatorKeywords) {
      if (lowerCaseMessage.includes(keyword)) {
        return 'The creator of this website is my maestro Debayudh.';
      }
    }

    // Proceed with the AI model if no keywords are detected
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    // Get the AI response
    const result: MessageResponse = await chatSession.sendMessage(message);

    // Return the AI's response
    return result.response.text();
  } catch (error) {
    console.error('Error sending message to AI:', error);
    return 'Sorry, I encountered an issue processing your request.';
  }
};
