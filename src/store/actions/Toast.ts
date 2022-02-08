import { dispatchAction } from "../types";
import * as ToastTypes from "../types/toast";

export const addToast = (toast: ToastTypes.toast): dispatchAction => {
	return {
		type: ToastTypes.ADD_TOAST,
		payload: toast,
	};
};

export const addErrorShort = (message: string): dispatchAction => {
	const toast: ToastTypes.toast = {
		message,
		type: "error",
		duration: "short",
	};
	return {
		type: ToastTypes.ADD_TOAST,
		payload: toast,
	};
};

export const addErrorLong = (message: string): dispatchAction => {
	const toast: ToastTypes.toast = {
		message,
		type: "error",
		duration: "long",
	};
	return {
		type: ToastTypes.ADD_TOAST,
		payload: toast,
	};
};

export const addSuccess = (message: string): dispatchAction => {
	const toast: ToastTypes.toast = {
		message,
		type: "success",
		duration: "long",
	};
	return {
		type: ToastTypes.ADD_TOAST,
		payload: toast,
	};
};

export const addInfo = (message: string): dispatchAction => {
	const toast: ToastTypes.toast = {
		message,
		type: "info",
		duration: "long",
	};
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
