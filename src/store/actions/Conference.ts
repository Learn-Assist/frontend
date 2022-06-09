import * as types from "../types";
export const setLocalStream = (stream: MediaStream): types.dispatchAction => {
	return {
		type: types.SET_LOCAL_STREAM,
		payload: stream,
	};
};
export const setRemoteStream = (stream: MediaStream): types.dispatchAction => {
	return {
		type: types.SET_REMOTE_STREAM,
		payload: stream,
	};
};
export const setPeerConnection = (
	peerConnection: RTCPeerConnection
): types.dispatchAction => {
	return {
		type: types.SET_PEER_CONNECTION,
		payload: peerConnection,
	};
};
