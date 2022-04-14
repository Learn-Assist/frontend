import axios from "axios";
import { useEffect, useState } from "react";
import { usePy2Nl } from "../../api/OpenAI";
import { OpenAIApiUrl } from "../../config";

function PyToNLP() {
	const api = usePy2Nl();
	const [code, setCode] = useState("");
	return (
		<>
			<div className="m-2 w-full">
				<h1 className="text-lg font-bold mb-2">
					Python to English language description
				</h1>
				<textarea
					className="textarea textarea-bordered w-full h-96"
					onChange={(e) => setCode(e.target.value)}
				></textarea>
				<button
					onClick={() => api.mutate(code)}
					className="mr-2 my-3 btn btn-primary px-5"
				>
					Get Code Description
				</button>
				<div className="mockup-code">
					{api.isSuccess &&
						api.data.data.split("\n").map((x: any, i: number) => (
							<pre key={i} data-prefix=">" className="text-primary">
								<code>{x.toString().trim()}</code>
							</pre>
						))}
				</div>
				{/* <div>
					{api.isSuccess &&
						api.data.data
							.split("\n")
							.map((x: any, i: number) => <div key={i}>{x}</div>)}
				</div> */}
			</div>
		</>
	);
}

export default PyToNLP;
