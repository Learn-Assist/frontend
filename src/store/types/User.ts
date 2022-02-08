export interface user {
	_id?: string;
	uid: string;
	name: string;
	email: string;
	age: number;
	school: string;
	grade: number;
	photoURL: string;
	createdAt: Date;
	updatedAt: Date;
	timeActiveInMinutes: number;
	tests: Array<{
		_id: string;
		score: number;
		date: Date;
	}>;
}

export const SIGN_OUT = "SIGN_OUT";
export const SET_USER = "SET_USER";
