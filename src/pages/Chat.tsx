import { BsFillMicFill } from "react-icons/bs";
import ChatUI from "../components/chat/ChatUI";
import StoreContext, { actions } from "../store";
import { useContext, useEffect, useState } from "react";
import { Message } from "../store/types/Chat";
import { useSendMessage } from "../api/Rasa";
import { BsFillStopFill } from "react-icons/bs";
import useRecorder from "../components/useRecorder";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useSpeechToText } from "../api/speechToText";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
function ChatPage() {
	const { store, dispatch } = useContext(StoreContext);
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const audioURL = store.audio.currentURL;
	const input = store.chats.input;
	const sendMessage = useSendMessage();
	const SpeechToText = useSpeechToText();
	const [data, srcAudioURL, isRecording, startRecording, stopRecording] =
		useRecorder();
	const [boolToStopOnMountSpeechTrigger, setBoolToStopOnMountSpeechTrigger] =
		useState(false);
	const setInput = (input: string) => dispatch(actions.chat.setInput(input));

	useEffect(() => {
		sendMessage.mutate({
			sender: store.user.uid as string,
			message: "/restart",
		});
		document.addEventListener("keydown", keyDownHandler, false);
		document.addEventListener("keyup", keyUpHandler, false);
		function keyDownHandler(e: any) {
			if (e.key === "Control") startMic();
		}
		function keyUpHandler(e: any) {
			if (e.key === "Control") endMic();
		}
	}, []);
	useEffect(() => {
		if (srcAudioURL && boolToStopOnMountSpeechTrigger) {
			dispatch(actions.audio.setURL(srcAudioURL));
			SpeechToText.mutate(data?.data);
			setBoolToStopOnMountSpeechTrigger(false);
		} else {
			console.log("srcAudioURL s is empty", srcAudioURL);
		}
	}, [srcAudioURL]);

	const onSend = async (e: any) => {
		e.preventDefault();
		setBoolToStopOnMountSpeechTrigger(true);
		if (!audioURL && input.length > 0) {
			const message = new Message(
				store.user.uid as string,
				input,
				store.user.uid as string,
				new Date(),
				"user"
			);
			dispatch(actions.chat.addMessage(message));
			setInput("");
			sendMessage.mutate({ sender: message.user, message: message.message });
		}
	};
	const startMic = () => {
		startRecording();
	};
	const endMic = () => {
		stopRecording();
		setBoolToStopOnMountSpeechTrigger(true);
		dispatch(actions.audio.setURL(srcAudioURL));
	};
	return (
		<div className="flex h-screen overflow-hidden">
			{/* Sidebar */}
			<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

			{/* Content area */}
			<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
				{/*  Site header */}
				<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
				<div className="relative flex flex-row flex-1 overflow-y-auto overflow-x-hidden">
					<div
						style={{ height: window.innerHeight * 0.85 }}
						className="overflow-y-auto  w-0 invisible lg:visible md:visible xl:visible 2xl:visible 
								lg:w-1/3 md:w-1/3 xl:w-1/3 2xl:w-1/3
				 				 mb-8 flex flex-col scrollbar-hidden"
					>
						<div className="h-full mt-auto p-4 font-bold mb-12">
							<button
								className="btn btn-outline btn-accent"
								onClick={() => {
									sendMessage.mutate({
										sender: store.user.uid as string,
										message: "/restart",
									});
									dispatch(actions.chat.clearAll());
									console.log("store.chats:", store.chats, store.audio);
								}}
							>
								Reset Conversation
							</button>
							<div className="font-bold">Your inputs:</div>
							{store.audio.prevURLs &&
								store.audio.prevURLs.map((url: any, index) => {
									if (url) {
										return (
											<audio
												key={index}
												className="rounded-lg mb-5 m-3 mr-5 w-10/12"
												src={url}
												controls
											/>
										);
									} else return null;
								})}
						</div>
					</div>
					<div className="p-4 w-full lg:w-2/3 md:w-2/3 xl:w-2/3 2xl:w-2/3 mb-5 border-l-2 border-primary">
						<ChatUI />
					</div>
					<form
						onSubmit={(e) => onSend(e)}
						className="flex flex-row ml-auto absolute bottom-0 mb-3 mr-3 w-full"
					>
						<input
							className="ml-1 px-8 w-full mr-5 input md:input-md xl:input-lg  input input-secondary"
							placeholder="Talk to me to get started"
							value={input}
							onChange={(e) => setInput(e.target.value)}
						/>
						{/* {audioURL && (
					<audio className="ml-1  w-full mr-1" src={audioURL} controls />
				)} */}
						{!audioURL && (
							<button
								onMouseDown={startMic}
								onMouseUp={endMic}
								className="btn-primary px-5 mr-5 rounded-full btn-xl"
							>
								{isRecording ? (
									<BsFillStopFill size={20} />
								) : (
									<BsFillMicFill size={20} />
								)}
							</button>
						)}
						{audioURL && (
							<button
								className="btn-primary px-5 mr-5 rounded-full btn-xln"
								onClick={() => {
									setInput("");
									dispatch(actions.audio.setURL(false));
								}}
							>
								<IoIosCloseCircleOutline size={20} />{" "}
							</button>
						)}
						<button
							type="submit"
							onClick={(e) => onSend(e)}
							className="btn-primary px-5 mr-5 rounded-full btn md:btn-md xl:btn-lg"
						>
							Send &gt;
						</button>
					</form>
				</div>
			</div>
			{isRecording && (
				<div className="absolute w-full h-full flex flex-col  items-center justify-center align-middle bg-black bg-opacity-20">
					<div className="text-3xl shadow-xl p-8 rounded-lg border border-accent bg-black bg-opacity-70 text-primary font-extrabold">
						Recording...
						<div className="m-5">
							<button className="btn btn-error" onClick={endMic}>
								Stop Recording
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default ChatPage;
