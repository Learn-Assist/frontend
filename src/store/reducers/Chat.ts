import { initialState } from "..";

import * as types from "../types";

const chatReducer = (
	state = initialState.chats,
	action: types.dispatchAction
) => {
	switch (action.type) {
		case types.ADD_MESSAGE:
			return { ...state, messages: [...state.messages, action.payload] };
		case types.SET_INPUT:
			return { ...state, input: action.payload };
		case types.CLEAR_ALL:
			return { input: "", messages: [] };
		case types.SET_LOADING:
			return { ...state, loading: action.payload };
		case types.REMOVE_LOADING: {
			console.log("SET_LOADING_Remove", action.payload);
			const x = state.messages.filter((i) => i.type !== "loading");
			console.log("SET_LOADING_Remove", x);
			return { ...state, loading: false, messages: x };
		}
		default:
			return state;
	}
};
export default chatReducer;
