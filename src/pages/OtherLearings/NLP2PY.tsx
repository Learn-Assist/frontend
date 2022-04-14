import axios from "axios";
import { useEffect, useState } from "react";
import { useNl2Py } from "../../api/OpenAI";
import { OpenAIApiUrl } from "../../config";
function NLP2PY() {
	const api = useNl2Py();
	const [nl, setNl] = useState("");
	return (
		<>
			<div className="m-2 px-">
				<h1 className="text-lg font-bold mb-2">
					English language description to Python Code
				</h1>
				<textarea
					className="textarea textarea-bordered w-full h-96"
					onChange={(e) => setNl(e.target.value)}
				></textarea>

				<button
					onClick={() => api.mutate(nl)}
					className={`mr-2 my-3 btn btn-primary ${
						api.isLoading && "btn-disabled loading"
					} px-5`}
				>
					Get Code from the Description
				</button>

				<div className="mockup-code max-w-3/4 overflowX-auto">
					{api.isSuccess &&
						api.data.data
							.trim()
							.split("\n")
							.map((x: any, i: number) => (
								<pre key={i} data-prefix=">" className="text-primary">
									<code>{x.toString()}</code>
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

export default NLP2PY;
