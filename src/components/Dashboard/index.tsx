import { useState } from "react";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import WelcomeBanner from "./Welcome";
import Header from "../Header";
import Sidebar from "../Sidebar";

function Dashboard() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	return (
		<div className="flex h-screen overflow-hidden">
			{/* Sidebar */}
			<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

			{/* Content area */}
			<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
				{/*  Site header */}
				<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
				<div className="w-full flex-col flex space-y-8 p-5 sm:px=2 md:px-16">
					<WelcomeBanner name={"Sivaram"} />
					<Section1 />
					<Section2 />
					<Section3 />
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
