import { type } from "os";

const servers = {
	iceServers: [
		{
			urls: ["stun:stun1.l.google.com:19302", "stun:stun1.l.google.com:19302"],
		},
	],
	iceCandidatePoolSize: 10,
};
export const peerConnection = new RTCPeerConnection(servers);
export type Conference = {
	localStream: MediaStream | undefined;
	remoteStream: MediaStream | undefined;
	peerConnection: RTCPeerConnection | undefined;
};

export const SET_LOCAL_STREAM = "SET_LOCAL_STREAM";
export const SET_REMOTE_STREAM = "SET_REMOTE_STREAM";
export const SET_PEER_CONNECTION = "SET_PEER_CONNECTION";
