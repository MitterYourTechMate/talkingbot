import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import axios from 'axios';

const Recorder = () => {
    const [data, setData] = useState("")
    const handleDownloadAudio = async () => {
        let audio = await axios.post("http://localhost:3000", {text:transcript}, {
            responseType:"blob"
        })
        let url = window.URL.createObjectURL(audio.data)
        setData(url)
    }
    const commands = [{
        command: 'delete',
        callback: () => resetTranscript()
      },
      {
        command: 'send',
        callback: () => handleDownloadAudio()
      }
    ]

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({commands});

  const startListening = SpeechRecognition.startListening({continuous:true})

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div style={{display:"flex", flexDirection:"column", width:"500px", justifyContent:"center", alignItems:"center"}}>
        <KeyboardVoiceIcon style={{fontSize:"200px"}}></KeyboardVoiceIcon>
      {/* <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button> */}
      <p>{transcript}</p>
      <audio src={data} autoPlay controls/>
    </div>
  );
};
export default Recorder;