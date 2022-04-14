import { useState, useEffect } from "react";
import { SayButton } from "react-say";
import useRecorder from "../components/useRecorder";
import axios from "axios";
function Home() {
	let [data, srcAudioURL, isRecording, startRecording, stopRecording] =
		useRecorder();
	const [speak, setspeak] = useState("");
	const [speak1, setspeak1] = useState("");
	const [res, setres] = useState(false);
	// useEffect(() => {
	// 	if ("speechSynthesis" in window) {
	// 		var msg = new SpeechSynthesisUtterance();
	// 		msg.voice =
	// 			window.speechSynthesis
	// 				.getVoices()
	// 				.find((v) => v.name === "Microsoft Heera - English (India)") || null;
	// 		msg.pitch = 1.4;
	// 		msg.rate = 0.8;
	// 		msg.volume = 2;
	// 		msg.text = speak1;
	// 		window.speechSynthesis.speak(msg);
	// 	} else {
	// 		alert("Sorry, your browser doesn't support text to speech!");
	// 	}
	// }, [res]);

	useEffect(() => {
		if (res) setTimeout(() => setres(false), 2000);
	}, [res]);

	return (
		<div style={{ margin: 10, minHeight: "70vh" }} className="">
			<div>
				<h1 className="text-5xl font-bold my-3 m-3">Convert speech to text</h1>
				<h2 className="text-2xl mb-5 m-3">
					Final year project prototype testing
				</h2>
				<h3 className="text-xl m-3">
					Enter something to convert it into speech. The speech is sent to a
					Flask API where it is converted into text.
				</h3>

				<input
					className="input input-primary m-3"
					type="text"
					placeholder="Enter text to speak"
					onChange={(e) => setspeak(e.target.value)}
				/>
				<div className="btn btn-primary m-3">
					<SayButton pitch={1.0} rate={1} speak={speak} volume={1}>
						Speak
					</SayButton>
				</div>

				<div>
					<div className="app">
						<button
							className="btn btn-primary m-3"
							onMouseDown={startRecording}
							onMouseUp={() => {
								stopRecording();
								// const x = new FormData();
								// x.append("file", data?.data)
								// axios.post('http://localhost:3005/audio', x).then(z => {
								//   setspeak1(z.data)
								//   setres(true)
								// })
							}}
						>
							Record (hold)
						</button>
						<button
							className="btn btn-primary m-3"
							onClick={startRecording}
							disabled={isRecording}
						>
							Start recording
						</button>
						<button
							className="btn btn-primary m-3"
							onClick={async () => {
								stopRecording();
							}}
							disabled={!isRecording}
						>
							Stop recording
						</button>
						<p></p>
					</div>
					<button
						className="btn btn-primary m-3"
						onClick={async () => {
							const x = new FormData();
							x.append("file", data?.data);
							const z = await axios.post("http://localhost:3005/audio", x);
							setspeak1(z.data);
						}}
					>
						Convert to Text
					</button>
					<h1 className="m-3 text-xl">Speech to text content: {speak1}</h1>
				</div>
			</div>
		</div>
	);
}

export default Home;
