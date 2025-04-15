
// import { GoogleGenAI, HarmBlockMethod } from "@google/genai";
// "AIzaSyD2go4PBmA4hCag3DU-4BU3jLDiJq9Gifc"

import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";

const MODEL_NAME ="gemini-2.0-flash"
const API_KEY =  "AIzaSyAtfuSCQ5Mdm-K7E95hEK93T5x2jm4DgTQ"



async function runChat(prompt) {
  const genAI = new  GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({model:MODEL_NAME})

  const generationConfig ={
    temperature :0.9,
    topK:1,
    topP:1,
    maxOutputTokens:2048,
  };

  const safetySettings = [
    {
    category : HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold : HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
    category : HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold : HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
    category : HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold : HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
    category : HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold : HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history:[
    ],
  });

  const result = await chat.sendMessage(prompt);
  const response = result.response;

  console.log(response.text());
  return response.text();
}

export default runChat;