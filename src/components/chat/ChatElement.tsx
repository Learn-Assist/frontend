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
				<div className="text-sm sm:text-md lg:text-xl xl:text-xl xs:max-w-2/3 sm:max-w-sm lg:max-w-lg xl:max-w-xl mr-auto p-2 px-3 my-2 bg-primary rounded-xl rounded-tl-sm">
					{children}
				</div>
			) : (
				<div className="text-sm sm:text-md lg:text-xl xl:text-xl xs:max-w-2/3 sm:max-w-sm lg:max-w-lg xl:max-w-xl ml-auto p-2 px-3 my-2 bg-gray-200 rounded-xl rounded-tr-sm mr-3">
					{children}
				</div>
			)}
		</>
	);
}

export default ChatElement;
