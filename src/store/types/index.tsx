import { toast } from "./toast";

export * from "./Audio";
export * from "./Chat";
export * from "./User";
export * from "./toast";

export interface AppState {
	app: {
		userStatus: string;
	};
	user: {
		uid: string;
		name: string;
		email: string;
		grade: number;
		age: number;
		school: string;
		timeActiveInMinutes: number;
		createdAt: Date;
		updatedAt: Date;
		photoURL: string;
		tests: Array<any>;
	};
	chats: {
		input: string;
		messages: Array<message>;
		isLoading: boolean;
	};
	audio: {
		currentURL: any;
		prevURLs: Array<string>;
	};
	toasts: Array<toast>;
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
	type: "user" | "bot" | "buttons" | "loading";
	content: "text" | "audio" | "image" | "video" | "iframe";
	buttons?: Array<string>;
}

export type appReducerState = any;
