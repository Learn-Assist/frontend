import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import StoreContext from "../store";

function PageNotFound() {
	const { store } = useContext(StoreContext);
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className="flex h-screen overflow-hidden">
			{/* Sidebar */}
			{store.user.uid && (
				<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
			)}

			{/* Content area */}
			<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
				{/*  Site header */}
				{store.user.uid && (
					<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
				)}
				<div className="flex flex-col overflow-hidden">
					{/*  Page content */}
					<main className="flex-grow">
						<section className="relative">
							{/* Illustration behind content */}
							<div
								className="absolute left-1/2 transform -translate-x-1/2 -mb-64 bottom-0 pointer-events-none -z-1"
								aria-hidden="true"
							></div>

							<div className="max-w-6xl mx-auto px-4 sm:px-6">
								<div className="pt-32 pb-12 md:pt-40 md:pb-20">
									<div className="max-w-3xl mx-auto text-center">
										{/* 404 content */}
										<h1 className="text-6xl font-extrabold text-accent mb-4">
											Oh, No! You stumbled upon a rarity
										</h1>
										<p className="text-lg text-secondary font-bold ">
											The page you are looking for does not exist. 😕
										</p>
										<div className="mt-8">
											<Link to="/" className="btn btn-primary">
												Go back home
											</Link>
										</div>
									</div>
								</div>
							</div>
						</section>
					</main>
				</div>
			</div>
		</div>
	);
}

export default PageNotFound;
