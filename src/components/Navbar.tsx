import logo from "../images/logo.jpg";
function Navbar() {
	return (
		<div className="navbar pb-2 shadow-lg bg-base-100 rounded-none ">
			<a
				href="https://learn-assist.me/"
				style={{ fontFamily: "Yuji Boku" }}
				className="text-lg font-bold flex-row flex mx-auto"
			>
				<img className="w-12 h-12 rounded-full " src={logo} alt="" />
			</a>
		</div>
	);
}

export default Navbar;
