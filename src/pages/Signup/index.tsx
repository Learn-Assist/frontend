import { AiOutlineGoogle } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";

import {
	getAuth,
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
	deleteUser,
} from "firebase/auth";
import { useCreate } from "../../api/User";
import { user } from "../../store/types";
import StoreContext, { actions } from "../../store";
import { Link } from "react-router-dom";

function SignUp() {
	const { store, dispatch } = useContext(StoreContext);
	const [form, setForm] = useState({
		email: "",
		password: "",
		name: "",
		confirmPassword: "",
		phone: "",
	});
	const auth = getAuth();
	const create = useCreate();

	useEffect(() => {
		if (create.isError) {
			const user = getAuth().currentUser;
			if (user) deleteUser(user);
		}
		if (create.isSuccess) {
			dispatch(actions.toast.addSuccess("Created user!"));
			window.location.href = "/";
		}
	}, [create.isError, create.isSuccess]);

	const signUp = (e: any) => {
		let user: any;
		e.preventDefault();
		if (
			form.password === form.confirmPassword &&
			form.password.length > 7 &&
			form.name.length > 0 &&
			form.email.length > 0
		) {
			const newUser: user = {
				uid: "",
				name: form.name,
				email: form.email,
				grade: 1,
				age: 0,
				school: "",
				timeActiveInMinutes: 0,
				createdAt: new Date(),
				updatedAt: new Date(),
				photoURL: user?.photoURL || "",
				tests: [],
			};
			createUserWithEmailAndPassword(auth, form.email, form.password)
				.then((userCredential) => {
					// Signed in
					const user_ = userCredential.user;
					user = user_;
					newUser.uid = user_.uid;
					create.mutate(newUser);
				})
				.catch((error) => {
					//await deleteUser(user);
					const errorCode = error.code;
					const errorMessage = error.message;
					console.log(error, errorCode, errorMessage);
					if (errorCode === "auth/email-already-in-use") {
						dispatch(
							actions.toast.addToast({
								message: "User with this email already exists. Please sign in.",
								type: "error",
								duration: "short",
							})
						);
					}
				});
		} else {
			dispatch(
				actions.toast.addToast({
					message: "Please enter valid details",
					type: "error",
					duration: "short",
				})
			);
		}
	};
	const signUpGoogle = async (e: any) => {
		let result;
		e.preventDefault();
		try {
			const provider = new GoogleAuthProvider();
			const result_ = await signInWithPopup(auth, provider);
			result = result_;
			const user = result.user;
			const newUser: user = {
				uid: user.uid,
				name: user?.displayName || "",
				email: user?.email as string,
				grade: 1,
				age: 0,
				school: "",
				timeActiveInMinutes: 0,
				createdAt: new Date(),
				updatedAt: new Date(),
				photoURL: user?.photoURL || "",
				tests: [],
			};
			create.mutate(newUser);
		} catch (e) {
			if (result) {
				console.log(result);
				await deleteUser(result.user);
			}
		}
	};
	return (
		<div className="flex flex-col min-h-screen overflow-hidden">
			{/*  Page content */}
			<main className="bg-white flex-grow">
				<section className="bg-gradient-to-b from-warmGray-100 to-white">
					<div className="max-w-6xl mx-auto px-4 sm:px-6">
						<div className="pt-2 pb-12 md:pt-28 md:pb-12">
							{/* Page header */}
							<div className="max-w-3xl mx-auto text-center pb-8 md:pb-20">
								<h1 className="text-accent text-5xl font-extrabold">
									Welcome. We are excited to help you learn in a way you've
									never seen before.
								</h1>
							</div>

							{/* Form */}
							<div className="max-w-sm mx-auto">
								<form>
									<div className="flex flex-wrap -mx-3 mb-4">
										<div className="w-full px-3">
											<label
												className="block text-gray-800 text-sm font-medium mb-1"
												htmlFor="name"
											>
												Name <span className="text-red-600">*</span>
											</label>
											<input
												id="name"
												type="text"
												className="input input-primary w-full"
												placeholder="Enter your name"
												required
												onChange={(e) =>
													setForm({ ...form, name: e.target.value })
												}
											/>
										</div>
									</div>
									<div className="flex flex-wrap -mx-3 mb-4">
										<div className="w-full px-3">
											<label
												className="block text-gray-800 text-sm font-medium mb-1"
												htmlFor="email"
											>
												Email <span className="text-red-600">*</span>
											</label>
											<input
												id="email"
												type="email"
												className="input input-primary w-full"
												placeholder="Enter your email address"
												required
												onChange={(e) =>
													setForm({ ...form, email: e.target.value })
												}
											/>
										</div>
									</div>
									<div className="flex flex-wrap -mx-3 mb-4">
										<div className="w-full px-3">
											<label
												className="block text-gray-800 text-sm font-medium mb-1"
												htmlFor="email"
											>
												Phone
											</label>
											<input
												id="email"
												type="tel"
												className="input input-primary w-full"
												placeholder="Enter your phone number"
												required
												onChange={(e) =>
													setForm({ ...form, phone: e.target.value })
												}
											/>
										</div>
									</div>
									<div className="flex flex-wrap -mx-3 mb-4">
										<div className="w-full px-3">
											<label
												className="block text-gray-800 text-sm font-medium mb-1"
												htmlFor="password"
											>
												Password <span className="text-red-600">*</span>
											</label>
											<input
												id="password"
												type="password"
												className="input input-primary w-full"
												placeholder="Enter your password"
												required
												onChange={(e) =>
													setForm({ ...form, password: e.target.value })
												}
											/>
										</div>
									</div>
									<div className="flex flex-wrap -mx-3 mb-4">
										<div className="w-full px-3">
											<label
												className="block text-gray-800 text-sm font-medium mb-1"
												htmlFor="password"
											>
												Confirm password <span className="text-red-600">*</span>
											</label>
											<input
												id="password"
												type="password"
												className="input input-primary w-full"
												placeholder="Enter your password"
												required
												onChange={(e) =>
													setForm({ ...form, confirmPassword: e.target.value })
												}
											/>
										</div>
									</div>
									<div className="flex flex-wrap -mx-3 mt-6">
										<div className="w-full px-3">
											{/* {!create.isLoading && ( */}
											<button
												onClick={(e) => signUp(e)}
												className="btn btn-primary w-full"
											>
												Sign up
											</button>
											{create.isLoading && (
												<button className="btn text-white bg-blue-200 w-full">
													Signing up...
												</button>
											)}
										</div>
									</div>
									{/* <div className="text-sm text-gray-500 text-center mt-3">
										By creating an account, you agree to the{" "}
										<a className="underline" href="#0">
											terms &amp; conditions
										</a>
										, and our{" "}
										<a className="underline" href="#0">
											privacy policy
										</a>
										.
									</div> */}
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
									<div className="flex flex-wrap -mx-3">
										<div className="w-full px-3">
											<button
												onClick={(e) => signUpGoogle(e)}
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
										Already have an account?{" "}
										<Link
											className="text-secondary hover:underline"
											to="/signin"
										>
											Sign in
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

export default SignUp;
