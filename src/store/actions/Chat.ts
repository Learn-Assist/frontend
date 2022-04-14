import { type } from "os";
import { dispatchAction, message } from "../types";
import * as types from "../types/Chat";

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

export const clearAll = (): dispatchAction => {
	return {
		type: types.CLEAR_ALL,
		description: "Clear all messages from the chat.",
	};
};

export const setLoadingTrue = (): dispatchAction => {
	const message: message = {
		id: "APP",
		timeStamp: new Date(),
		message: "...",
		type: "loading",
		content: "text",
	};
	return {
		type: types.ADD_MESSAGE,
		payload: message,
		description: "Set the loading state of the chat.",
	};
};

export const setLoadingFalse = (): dispatchAction => {
	return {
		type: types.REMOVE_LOADING,
		description: "Remove the loading state of the chat.",
	};
};
