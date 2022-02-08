import { dispatchAction } from "../types";

export * as chat from "./Chat";
export * as audio from "./Audio";
export * as toast from "./Toast";
export * as user from "./User";
export const setUserStatus = (
	state: "loading" | "no_user" | "user_found" | "api_error"
): dispatchAction => {
	return {
		type: "SET_USER_STATE",
		payload: state,
	};
};
