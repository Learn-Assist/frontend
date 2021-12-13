import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import DropdownFilter from "./UI/DropdownFilter";
function Navbar() {
	useEffect(() => {
		//themeChange(false);
		// 👆 false parameter is required for react project
	}, []);
	const location = useLocation();
	return (
		<div className="navbar pb-2 shadow-lg bg-neutral text-neutral-content rounded-none ">
			<div className="px-2 mx-2 navbar-start">
				<span style={{ fontFamily: "Yuji Boku" }} className="text-lg font-bold">
					<Link to="/home" className="text-primary hover:text-gray-200">
						Learn Assist
					</Link>
				</span>
			</div>

			<div className="hidden px-2 mx-2 navbar-center lg:flex">
				<div className="flex items-stretch ">
					<Link
						to="/home"
						className={
							"btn btn-ghost btn-sm rounded-btn hover:underline hover:bg-transparent text-xs" +
							(location.pathname === "/home" || location.pathname === "/"
								? " font-bold"
								: "")
						}
					>
						Home
					</Link>
					<Link
						to="/assist"
						className={
							"btn btn-ghost btn-sm rounded-btn hover:underline hover:bg-transparent text-xs" +
							(location.pathname === "/assist" ? " font-bold" : "")
						}
					>
						Assistant
					</Link>
					<Link
						to="/about"
						className={
							"btn btn-ghost btn-sm rounded-btn hover:underline hover:bg-transparent text-xs" +
							(location.pathname === "/about" ? " font-bold" : "")
						}
					>
						About
					</Link>
				</div>
			</div>
			<div className="navbar-end">
				<button className="btn btn-square btn-ghost">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						className="inline-block w-6 h-6 stroke-current"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
						></path>
					</svg>
				</button>
				<button
					data-toggle-theme="dark,light"
					data-act-class="ACTIVECLASS"
					className="btn btn-square btn-ghost"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						className="inline-block w-6 h-6 stroke-current"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						></path>
					</svg>
				</button>
				{/* <div className="dropdown dropdown-end text-xs">
					<div tabIndex={0} className="m-1 btn btn-xs text-xs">
						Theme
					</div>
					<ul
						tabIndex={0}
						className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
					>
						{themes.map((theme) => (
							<button
								className="btn btn-sm btn-primary my-0.5"
								data-set-theme={theme}
								data-act-class="ACTIVECLASS"
							>
								{theme}
							</button>
						))}
					</ul>
				</div> */}
				{
					<div className="md:hidden lg:hidden xl:hidden ">
						<DropdownFilter
							options={[
								<Li value="Home" />,
								<Li value="Assist" />,
								<Li value="about" />,
							]}
							Icon={<GiHamburgerMenu size={20} />}
							align="right"
							bg="primary"
						/>
					</div>
				}
			</div>
		</div>
	);
}

export default Navbar;

const Li = ({ value }: { value: string }) => {
	return (
		<Link
			to={`/${value.toLowerCase()}`}
			className="btn btn-sm btn-ghost w-full text-black hover:bg-transparent hover:text-gray-500"
		>
			{value}
		</Link>
	);
};
