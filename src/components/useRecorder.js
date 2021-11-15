import { useEffect, useState } from "react";

const useRecorder = () => {
    const [audioURL, setAudioURL] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [recorder, setRecorder] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true, }).then(stream => {
            const x = new MediaRecorder(stream);
            if (recorder === null) {
                if (isRecording) {
                    setRecorder(x);
                }
                return;
            }
            else {
                if (isRecording) {
                    recorder.start();
                } else {
                    console.log("Stop", isRecording)
                    recorder.stop();
                    console.log(recorder.state)
                    stream.getTracks() // get all tracks from the MediaStream
                        .forEach(track => {
                            track.stop()
                            console.log("Track", track)
                        });
                }
            }
            recorder.addEventListener("dataavailable", handleData);
        })
        // Obtain the audio when ready.
        const handleData = e => {
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

    return [data, audioURL, isRecording, startRecording, stopRecording];
};


export default useRecorder;

