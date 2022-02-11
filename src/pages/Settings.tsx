import { useContext, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import logo from "../images/logo.jpg";
import StoreContext from "../store";
import { user } from "../store/types";
function Account() {
	const [sidebarOpen, setSidebarOpen] = useState<any>(false);
	const { store } = useContext(StoreContext);
	const [form, setform] = useState<user>(store.user);

	return (
		<div className="flex h-screen overflow-hidden">
			{/* Sidebar */}
			<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

			{/* Content area */}
			<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
				{/*  Site header */}
				<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

				<main>
					<div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
						{/* Page header */}
						<div className="mb-8">
							{/* Title */}
							<h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
								Account Settings ✨
							</h1>
						</div>

						{/* Content */}
						<div className="bg-white shadow-lg rounded-sm mb-8">
							<div className="flex flex-col md:flex-row md:-mr-px">
								{/* <SettingsSidebar /> */}
								<div className="flex-grow">
									{/* Panel body */}
									<div className="p-6 space-y-6">
										<h2 className="text-2xl text-gray-800 font-bold mb-5">
											My Account
										</h2>
										{/* Picture */}
										<section>
											<div className="flex items-center">
												<div className="mr-4">
													<img
														className="w-20 h-20 rounded-full"
														src={logo}
														width="80"
														height="80"
														alt="User upload"
													/>
												</div>
												<button className="ml-3 btn-sm btn-primary">
													Change
												</button>
											</div>
										</section>
										{/* Business Profile */}
										<section>
											<h2 className="text-xl leading-snug text-gray-800 font-bold mb-1">
												Your Profile
											</h2>
											<div className="text-sm">
												Your full name and phone number.
											</div>
											<div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
												<div className="sm:w-1/2 md:1/3">
													<label
														className="block text-sm font-medium mb-1"
														htmlFor="name"
													>
														Name
													</label>
													<input
														id="name"
														className="input input-primary w-full"
														type="text"
														defaultValue={form.name}
													/>
												</div>

												<div className="sm:w-1/2 md:1/3">
													<label
														className="block text-sm font-medium mb-1"
														htmlFor="location"
													>
														Phone
													</label>
													<input
														id="location"
														placeholder="Your phone number"
														defaultValue={""}
														className="input input-primary w-full"
														type="text"
														onChange={(e) => {}}
													/>
												</div>
											</div>
										</section>
										{/* Email */}
										<section>
											<h2 className="text-xl w-1/2 leading-snug text-gray-800 font-bold mb-1">
												Email
											</h2>
											<div className="text-sm">Your school email address.</div>
											<div className="flex flex-wrap mt-5 w-full">
												<div className="mr-2 sm:w-2/3 md:w-1/3">
													<label className="sr-only" htmlFor="email">
														Email
													</label>
													<input
														defaultValue={form.email}
														id="email"
														className="w-full input input-primary"
														type="email"
														placeholder="email"
													/>
												</div>
												<button className="btn btn-primary">Change</button>
											</div>
										</section>
										{/* Password */}
										<section>
											<h2 className="text-xl leading-snug text-gray-800 font-bold mb-1">
												Password
											</h2>
											<div className="text-sm">
												You cannot set a password if you have signed up using
												Google sign in.
											</div>
											<div className="mt-5">
												<button className="btn btn-primary">
													Set New Password
												</button>
											</div>
										</section>
										{/* Grade */}
										<section>
											<h2 className="text-xl leading-snug text-gray-800 font-bold mb-1">
												Grade
											</h2>

											<div className="text-sm">
												You are in grade{" "}
												<span className="font-extrabold text-accent text-md">
													{store.user.grade}
												</span>
											</div>
											<div className="mt-5">
												<button className="btn btn-primary">
													School Profile
												</button>
											</div>
										</section>

										{/* School */}
										<section>
											<h2 className="text-xl w-full leading-snug text-gray-800 font-bold mb-1">
												School
											</h2>
											<div className="text-sm">Your school/institution</div>
											<div className="flex flex-wrap mt-5 w-full">
												<div className="mr-2">
													<label className="sr-only" htmlFor="email">
														school
													</label>
													<input
														defaultValue={form.school}
														id="school"
														className="w-full input input-primary"
														type="text"
														placeholder="school"
													/>
												</div>
												<button className="btn btn-primary">Change</button>
											</div>
										</section>
									</div>

									{/* Panel footer */}
									<footer>
										<div className="flex flex-col px-6 py-5 border-t border-gray-200">
											<div className="ml-auto my-4 flex self-end">
												<button className="btn btn-outline btn-secondary">
													Cancel
												</button>
												<button
													onClick={() => {
														//update.mutate(form);
													}}
													className="btn btn-primary ml-3"
												>
													Save Changes
												</button>
											</div>
										</div>
									</footer>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}

export default Account;
