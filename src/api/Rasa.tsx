import axios from "axios";
import dotenv from "dotenv";
import { useMutation } from "react-query";
import StoreContext, { actions } from "../store";
import { RASA_CHAT_URL } from "../config";
import { useContext } from "react";
import { v4 } from "uuid";
import { Message } from "../store/types/Chat";

dotenv.config();
const sendMessage = (body: { sender: string; message: string }) => {
	return axios({
		method: "POST",
		url: RASA_CHAT_URL,
		data: body,
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
	});
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
					replyMessage.image = data?.data[i].image;
				}
				dispatch(actions.chat.addMessage(replyMessage));
				if (replyMessage.message) {
					window.speechSynthesis.speak(
						new SpeechSynthesisUtterance(replyMessage.message)
					);
				}
			}
			if (store.audio.currentURL) {
				dispatch(actions.audio.addPrevURL(store.audio.currentURL));
				console.log("Prev URL", store.audio.prevURLs);
			}

			dispatch(actions.audio.setURL(false));
			dispatch(actions.chat.setInput(""));
		},
	});
};
