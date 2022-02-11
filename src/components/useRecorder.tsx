import { useEffect, useState } from "react";

const useRecorder = () => {
	const [srcAudioURL, setAudioURL] = useState("");
	const [isRecording, setIsRecording] = useState<any>(false);
	const [recorder, setRecorder] = useState<any>(null);
	const [data, setData] = useState<any>(null);

	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({ audio: true })
			.then((stream) => {
				const x = new MediaRecorder(stream);
				if (recorder === null) {
					if (isRecording) {
						setRecorder(x);
					}
					return;
				} else {
					if (isRecording) {
						recorder.start();
					} else {
						recorder.stop();
						stream
							.getTracks() // get all tracks from the MediaStream
							.forEach((track) => {
								track.stop();
							});
					}
				}
				recorder.addEventListener("dataavailable", handleData);
			})
			.catch((err) => {
				alert(err);
			});
		// Obtain the audio when ready.
		const handleData = (e: any) => {
			setData(e);
			setAudioURL(URL.createObjectURL(e.data));
		};
		return () => recorder?.removeEventListener("dataavailable", handleData);
	}, [recorder, isRecording]);

	const startRecording = () => {
		setIsRecording(true);
	};

	const stopRecording = () => {
		setIsRecording(false);
	};

	return [data, srcAudioURL, isRecording, startRecording, stopRecording];
};

export default useRecorder;
