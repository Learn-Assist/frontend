import { message } from ".";

export const ADD_MESSAGE = "ADD_MESSAGE";
export const SET_INPUT = "SET_INPUT";
export const CLEAR_ALL = "CLEAR_ALL";
export class Message implements message {
	constructor(
		public id: string,
		public message: string,
		public user: string,
		public timeStamp: Date,
		public type: "user" | "bot"
	) {
		this.id = id;
		this.message = message;
		this.user = user;
		this.timeStamp = timeStamp;
		this.type = type;
	}

	image?: string | undefined;
	other?: any;
	buttons?: any;
}
