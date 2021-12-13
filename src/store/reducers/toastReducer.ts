import { initialState } from "..";
import { dispatchAction } from "../types";
import * as types from "../types/toastTypes";

export const toastReducer = (
	state: types.toast[] = initialState.toasts,
	action: dispatchAction
) => {
	switch (action.type) {
		case types.ADD_TOAST: {
			let queueCopy: types.toast[];
			if (state) queueCopy = [...state];
			else queueCopy = [];
			queueCopy.push(action.payload);
			return [...queueCopy];
		}

		case types.SET_TOAST_QUEUE:
			return [...action.payload];
		default:
			return state;
	}
};
