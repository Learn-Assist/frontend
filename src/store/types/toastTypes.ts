export const SET_CURRENT_TOAST = "SET_CURRENT_TOAST";
export const SET_TOAST_QUEUE = "SET_TOAST_QUEUE";
export const ADD_TOAST = "ADD_TOAST";

export interface toast {
	message: string;
	type: "success" | "error" | "info" | "warning";
	duration: "short" | "long";
	positionX?: "left" | "center" | "right";
	positionY?: "top" | "center" | "bottom";
}

export class Toast implements toast {
	message: string;
	type: "success" | "error" | "info" | "warning";
	duration: "short" | "long";
	positionX?: "left" | "center" | "right";
	positionY?: "top" | "center" | "bottom";

	constructor(
		message: string,
		type: "success" | "error" | "info" | "warning",
		duration: "short" | "long",
		positionX?: "left" | "center" | "right",
		positionY?: "top" | "center" | "bottom"
	) {
		this.message = message;
		this.type = type;
		this.duration = duration;
		this.positionX = positionX;
		this.positionY = positionY;
	}
}
