import { useContext, useState } from "react";
import GradeSection from "../../components/Contents/GradeSection";
import SubjectSection from "../../components/Contents/SubjectSection";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import StoreContext from "../../store";

function Contents() {
	const { store } = useContext(StoreContext);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	return (
		<>
			<div className="flex h-screen overflow-hidden">
				{/* Sidebar */}
				<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

				{/* Content area */}
				<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
					{/*  Site header */}
					<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
					<div className="w-full flex-col flex space-y-4 p-5 sm:px-2 md:px-16">
						<GradeSection />
						<SubjectSection />
					</div>
				</div>
			</div>
		</>
	);
}

export default Contents;
