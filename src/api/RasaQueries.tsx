import axios from "axios";
import dotenv from "dotenv";
import { useMutation } from "react-query";
import StoreContext, { actions } from "../store";
import { RASA_CHAT_URL } from "../config";
import { useContext } from "react";
import { v4 } from "uuid";
import { Message } from "../store/types/chatTypes";

dotenv.config();
const sendMessage = (body: { sender: string; message: string }) => {
	return axios.post(RASA_CHAT_URL, body);
};

export const useSendMessage = () => {
	const { store, dispatch } = useContext(StoreContext);
	return useMutation(sendMessage, {
		onSuccess: (data) => {
			for (let i in data?.data) {
				const replyMessage = new Message(
					"random_id",
					data?.data[i].text,
					v4(),
					new Date(),
					"bot"
				);
				if (!replyMessage.message && data?.data[i].image) {
					console.log("Image exists", data.data[i].image);
					replyMessage.image = data?.data[i].image;
				}
				dispatch(actions.chatActions.addMessage(replyMessage));
				console.log("Bot reply", replyMessage, data?.data);
				if (replyMessage.message) {
					window.speechSynthesis.speak(
						new SpeechSynthesisUtterance(replyMessage.message)
					);
				}
			}
			if (store.audio.currentURL)
				dispatch(actions.audioActions.addPrevURL(store.audio.currentURL));
			dispatch(actions.audioActions.setURL(false));
			dispatch(actions.chatActions.setInput(""));
		},
	});
};
