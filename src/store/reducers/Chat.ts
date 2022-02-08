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
		default:
			return state;
	}
};
export default chatReducer;
