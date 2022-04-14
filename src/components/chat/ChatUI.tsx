import { useContext, useEffect, useRef, useState } from "react";
import ChatElement from "./ChatElement";
import StoreContext, { actions } from "../../store";
import { useSendMessage } from "../../api/Rasa";
import { Message } from "../../store/types";
import { BsFillStopFill } from "react-icons/bs";
import { FaPause, FaPlay, FaStop } from "react-icons/fa";
import "./style.scss";
function ChatUI() {
	const sendMessage = useSendMessage();
	const { store, dispatch } = useContext(StoreContext);
	const [alert, setAlert] = useState(true);
	const [isPaused, setIsPaused] = useState(false);
	const ref = useRef<any>();
	useEffect(() => {
		const A_LARGE_SCROLL_AMOUNT = 1000000;
		ref.current.scrollTop = A_LARGE_SCROLL_AMOUNT;
		setIsPaused(false);
	}, [store.chats]);
	function getYoutubeIframeId(url: string) {
		const regExp =
			/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
		const match = url.match(regExp);
		return match && match[2].length === 11 ? match[2] : "";
	}
	return (
		<>
			{/* {alert && (
				<div className="alert alert-error font-bold text-xs sm:text-sm md:text-sm lg:text-md xl:text-lg mb-2">
					This chat UI is currently in development. Bugs can be expected.
					<span className="underline" onClick={() => setAlert(false)}>
						Close
					</span>
				</div>
			)} */}
			{window.innerWidth < 640 && (
				<button
					className="btn btn-sm btn-outline btn-accent"
					onClick={() => {
						dispatch(actions.chat.setLoadingTrue());
						sendMessage.mutate({
							sender: store.user.uid as string,
							message: "/restart",
						});
						dispatch(actions.chat.clearAll());
					}}
				>
					Reset Conversation
				</button>
			)}
			<div
				ref={ref}
				style={{ height: window.innerHeight * 0.8 }}
				className="flex flex-col overflow-y-auto pb-24 scrollbar-hidden"
			>
				{store.chats.messages.map((message, i: number) => {
					let side: "left" | "right";
					if (message.type === "bot" || message.type === "user") {
						if (message.type === "bot") side = "left";
						else side = "right";
						return (
							<ChatElement
								side={side}
								key={i}
								children={
									<>
										{message.content === "image" && (
											<img
												className="object-scale-down max-w-2/3"
												src={message.message}
												alt="Content"
											/>
										)}
										{message.content === "text" && message.message}
										{message.content === "text" &&
											!isPaused &&
											message.type === "bot" &&
											i >= store.chats.messages.length - 2 && (
												<div
													className="ml-2 btn btn-outline btn-accent btn-xs"
													onClick={() => {
														window.speechSynthesis.cancel();
														setIsPaused(true);
													}}
												>
													Stop Speech
													<BsFillStopFill className="ml-1" size={18} />
												</div>
											)}
										{message.content === "video" && (
											<video
												className="object-scale-down max-w-2/3"
												src={message.message}
												autoPlay
												controls
											/>
										)}
										{message.content === "audio" && (
											<audio
												className="object-scale-down max-w-2/3"
												src={message.message}
												controls
												autoPlay
											/>
										)}
										{message.content === "iframe" && (
											<iframe
												title="iframe"
												width={window.innerWidth * 0.33}
												height={(window.innerWidth * 0.33) / 1.7777}
												className="object-scale-down max-w-lg"
												src={`//www.youtube.com/embed/${getYoutubeIframeId(
													message.message
												)}?autoplay=1`}
												frameBorder="0"
												allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay;"
												allowFullScreen
											/>
										)}
									</>
								}
							/>
						);
					} else {
						if (message.type === "buttons")
							return (
								<div className="">
									<div className="text-sm font-bold">Suggested: </div>
									{message.buttons?.map((button, x) => (
										<button
											className="font-bold btn btn-xs btn-info btn-outline rounded-full my-1 mr-2 px-4"
											key={x}
											onClick={() => {
												dispatch(
													actions.chat.addMessage(
														new Message(
															store.user.uid,
															button,
															store.user.uid,
															new Date(),
															"user",
															"text"
														)
													)
												);
												dispatch(actions.chat.setLoadingTrue());
												sendMessage.mutate({
													sender: store.user.uid,
													message: button.toString(),
												});
											}}
										>
											{button}
										</button>
									))}
								</div>
							);
						return (
							<div className="mr-auto">
								<div className="typing-indicator">
									<span></span>
									<span></span>
									<span></span>
								</div>
							</div>
						);
					}
				})}
			</div>
		</>
	);
}

export default ChatUI;
