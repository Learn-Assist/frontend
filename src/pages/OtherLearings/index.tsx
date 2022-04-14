import { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import GetNotes from "./GetNotes";
import NLP2PY from "./NLP2PY";
import PyToNLP from "./PyToNLP";

function OtherLearnings() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [type, setType] = useState<
		"PY2NL" | "NL2PY" | "QUICK_DOUBTS" | "GET_NOTES"
	>("PY2NL");
	return (
		<>
			<div className="flex h-screen overflow-hidden">
				{/* Sidebar */}
				<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

				{/* Content area */}
				<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
					{/*  Site header */}
					<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
					<div className="w-full flex space-y-4 p-5 sm:px-2 md:px-16">
						<div
							style={{ height: window.innerHeight * 0.85 }}
							className="overflow-y-auto  w-0 invisible lg:visible md:visible xl:visible 2xl:visible 
								lg:w-1/4 md:w-1/4 xl:w-1/4 2xl:w-1/4
				 				 mb-8 flex flex-col scrollbar-hiddenh-full border-r-2 border-primary"
						>
							<button className="m-2 btn btn-sm  btn-primary w-3/4">
								Reset Session
							</button>
							<h2 className="ml-3 h5 mt-12">Select what you want to do:</h2>
							<button
								onClick={() => setType("PY2NL")}
								className={`m-2 btn btn-sm ${
									type !== "PY2NL" ? "btn-outline" : "btn-accent"
								} btn-accent w-3/4`}
							>
								Python to English
							</button>
							<button
								onClick={() => setType("NL2PY")}
								className={`m-2 btn btn-sm ${
									type !== "NL2PY" ? "btn-outline" : "btn-accent"
								} btn-accent w-3/4`}
							>
								English to Python
							</button>
							<button
								onClick={() => setType("GET_NOTES")}
								className={`m-2 btn btn-sm ${
									type !== "GET_NOTES" ? "btn-outline" : "btn-accent"
								} btn-accent w-3/4`}
							>
								Get Notes for anything
							</button>
						</div>
						<div className="h-full w-full">
							{type === "PY2NL" && <PyToNLP />}
							{type === "NL2PY" && <NLP2PY />}
							{type === "GET_NOTES" && <GetNotes />}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default OtherLearnings;
