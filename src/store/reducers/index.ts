import { dispatchAction } from "../types";
import { audioReducer } from "./audioReducer";
import { chatReducer } from "./chatReducer";
import { toastReducer } from "./toastReducer";

const combineReducers = (slices: any) => (state: any, action: dispatchAction) =>
	Object.keys(slices).reduce(
		// use for..in loop, if you prefer it
		(acc, prop) => ({
			...acc,
			[prop]: slices[prop](acc[prop], action),
		}),
		state
	);

const reducers = {
	chats: chatReducer,
	audio: audioReducer,
	toasts: toastReducer,
};

export const rootReducer = combineReducers(reducers);
