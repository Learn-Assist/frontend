import kids from "../images/kids.jpg";
import Phone from "./Phone";
import "../css/bubbles.scss";
function HeroHome() {
	const array = Array.from(Array(10).keys());
	return (
		<div className="scrollbar-hidden">
			<div className="hero py-12 bg-transparent">
				<div className="absolute top-16 left-0 h-full w-full">
					<div className="bubbles">
						{array.map((i) => (
							<div className="bubble" />
						))}
					</div>
				</div>
				<div className="flex-col hero-content ">
					<div className="text-center text-transparent bg-clip-text bg-gradient-to-r  from-primary to-secondary via-accent animate-gradient-x">
						<h1 className="mb-5 text-6xl font-extrabold ">
							Welcome to Learn Assist
						</h1>
						<h1 className="mb-5 text-3xl font-bold">
							Your smart personal learning assistant
						</h1>
						<p className="mb-5 mx-5 xl:mx-48 lg:mx-24 md:mx-12 text-lg font-bold">
							We help you get educated anywhere and anytime, through natural
							conversations filled with fun, love and powerful technologies!
						</p>
						<button className="btn btn-primary">Get Started</button>
					</div>
					<img
						src={kids}
						className="max-w-screen  rounded-lg shadow-2xl"
						alt="l"
					/>
				</div>
			</div>
			<div className="hero py-12 bg-base-200">
				<Phone />
			</div>
		</div>
	);
}

export default HeroHome;
