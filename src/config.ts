import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const RASA_CHAT_URL = "http://localhost:5005/webhooks/rest/webhook";
//process.env.RASA_CHAT_URL ||
// "https://nlu-server-amnjutsbkq-el.a.run.app/webhooks/rest/webhook";

export const SPEECH_TO_TEXT_URL = "http://localhost:3005/audio";
//process.env.SPEECH_TO_TEXT_URL ||
// "https://learn-assist-speech-to-text-amnjutsbkq-el.a.run.app/audio";
export const BACKEND_URL = "http://localhost:8080";
// export const BACKEND_URL = "https://database-yrh27rcwya-uc.a.run.app";
//process.env.BACKEND_URL ||
// "https://learn-assist-database-amnjutsbkq-el.a.run.app";

const firebaseConfig = {
	apiKey: "AIzaSyAXz5iRnCRZ9B38t6xlavStcha4d0bci4s",
	authDomain: "learnassist-bf264.firebaseapp.com",
	projectId: "learnassist-bf264",
	storageBucket: "learnassist-bf264.appspot.com",
	messagingSenderId: "749383834870",
	appId: "1:749383834870:web:f1e89781d00d86682220d7",
};
const firebaseConfigLanding = {
	apiKey: "AIzaSyAQfKuXTuDzkj4AA2ZaPs_IWmREq8fLJGQ",
	authDomain: "learn-assist-landing.firebaseapp.com",
	projectId: "learn-assist-landing",
	storageBucket: "learn-assist-landing.appspot.com",
	messagingSenderId: "1078510760385",
	appId: "1:1078510760385:web:f553433c9ec976df397f40",
	measurementId: "G-X0JHBPTT55",
};

export const app = initializeApp(firebaseConfig);
export const _app = initializeApp(
	firebaseConfigLanding,
	"learn-assist-landing"
);
getAnalytics(app);

export const OpenAIApiUrl = "http://localhost:9876";
