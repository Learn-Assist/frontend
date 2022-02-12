import { useContext, useEffect, useRef } from "react";
import ChatElement from "./ChatElement";
import StoreContext, { actions } from "../../store";
import { useSendMessage } from "../../api/Rasa";
import { Message } from "../../store/types";
import "./style.scss";
function ChatUI() {
	const sendMessage = useSendMessage();
	const { store, dispatch } = useContext(StoreContext);
	const ref = useRef<any>();
	useEffect(() => {
		const A_LARGE_SCROLL_AMOUNT = 1000000;
		ref.current.scrollTop = A_LARGE_SCROLL_AMOUNT;
	}, [store.chats.messages]);
	function getYoutubeIframeId(url: string) {
		const regExp =
			/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
		const match = url.match(regExp);
		return match && match[2].length === 11 ? match[2] : "";
	}

	return (
		<>
			<div className="alert alert-error font-bold xs:text-xs lg:text-lg">
				This chat is currently in development. Expect bugs!
			</div>
			<div
				ref={ref}
				style={{ height: window.innerHeight * 0.8 }}
				className="flex flex-col overflow-y-auto pb-20 mb-20 scrollbar-hidden"
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
									<div className="text-sm font-bold">Options</div>
									{message.buttons?.map((button, x) => (
										<button
											className="font-bold btn-sm btn-primary rounded-full  my-1 mr-2 px-4"
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
													sender: message.id,
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
