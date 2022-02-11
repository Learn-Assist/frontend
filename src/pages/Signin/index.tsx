import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineGoogle } from "react-icons/ai";
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	deleteUser,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { useContext } from "react";
import StoreContext, { actions } from "../../store";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
function Signin() {
	const { dispatch } = useContext(StoreContext);
	const auth = getAuth();
	const [form, setform] = useState({
		email: "",
		password: "",
	});
	const signInEmailPassword = async () => {
		try {
			await signInWithEmailAndPassword(auth, form.email, form.password);
			window.location.href = "/";
		} catch (error: any) {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorCode, errorMessage);
			dispatch(
				actions.toast.addToast({
					message: "Incorrect email or password.",
					type: "error",
					duration: "long",
				})
			);
		}
	};
	const googleSignIn = async (e: any) => {
		try {
			e.preventDefault();
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);
			const user = result.user;
			const userDoc = await axios.get(BACKEND_URL + "/users/" + user.uid);
			if (userDoc.data.uid) {
				window.location.href = "/";
			} else {
				dispatch(
					actions.toast.addErrorLong(
						"No accounts found for the account please signup for a new account"
					)
				);
				await deleteUser(user);
			}
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<div className="flex flex-col min-h-screen overflow-hidden">
			{/*  Page content */}
			<Navbar />
			<main className="flex-grow">
				<section className="bg-gradient-to-b from-gray-100 to-white">
					<div className="max-w-6xl mx-auto px-4 sm:px-6">
						<div className="pt-10 pb-12 md:pt-20 md:pb-20">
							{/* Page header */}
							<div className="max-w-3xl mx-auto text-center pb-12">
								<h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-accent">
									Welcome back. We are as excited to help you learn in a way you
									would love and enjoy!
								</h1>
							</div>

							{/* Form */}
							<div className="max-w-sm mx-auto">
								<form
									onSubmit={(e) => {
										e.preventDefault();
										signInEmailPassword();
									}}
								>
									<div className="flex flex-wrap -mx-3 mb-4">
										<div className="w-full px-3">
											<label
												className="block text-gray-800 text-sm font-medium mb-1"
												htmlFor="email"
											>
												Email
											</label>
											<input
												id="email"
												type="email"
												pattern="[^ @]*@[^ @]*"
												className="input input-primary w-full"
												placeholder="Enter your email address"
												required
												onChange={(e) =>
													setform({ ...form, email: e.target.value })
												}
												autoComplete="true"
											/>
										</div>
									</div>
									<div className="flex flex-wrap -mx-3 mb-4">
										<div className="w-full px-3">
											<div className="flex justify-between">
												<label
													className="block text-gray-800 text-sm font-medium mb-1"
													htmlFor="password"
												>
													Password
												</label>
												<Link
													to="/reset-password"
													className="text-sm font-medium text-accent hover:underline"
												>
													Having trouble signing in?
												</Link>
											</div>
											<input
												id="password"
												type="password"
												className="input input-primary w-full "
												placeholder="Enter your password"
												required
												onChange={(e) =>
													setform({ ...form, password: e.target.value })
												}
												autoComplete="true"
											/>
										</div>
									</div>
									<div className="flex flex-wrap -mx-3 mb-4">
										<div className="w-full px-3">
											<div className="flex justify-between">
												<label className="flex items-center">
													<input
														type="checkbox"
														className="checkbox checkbox-sm checkbox-primary"
														checked={true}
														onChange={(e) => {}}
													/>
													<span className="text-gray-600 ml-2">
														Keep me signed in
													</span>
												</label>
											</div>
										</div>
									</div>
									<div className="flex flex-wrap -mx-3 mt-6">
										<div className="w-full px-3">
											<button className="btn btn-primary w-full">
												Sign in
											</button>
										</div>
									</div>
								</form>
								<div className="flex items-center my-6">
									<div
										className="border-t border-gray-300 flex-grow mr-3"
										aria-hidden="true"
									></div>
									<div className="text-gray-600 italic">Or</div>
									<div
										className="border-t border-gray-300 flex-grow ml-3"
										aria-hidden="true"
									></div>
								</div>
								<form>
									{/* <div className="flex flex-wrap -mx-3 mb-3">
										<div className="w-full px-3">
											<button className="btn px-0 text-white bg-blue-800 hover:bg-blue-700 w-full relative flex items-center">
												<AiFillLinkedin className="w-5 h-5 fill-current text-white opacity-75 flex-shrink-0 mx-4" />
												<span className="flex-auto pl-16 pr-8 -ml-16">
													Continue with LinkedIn
												</span>
											</button>
										</div>
									</div> */}
									<div className="flex flex-wrap -mx-3">
										<div className="w-full px-3">
											<button
												onClick={(e) => googleSignIn(e)}
												className="btn btn-primary w-full border border-gray-200 relative flex items-center shadow-xl"
											>
												<AiOutlineGoogle className="w-6 h-6 fill-current opacity-75 flex-shrink-0 mx-4" />
												<span className="flex-auto pl-16 pr-8 -ml-16">
													Continue with Google
												</span>
											</button>
										</div>
									</div>
									<div className="text-center mt-8">
										Don't have an account?{" "}
										<Link
											className="text-secondary hover:underline"
											to="/signup"
										>
											Sign up
										</Link>
									</div>
								</form>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}

export default Signin;
