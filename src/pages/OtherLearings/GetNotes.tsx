import { useState } from "react";
import { useGetNotes } from "../../api/OpenAI";
function GetNotes() {
	const api = useGetNotes();
	const [input, setInput] = useState("");
	return (
		<>
			<div className="px-12">
				<div className="my-5 text-lg font-bold ">Get Notes</div>
				<div className="my-5">
					<div className="text-lg font-bold mb-4">Ask me anything...</div>
					<input
						type="text"
						className="input input-primary w-1/2"
						onChange={(e) => setInput(e.target.value)}
					/>
				</div>
				<button
					onClick={() => api.mutate(input)}
					className={`mr-2 my-3 btn btn-primary ${
						api.isLoading && "btn-disabled loading"
					} px-5`}
				>
					Get Notes
				</button>
				{/* <div>
					{!api.isLoading &&
					api.isSuccess &&
					api.data?.data?.trim() !== "[CLS]" ? (
						api.data.data.trim()
					) : (
						<div className="text-error font-bold">
							Sorry! I'm not intelligent enough to answer this.
						</div>
					)}
				</div> */}
				<div className="mockup-code max-w-xl overflowX-auto">
					{api.isSuccess &&
						api.data.data
							.trim()
							.split(".")
							.map((x: any, i: number) => (
								<div className="ml-3" key={i}>
									{" "}
									{"> "}
									<code className="text-primary max-w-xl">
										{x.toString().trim()}
									</code>
								</div>
							))}
				</div>
			</div>
		</>
	);
}

export default GetNotes;
