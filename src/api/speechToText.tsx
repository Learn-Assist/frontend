import axios from "axios";
import { useMutation } from "react-query";
import { SPEECH_TO_TEXT_URL } from "../config";
import { Message } from "../store/types/Chat";
import StoreContext, { actions } from "../store";
import { useContext } from "react";
import { useSendMessage } from "./Rasa";
import { Toast } from "../store/types/toast";

const getTextFromSpeech = async (blob: Blob) => {
	const formData = new FormData();
	formData.append("file", blob);
	//return axios.post(SPEECH_TO_TEXT_URL, formData);
	return axios({
		method: "POST",
		url: SPEECH_TO_TEXT_URL,
		data: formData,
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
	});
};

export const useSpeechToText = () => {
	const { store, dispatch } = useContext(StoreContext);
	const sendMessage = useSendMessage();
	return useMutation(getTextFromSpeech, {
		onMutate: () => {
			dispatch(actions.chat.setLoadingTrue());
		},
		onSuccess: (data) => {
			dispatch(actions.chat.setLoadingFalse());
			const message = new Message(
				"random_id",
				data.data,
				store.user.uid as string,
				new Date(),
				"user",
				"text"
			);

			dispatch(actions.chat.addMessage(message));
			dispatch(actions.chat.setInput(message.message));
			sendMessage.mutate({ sender: message.user, message: message.message });
		},
		onError: (error: any) => {
			console.log(error);
			dispatch(actions.chat.setInput(""));
			const toast = new Toast(
				"Failed to convert speech to text. Please provide a clear and valid audio.",
				"error",
				"long"
			);

			dispatch(actions.toast.addToast(toast));
			dispatch(actions.chat.setInput(""));
			dispatch(actions.audio.setURL(false));
		},
	});
};
