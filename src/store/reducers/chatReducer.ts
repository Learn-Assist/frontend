import { initialState } from "..";
import { dispatchAction } from "../types";
import * as types from "../types/chatTypes";
export const chatReducer = (
	state = initialState.chats,
	action: dispatchAction
) => {
	switch (action.type) {
		case types.ADD_MESSAGE:
			return { ...state, messages: [...state.messages, action.payload] };
		case types.SET_INPUT:
			return { ...state, input: action.payload };
		default:
			return state;
	}
};
