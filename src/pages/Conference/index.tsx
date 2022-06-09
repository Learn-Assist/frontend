import { useEffect, useRef, useState } from "react";
import { actions, useStore } from "../../store";
import {
	addDoc,
	setDoc,
	getFirestore,
	doc,
	collection,
	onSnapshot,
	getDoc,
	updateDoc,
} from "firebase/firestore";
const servers = {
	iceServers: [
		{
			urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
		},
	],
	iceCandidatePoolSize: 10,
};

const peerConnection = new RTCPeerConnection(servers);
const remoteStream = new MediaStream();
function Conference() {
	const db = getFirestore();
	const localVideoRef = useRef<HTMLVideoElement>();
	const remoteVideoRef = useRef<HTMLVideoElement>();
	const [createCallId, setCreateCallId] = useState("");
	const [answerCallId, setAnswerCallId] = useState("");
	const [localStream, setLocalStream] = useState(new MediaStream());
	const [remoteCount, setRemoteCount] = useState(0);
	async function getMedia() {
		const _localStream = await navigator.mediaDevices.getUserMedia({
			video: true,
			audio: true,
		});
		setLocalStream(() => _localStream);
		_localStream.getTracks().forEach((track) => {
			console.log("ontrack1");
			peerConnection.addTrack(track, _localStream);
		});
		peerConnection.ontrack = (event) => {
			console.log("ontrack2");
			setRemoteCount(event.streams.length);
			event.streams[0].getTracks().forEach((track) => {
				remoteStream.addTrack(track);
			});
		};
		if (localVideoRef.current) localVideoRef.current.srcObject = localStream;
		if (remoteVideoRef.current) remoteVideoRef.current.srcObject = remoteStream;
	}
	useEffect(() => {
		if (localVideoRef.current) localVideoRef.current.srcObject = localStream;
		if (remoteVideoRef.current) remoteVideoRef.current.srcObject = remoteStream;
	}, [localStream, localVideoRef, remoteVideoRef]);

	async function createCall() {
		console.log(peerConnection);
		const callDoc = doc(db, "calls", createCallId);
		const offerCandidates = collection(callDoc, "offerCandidates");
		const answerCandidates = collection(callDoc, "answerCandidates");
		peerConnection.onicecandidate = async (event) => {
			event.candidate && addDoc(offerCandidates, event.candidate.toJSON());
		};
		const offerOptions = {
			offerToReceiveAudio: true,
			offerToReceiveVideo: true,
		};
		const offerDescription = await peerConnection.createOffer(offerOptions);
		await peerConnection.setLocalDescription(offerDescription);
		const offer = {
			sdp: offerDescription.sdp,
			type: offerDescription.type,
		};
		await setDoc(callDoc, { offer });
		onSnapshot(callDoc, (snapshot) => {
			const data = snapshot.data();
			if (!peerConnection.currentRemoteDescription && data?.answer) {
				console.log("71");
				const answerDescription = new RTCSessionDescription(data.answer);
				peerConnection.setRemoteDescription(answerDescription);
			}
		});
		onSnapshot(answerCandidates, (snapshot) => {
			snapshot.docChanges().forEach((change) => {
				if (change.type === "added") {
					console.log("79");
					const candidate = new RTCIceCandidate(change.doc.data());
					peerConnection.addIceCandidate(candidate);
				}
			});
		});
	}
	async function answerCall() {
		const id = answerCallId;
		const callDoc = doc(db, "calls", id);
		const offerCandidates = collection(callDoc, "offerCandidates");
		const answerCandidates = collection(callDoc, "answerCandidates");
		peerConnection.onicecandidate = async (event) => {
			event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
		};
		const callData = await getDoc(callDoc);
		const offerDescription = callData.data()?.offer;
		await peerConnection.setRemoteDescription(
			new RTCSessionDescription(offerDescription)
		);
		const answerDescription = await peerConnection.createAnswer();
		await peerConnection.setLocalDescription(answerDescription);
		const answer = {
			type: answerDescription.type,
			sdp: answerDescription.sdp,
		};
		await updateDoc(callDoc, { answer });
		onSnapshot(offerCandidates, (snapshot) => {
			snapshot.docChanges().forEach((change) => {
				console.log(change);
				if (change.type === "added") {
					let data = change.doc.data();
					peerConnection.addIceCandidate(new RTCIceCandidate(data));
				}
			});
		});
	}
	return (
		<div>
			<div className="flex flex-row">
				<video
					width={500}
					height={500}
					style={{ border: "2px solid black" }}
					autoPlay
					playsInline
					ref={localVideoRef as any}
				/>
				<video
					width={500}
					height={500}
					style={{ border: "2px solid black" }}
					autoPlay
					playsInline
					ref={remoteVideoRef as any}
				/>
			</div>
			<button className="btn btn-primary" onClick={getMedia}>
				Start Webcam and Mic
			</button>
			<div>
				<div className="text-xl">Create Conference</div>
				<div>
					<label>Conference Id</label>
					<input
						className="input input-primary"
						onChange={(e) => setCreateCallId(e.target.value)}
						placeholder="Meeting ID"
					/>
				</div>
				{createCallId.length > 0 && (
					<button className="btn btn=primary" onClick={createCall}>
						Create Conference
					</button>
				)}
			</div>
			<div>
				<div className="text-xl">Join Conference</div>
				<div>
					<label>Conference Id</label>
					<input
						className="input input-primary"
						onChange={(e) => setAnswerCallId(e.target.value)}
						placeholder="Meeting ID"
					/>
				</div>
				{answerCallId.length > 0 && (
					<button className="btn btn=primary" onClick={answerCall}>
						Join Conference
					</button>
				)}
			</div>
		</div>
	);
}

export default Conference;
