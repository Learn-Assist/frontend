import { dispatchAction, SET_USER, SIGN_OUT, user } from "../types";

const dummyUser: user = {
	name: "",
	email: "",
	grade: 1,
	age: 0,
	school: "",
	timeActiveInMinutes: 0,
	createdAt: new Date(),
	updatedAt: new Date(),
	photoURL: "",
	uid: "",
	tests: [],
};

const reducer = (state: user, action: dispatchAction): user => {
	switch (action.type) {
		case SIGN_OUT:
			return dummyUser;
		case SET_USER:
			return action.payload;
		default:
			return state;
	}
};

export default reducer;
