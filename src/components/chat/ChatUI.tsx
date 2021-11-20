import { useContext, useEffect, useRef } from "react";
import ChatElement from "./ChatElement";
import StoreContext from "../../store";

function ChatUI() {
	const { store } = useContext(StoreContext);
	const ref = useRef<any>();
	useEffect(() => {
		const A_LARGE_SCROLL_AMOUNT = 1000000;
		ref.current.scrollTop = A_LARGE_SCROLL_AMOUNT;
	}, []);

	return (
		<>
			<div
				ref={ref}
				style={{ height: window.innerHeight * 0.8 }}
				className="flex flex-col overflow-y-auto pb-12 scrollbar-hidden"
			>
				{store.chats.messages.map((message, i: number) => {
					let side: "left" | "right";
					if (message.type === "bot") side = "left";
					else side = "right";
					return (
						<ChatElement
							side={side}
							key={i}
							children={
								message.image ? (
									<img
										style={{ maxWidth: window.innerWidth * 0.55 }}
										className="object-scale-down "
										src={message.image}
										alt="bot"
									/>
								) : (
									message.message
								)
							}
						/>
					);
				})}
			</div>
		</>
	);
}

export default ChatUI;
