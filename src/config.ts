import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const RASA_CHAT_URL = "http://localhost:5005/webhooks/rest/webhook";
export const SPEECH_TO_TEXT_URL = "http://localhost:3005/audio";
export const BACKEND_URL = "http://localhost:8080";

const firebaseConfig = {
	apiKey: "AIzaSyAXz5iRnCRZ9B38t6xlavStcha4d0bci4s",
	authDomain: "learnassist-bf264.firebaseapp.com",
	projectId: "learnassist-bf264",
	storageBucket: "learnassist-bf264.appspot.com",
	messagingSenderId: "749383834870",
	appId: "1:749383834870:web:f1e89781d00d86682220d7",
};

export const app = initializeApp(firebaseConfig);

getAnalytics(app);

export const OpenAIApiUrl = "http://localhost:9876";
