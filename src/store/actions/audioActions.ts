import { dispatchAction } from "../types";
import * as types from "../types/audioTypes";

export const setURL = (url: string | false): dispatchAction => {
	console.log("setURL action", url);
	return {
		type: types.SET_URL,
		payload: url,
	};
};

export const setPrevURLs = (URLs: string[]): dispatchAction => {
	return {
		type: types.SET_PREV_URLS,
		payload: URLs,
	};
};

export const addPrevURL = (url: string): dispatchAction => {
	return {
		type: types.ADD_PREV_URL,
		payload: url,
	};
};

export const setAudio = (audio: types.audio): dispatchAction => {
	return {
		type: types.SET_AUDIO,
		payload: audio,
	};
};
