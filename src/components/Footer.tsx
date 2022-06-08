import { Link } from "react-router-dom";
import logo from "../images/logo.jpg";
function Footer() {
	return (
		<div>
			<footer className="p-10  footer bg-base-200 text-base-content footer-center border-t-2 border-gray-200">
				<div className="grid grid-flow-col gap-4">
					<a
						href="https://learn-assist.me/about"
						className="link link-hover"
						target="_blank"
						rel="noreferrer"
					>
						<b>&lt; About &gt;</b>
					</a>
				</div>
				<div>
					<div className="grid grid-flow-col gap-4">
						<Link to="/">
							<img src={logo} alt="Certwise" className="h-12 rounded-full" />
						</Link>
					</div>
				</div>
				<div>
					<b>Learn Assist - 2022 </b>
				</div>
			</footer>
		</div>
	);
}

export default Footer;
