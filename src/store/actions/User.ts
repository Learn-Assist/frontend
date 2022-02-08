import { dispatchAction, user } from "../types";

export const setUser = (user: user): dispatchAction => {
	return {
		type: "SET_USER",
		payload: user,
	};
};

export const signOut = (): dispatchAction => {
	return {
		type: "SIGN_OUT",
	};
};
