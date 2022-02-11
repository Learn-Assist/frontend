import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Roadmap from "./pages/Roadmap";
import ChatWidget from "./pages/Chat";
import StoreProvider from "./store";
import { useContext, useEffect, useState } from "react";
import ToastHandler from "./components/toast/ToastHandler";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SignUp from "./pages/Signup";
import Signin from "./pages/Signin/index";
import ResetPassword from "./pages/Signin/ResetPassword";
import PageNotFound from "./pages/404";
import { useGet } from "./api/User";
import Dashboard from "./components/Dashboard";
import Account from "./pages/Settings";

function App() {
	const { store } = useContext(StoreProvider);
	const auth = getAuth();
	const [user, setUser] = useState<any>({ uid: "" });
	const [userStatus, setUserStatus] = useState<
		"loading" | "no_user" | "user_found"
	>("loading");
	const userQuery = useGet(user.uid);
	useEffect(() => {
		onAuthStateChanged(auth, (user_obj) => {
			if (user_obj) {
				setUser(user_obj);
				setUserStatus("user_found");
			} else {
				console.log("user is null");
				setUserStatus("no_user");
			}
		});
	});
	useEffect(() => {
		if (!!user.uid) {
			userQuery.refetch();
		}
	}, [userStatus]);
	return (
		<>
			{userStatus !== "loading" && (
				<main className="scrollbar-hidden">
					<ToastHandler />
					{store.user?.uid &&
						userStatus === "user_found" &&
						!userQuery.isError && (
							<Routes>
								<Route path="/about" element={<About />} />
								<Route path="/roadmap" element={<Roadmap />} />
								<Route path="/" element={<Dashboard />} />
								<Route path="/assist" element={<ChatWidget />} />
								<Route path="/profile" element={<Account />} />
								<Route path="*" element={<PageNotFound />} />
							</Routes>
						)}
					{store.user?.uid && userStatus === "user_found" && userQuery.isError && (
						<>
							<Navbar />
							{user.uid && userQuery.isError && (
								<div className="alert alert-error rounded-none">
									<div className="flex-1">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											className="w-6 h-6 mx-2 stroke-current"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
											></path>
										</svg>
										<label>
											There was an error while accessing the server! Please try
											later while we work on it.
										</label>
									</div>
								</div>
							)}
						</>
					)}
					{userStatus === "no_user" && (
						<>
							<Routes>
								<Route path="/" element={<Signin />}>
									<Route path="home" element={<Signin />} />
								</Route>
								<Route path="/signin" element={<Signin />} />
								<Route path="/signup" element={<SignUp />} />
								<Route path="/reset-password" element={<ResetPassword />} />
								<Route path="*" element={<PageNotFound />} />
							</Routes>
							<Footer />
						</>
					)}
				</main>
			)}{" "}
			{userStatus === "loading" && <div>Loading...</div>}
		</>
	);
}

export default App;
