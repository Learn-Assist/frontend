export const SET_URL = "SET_URL";
export const SET_PREV_URLS = "SET_PREV_URLS";
export const SET_AUDIO = "SET_AUDIO";
export const ADD_PREV_URL = "ADD_PREV_URL";

export interface audio {
	currentURL: string | false;
	prevURLs: string[];
}
