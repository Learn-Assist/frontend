import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../images/logo.jpg";

function Sidebar({ sidebarOpen, setSidebarOpen }: any) {
	const location = useLocation();
	const { pathname } = location;

	const trigger = useRef<any>(null);
	const sidebar = useRef<any>(null);

	const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
	const [sidebarExpanded, setSidebarExpanded] = useState<any>(
		storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
	);

	// close on click outside
	useEffect(() => {
		const clickHandler = ({ target }: any) => {
			if (!sidebar.current || !trigger.current) return;
			if (
				!sidebarOpen ||
				sidebar.current.contains(target) ||
				trigger.current.contains(target)
			)
				return;
			setSidebarOpen(false);
		};
		document.addEventListener("click", clickHandler);
		return () => document.removeEventListener("click", clickHandler);
	});

	// close if the esc key is pressed
	useEffect(() => {
		const keyHandler = ({ keyCode }: any) => {
			if (!sidebarOpen || keyCode !== 27) return;
			setSidebarOpen(false);
		};
		document.addEventListener("keydown", keyHandler);
		return () => document.removeEventListener("keydown", keyHandler);
	});

	useEffect(() => {
		localStorage.setItem("sidebar-expanded", sidebarExpanded);
		if (sidebarExpanded) {
			(document.querySelector("body") as any).classList.add("sidebar-expanded");
		} else {
			(document.querySelector("body") as any).classList.remove(
				"sidebar-expanded"
			);
		}
	}, [sidebarExpanded]);

	return (
		<div>
			{/* Sidebar backdrop (mobile only) */}
			<div
				className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
					sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
				}`}
				aria-hidden="true"
			></div>

			{/* Sidebar */}
			<div
				id="sidebar"
				ref={sidebar}
				className={`flex flex-col absolute z-40 left-0 top-0 lg:static 
				lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll
				 lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 flex-shrink-0 
				 bg-accent p-4 transition-all duration-200 ease-in-out ${
						sidebarOpen ? "translate-x-0" : "-translate-x-64"
					}`}
			>
				{/* Sidebar header */}
				<div className="flex justify-between mb-10 pr-3 sm:px-2">
					{/* Close button */}
					<button
						ref={trigger}
						className="lg:hidden text-gray-500 hover:text-gray-400"
						onClick={() => setSidebarOpen(!sidebarOpen)}
						aria-controls="sidebar"
						aria-expanded={sidebarOpen}
					>
						<span className="sr-only">Close sidebar</span>
						<svg
							className="w-6 h-6 fill-current"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
						</svg>
					</button>
					{/* Logo */}
					<NavLink to="/" style={{ height: 60, width: 60 }}>
						<img src={logo} className="rounded-full" alt={""} />
					</NavLink>
				</div>

				{/* Links */}
				<div className="space-y-8">
					{/*Pages group */}
					<div>
						<h3 className="text-xs uppercase text-gray-500 font-semibold pl-3">
							<span
								className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
								aria-hidden="true"
							>
								•••
							</span>
							<span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
								Pages
							</span>
						</h3>
						<ul className="mt-3">
							{/* Dashboard */}
							<li
								className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
									pathname === "/" && "bg-gray-900"
								}`}
							>
								<NavLink
									to="/"
									className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
										pathname === "/" && "hover:text-gray-200"
									}`}
								>
									<div className="flex items-center">
										<svg className="flex-shrink-0 h-6 w-6" viewBox="0 0 24 24">
											<path
												className={`fill-current text-gray-400 ${
													pathname === "/" && "text-yellow-500"
												}`}
												d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
											/>
											<path
												className={`fill-current text-gray-600 ${
													pathname === "/" && "text-yellow-100"
												}`}
												d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
											/>
											<path
												className={`fill-current text-gray-400 ${
													pathname === "/" && "text-yellow-500"
												}`}
												d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
											/>
										</svg>
										<span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
											Dashboard
										</span>
									</div>
								</NavLink>
							</li>

							{/* Dashboard */}
							<li
								className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
									pathname === "/" && "bg-gray-900"
								}`}
							>
								<NavLink
									to="/assist"
									className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
										pathname === "/" && "hover:text-gray-200"
									}`}
								>
									<div className="flex items-center">
										<svg className="flex-shrink-0 h-6 w-6" viewBox="0 0 24 24">
											<path
												className={`fill-current text-gray-600 ${
													pathname.includes("assist") && "text-yellow-500"
												}`}
												d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"
											/>
											<path
												className={`fill-current text-gray-400 ${
													pathname.includes("assist") && "text-yellow-300"
												}`}
												d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"
											/>
										</svg>
										<span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
											Assist
										</span>
									</div>
								</NavLink>
							</li>

							{/* Account */}
							<li
								className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
									pathname === "/" && "bg-gray-900"
								}`}
							>
								<NavLink
									to="/profile"
									className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
										pathname === "/" && "hover:text-gray-200"
									}`}
								>
									<div className="flex items-center">
										<svg className="flex-shrink-0 h-6 w-6" viewBox="0 0 24 24">
											<path
												className={`fill-current text-gray-600 ${
													pathname.includes("profile") && "text-yellow-500"
												}`}
												d="M19.714 14.7l-7.007 7.007-1.414-1.414 7.007-7.007c-.195-.4-.298-.84-.3-1.286a3 3 0 113 3 2.969 2.969 0 01-1.286-.3z"
											/>
											<path
												className={`fill-current text-gray-400 ${
													pathname.includes("profile") && "text-yellow-300"
												}`}
												d="M10.714 18.3c.4-.195.84-.298 1.286-.3a3 3 0 11-3 3c.002-.446.105-.885.3-1.286l-6.007-6.007 1.414-1.414 6.007 6.007z"
											/>
											<path
												className={`fill-current text-gray-600 ${
													pathname.includes("profile") && "text-yellow-500"
												}`}
												d="M5.7 10.714c.195.4.298.84.3 1.286a3 3 0 11-3-3c.446.002.885.105 1.286.3l7.007-7.007 1.414 1.414L5.7 10.714z"
											/>
											<path
												className={`fill-current text-gray-400 ${
													pathname.includes("profile") && "text-yellow-300"
												}`}
												d="M19.707 9.292a3.012 3.012 0 00-1.415 1.415L13.286 5.7c-.4.195-.84.298-1.286.3a3 3 0 113-3 2.969 2.969 0 01-.3 1.286l5.007 5.006z"
											/>
										</svg>
										<span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
											Account Settings
										</span>
									</div>
								</NavLink>
							</li>
						</ul>
					</div>
				</div>

				{/* Expand / collapse button */}
				<div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
					<div className="px-3 py-2">
						<button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
							<span className="sr-only">Expand / collapse sidebar</span>
							<svg
								className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
								viewBox="0 0 24 24"
							>
								<path
									className="text-gray-400"
									d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
								/>
								<path className="text-gray-600" d="M3 23H1V1h2z" />
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
