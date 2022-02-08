import { initialState } from "..";
import { dispatchAction } from "../types";
import * as types from "../types/Audio";
import { CLEAR_ALL } from "../types";
const audioReducer = (state = initialState.audio, action: dispatchAction) => {
	switch (action.type) {
		case types.SET_URL:
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
			if (!state.prevURLs.includes(action.payload as never))
				return {
					...state,
					prevURLs: [...state.prevURLs, action.payload],
				};
			else return state;
		case types.SET_AUDIO:
			return action.payload;
		case CLEAR_ALL:
			return {
				currentURL: "",
				prevURLs: [],
			};
		default:
			return state;
	}
};

export default audioReducer;
