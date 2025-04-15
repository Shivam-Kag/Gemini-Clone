# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.




"" API



// import { GoogleGenAI, HarmBlockMethod } from "@google/genai";

import {
    GoogleGenAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/genai"

const MODEL_NAME ="gemini-2.0-flash"
const API_KEY = ""



async function runChat(prompt) {
  const genAI = new GoogleGenAI(API_KEY);
  const model = genAI.getGenerativeModel({model : MODEL_NAME});

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

  const chat = model.startchat({
    generationConfig,
    safetySettings,
    history:[
    ],
  });

  const result = await chat.sendMessage("YOUR_USER_INPUT");
  const response = result.response;

  console.log(response.text(prompt));
}

export default runChat;



const API_KEY =  "AIzaSyAtfuSCQ5Mdm-K7E95hEK93T5x2jm4DgTQ"
