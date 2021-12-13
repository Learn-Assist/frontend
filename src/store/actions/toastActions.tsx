import { dispatchAction } from "../types";
import * as ToastTypes from "../types/toastTypes";

export const addToast = (toast: ToastTypes.toast): dispatchAction => {
	return {
		type: ToastTypes.ADD_TOAST,
		payload: toast,
	};
};

export const setQueue = (queue: ToastTypes.toast[]): dispatchAction => {
	return {
		type: ToastTypes.SET_TOAST_QUEUE,
		payload: queue,
	};
};
