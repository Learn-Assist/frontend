import axios from "axios";
import dotenv from "dotenv";
import { useMutation } from "react-query";
import StoreContext, { actions } from "../store";
import { RASA_CHAT_URL } from "../config";
import { useContext, useEffect } from "react";
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
	useEffect(() => {}, []);
	return useMutation(sendMessage, {
		onSuccess: (data) => {
			dispatch(actions.chat.setLoadingFalse());
			console.log("Rasa data", data);
			const input = store.chats.input;
			for (let i in data?.data) {
				if (data?.data[i].text) {
					const replyMessage = new Message(
						data?.data[i].recipient_id || "guest",
						data?.data[i].text,
						v4(),
						new Date(),
						"bot",
						"text"
					);
					dispatch(actions.chat.addMessage(replyMessage));
					if (replyMessage.message) {
						window.speechSynthesis.speak(
							new SpeechSynthesisUtterance(replyMessage.message)
						);
					}
				}
				if (data?.data[i].custom) {
					if (data?.data[i].custom.buttons) {
						console.log("buttons", data?.data[i].custom.buttons);
						const replyMessage = new Message(
							data?.data[i].recipient_id || "guest",
							"",
							v4(),
							new Date(),
							"buttons",
							"text"
						);
						replyMessage.buttons = data?.data[i].custom.buttons;
						dispatch(actions.chat.addMessage(replyMessage));
					} else {
						for (let j of data?.data[i].custom) {
							const replyMessage = new Message(
								data?.data[i].recipient_id || "guest",
								j.content,
								v4(),
								new Date(),
								"bot",
								j.type
							);
							dispatch(actions.chat.addMessage(replyMessage));
							if (replyMessage.content === "text") {
								window.speechSynthesis.speak(
									new SpeechSynthesisUtterance(replyMessage.message)
								);
							}
							if (
								replyMessage.content === "video" ||
								replyMessage.content === "audio"
							) {
								window.speechSynthesis.cancel();
							}
						}
					}
				}
			}

			if (store.audio.currentURL) {
				dispatch(actions.audio.addPrevURL(store.audio.currentURL));
				console.log("Prev URL", store.audio.prevURLs);
			}
			dispatch(actions.audio.setURL(false));
			if (input === store.chats.input) dispatch(actions.chat.setInput(""));
		},
	});
};
