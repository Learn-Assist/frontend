function ChatElement({
	side,
	children,
}: {
	side: "left" | "right";
	children: React.ReactNode;
}) {
	return (
		<>
			{side === "left" ? (
				<div className="text-xl max-w-sm lg:max-w-lg xl:max-w-xl p-2 px-3 w-max my-2 bg-primary rounded-xl rounded-tl-sm mr-12">
					{children}
				</div>
			) : (
				<div className="text-xl max-w-sm lg:max-w-lg xl:max-w-xl ml-auto p-2 px-3 w-max my-2 bg-primary rounded-xl rounded-tr-sm mr-3">
					{children}
				</div>
			)}
		</>
	);
}

export default ChatElement;
