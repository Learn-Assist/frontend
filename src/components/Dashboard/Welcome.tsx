function WelcomeBanner({ name }: { name: string }) {
	const time = new Date().getHours();
	return (
		<div className="relative bg-primary text-primary-content p-4 sm:p-6 overflow-hidden mb-3 shadow-xl rounded-lg">
			{/* Background illustration */}
			<div
				className="absolute right-0 top-0 -mt-4 mr-16 pointer-events-none hidden xl:block"
				aria-hidden="true"
			></div>

			{/* Content */}
			<div className="relative">
				<h1 className="text-2xl font-extrabold md:text-3xl mb-1">
					{time <= 11 && "Good morning"}
					{time >= 12 && time < 17 && "Good afternoon"}
					{time >= 17 && "Good evening"}, {name || " Guest user"}.{" "}
					<span className="text-3xl">👋🏾</span>
				</h1>
				<p>
					Here is your profile insight. We are excited to assist your academic
					journey!
				</p>
			</div>
		</div>
	);
}

export default WelcomeBanner;
