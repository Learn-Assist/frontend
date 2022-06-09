import { dispatchAction, appReducerState } from "../types";
import chat from "./Chat";
import audio from "./Audio";
import toast from "./Toast";
import user from "./User";
import conference from "./Conference";

const combineReducers = (slices: any) => (state: any, action: dispatchAction) =>
	Object.keys(slices).reduce(
		// use for..in loop, if you prefer it
		(acc, prop) => ({
			...acc,
			[prop]: slices[prop](acc[prop], action),
		}),
		state
	);

const reducer = (
	state: appReducerState,
	action: dispatchAction
): appReducerState => {
	switch (action.type) {
		case "SET_USER_STATE":
			return {
				...state,
				userStatus: action.payload,
			};
		default:
			return state;
	}
};

const reducers = {
	app: reducer,
	chats: chat,
	audio: audio,
	toasts: toast,
	user: user,
	conference: conference,
};

export const rootReducer = combineReducers(reducers);
