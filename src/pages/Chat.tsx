import { Link } from "react-router-dom";
import { BsFillMicFill } from "react-icons/bs";
import ChatUI from "../components/chat/ChatUI";
import StoreContext, { actions } from "../store";
import { useContext, useEffect, useState } from "react";
import { Message } from "../store/types/chatTypes";
import { useSendMessage } from "../api/RasaQueries";
import { BsFillStopFill } from "react-icons/bs";
import useRecorder from "../components/useRecorder";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useSpeechToText } from "../api/speechToText";
function ChatPage() {
	const { store, dispatch } = useContext(StoreContext);
	const audioURL = store.audio.currentURL;
	const input = store.chats.input;
	const sendMessage = useSendMessage();
	const SpeechToText = useSpeechToText();
	const [data, srcAudioURL, isRecording, startRecording, stopRecording] =
		useRecorder();
	const [boolToStopOnMountSpeechTrigger, setBoolToStopOnMountSpeechTrigger] =
		useState(false);
	const setInput = (input: string) =>
		dispatch(actions.chatActions.setInput(input));

	useEffect(() => {
		if (srcAudioURL && boolToStopOnMountSpeechTrigger) {
			dispatch(actions.audioActions.setURL(srcAudioURL));
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
				"random_id",
				input,
				"randm",
				new Date(),
				"user"
			);
			dispatch(actions.chatActions.addMessage(message));
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
		dispatch(actions.audioActions.setURL(srcAudioURL));
	};
	return (
		<div className="h-screen">
			<div className="flex flex-row w-full fixed bg-primary h-16 pt-4">
				<Link to="/" className="ml-3 hover:underline">
					&lt; Home
				</Link>
				<div
					style={{ fontFamily: "Yuji Boku" }}
					className="mx-auto text-lg font-extrabold"
				>
					Learn Assist
				</div>
			</div>

			<div className="flex flex-row ">
				<div
					style={{ height: window.innerHeight * 0.85 }}
					className="overflow-y-auto  mt-16 w-0 invisible lg:visible md:visible xl:visible 2xl:visible 
								lg:w-1/3 md:w-1/3 xl:w-1/3 2xl:w-1/3
				 				 mb-8 flex flex-col scrollbar-hidden"
				>
					<div className="h-full mt-auto p-4 font-bold mb-12">
						<div className="font-bold">Your inputs:</div>
						{store.audio.prevURLs &&
							store.audio.prevURLs.map((url: any, index) => {
								if (url) {
									console.log("url", url);
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
				<div className="p-4 mt-16 w-full lg:w-2/3 md:w-2/3 xl:w-2/3 2xl:w-2/3 mb-5 border-l-2 border-primary">
					<ChatUI />
				</div>
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
							dispatch(actions.audioActions.setURL(false));
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
	);
}

export default ChatPage;
