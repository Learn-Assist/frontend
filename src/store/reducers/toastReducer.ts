import { initialState } from "..";
import { dispatchAction } from "../types";
import * as types from "../types/toastTypes";

export const toastReducer = (
	state: types.toast[] = initialState.toasts,
	action: dispatchAction
) => {
	switch (action.type) {
		case types.ADD_TOAST: {
			console.log("Reducer payload, state:", action.payload, state);
			let queueCopy: types.toast[];
			if (state) queueCopy = [...state];
			else queueCopy = [];
			console.log("Queue copy:", queueCopy);
			queueCopy.push(action.payload);
			return [...queueCopy];
		}

		case types.SET_TOAST_QUEUE:
			return [...action.payload];
		default:
			return state;
	}
};
