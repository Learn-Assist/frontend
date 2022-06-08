import { useContext, useState } from "react";
import Section1 from "../components/Dashboard/Section1";
import Section2 from "../components/Dashboard/Section2";
import Section3 from "../components/Dashboard/Section3";
import WelcomeBanner from "../components/Dashboard/Welcome";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { BiRightArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import StoreContext from "../store";
function Dashboard() {
	const { store } = useContext(StoreContext);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	return (
		<div className="flex h-screen overflow-hidden">
			{/* Sidebar */}
			<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

			{/* Content area */}
			<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
				{/*  Site header */}
				<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
				<div className="w-full flex-col flex space-y-4 p-5 sm:px-2 md:px-16">
					<WelcomeBanner name={store.user.name || "Guest"} />
					{/* <div className="alert alert-error font-bold text-xs sm:text-sm md:text-md lg:text-lg xl:text-lg">
						Dashboard contents below are sample data. They are not functional
						yet.
					</div> */}
					<div>
						<Link to="/assist" className="btn btn-primary">
							Go to Assistant <BiRightArrowAlt size={20} />
						</Link>
					</div>
					<Section1 />
					<Section2 />
					<Section3 />
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
