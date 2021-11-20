import { initialState } from "..";
import { dispatchAction } from "../types";
import * as types from "../types/audioTypes";

export const audioReducer = (
	state = initialState.audio,
	action: dispatchAction
) => {
	switch (action.type) {
		case types.SET_URL:
			console.log("Reduce:", action.payload);
			return {
				...state,
				currentURL: action.payload,
			};

		case types.SET_PREV_URLS:
			return {
				...state,
				prevURLs: action.payload,
			};
		case types.ADD_PREV_URL:
			if (!state.prevURLs.includes(action.payload))
				return {
					...state,
					prevURLs: [...state.prevURLs, action.payload],
				};
			else return state;
		case types.SET_AUDIO:
			return action.payload;

		default:
			return state;
	}
};
