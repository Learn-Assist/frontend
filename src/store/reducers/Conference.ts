import { dispatchAction } from "../types";
import { Conference } from "../types/Conference";
import * as types from "../types";
const conferenceReducer = (
	state: Conference,
	action: dispatchAction
): Conference => {
	switch (action.type) {
		case types.SET_LOCAL_STREAM:
			return {
				...state,
				localStream: action.payload,
			};

		case types.SET_REMOTE_STREAM:
			return {
				...state,
				remoteStream: action.payload,
			};
		case types.SET_PEER_CONNECTION:
			return {
				...state,
				peerConnection: action.payload,
			};
		default:
			return state;
	}
};

export default conferenceReducer;
