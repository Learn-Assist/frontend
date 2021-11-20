import { dispatchAction, message } from "../types";
import * as types from "../types/chatTypes";

export const addMessage = (message: message): dispatchAction => {
	return {
		type: types.ADD_MESSAGE,
		payload: message,
		description: "Add a message to the chat. " + message.message,
	};
};

export const setInput = (input: string): dispatchAction => {
	return {
		type: types.SET_INPUT,
		payload: input,
		description: "Set the input value of the chat.",
	};
};
