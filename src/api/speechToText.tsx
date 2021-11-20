import axios from "axios";
import { useMutation } from "react-query";
import { SPEECH_TO_TEXT_URL } from "../config";
import { Message } from "../store/types/chatTypes";
import StoreContext, { actions } from "../store";
import { useContext } from "react";
import { useSendMessage } from "./RasaQueries";
import { Toast } from "../store/types/toastTypes";

const getTextFromSpeech = async (blob: Blob) => {
	const formData = new FormData();
	formData.append("file", blob);
	return axios.post(SPEECH_TO_TEXT_URL, formData);
};

export const useSpeechToText = () => {
	const { dispatch } = useContext(StoreContext);
	const sendMessage = useSendMessage();
	return useMutation(getTextFromSpeech, {
		onSuccess: (data) => {
			const message = new Message(
				"random_id",
				data.data,
				"randm",
				new Date(),
				"user"
			);
			dispatch(actions.chatActions.addMessage(message));
			dispatch(actions.chatActions.setInput(message.message));
			sendMessage.mutate({ sender: message.user, message: message.message });
		},
		onError: (error: any) => {
			console.log(error);
			dispatch(actions.chatActions.setInput(""));
			const toast = new Toast(
				"Failed to convert speech to text. Please provide a clear and valid audio.",
				"error",
				"short"
			);
			dispatch(actions.toastActions.addToast(toast));
			dispatch(actions.chatActions.setInput(""));
			dispatch(actions.audioActions.setURL(false));
		},
	});
};
