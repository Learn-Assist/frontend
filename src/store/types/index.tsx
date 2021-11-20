import { audio } from "./audioTypes";
import { toast } from "./toastTypes";

export interface AppState {
	user: user;
	chats: {
		input: string;
		messages: message[];
	};
	audio: audio;
	toasts: toast[];
}

export interface ActionCreator {
	(payload: any): dispatchAction;
}

export interface dispatchAction {
	type: string;
	payload?: any;
	description?: string;
}

export interface message {
	id: string;
	timeStamp: Date;
	message: string;
	type: "user" | "bot";
	image?: string;
	other?: any;
	buttons?: any;
}

export interface user {
	id: string;
	name: string;
	email?: string;
	image?: string;
}
