import React, { useState } from 'react';
import logo from './logo.svg';
import Dictaphone from './Dictaphone'
import './App.css';

const context = new AudioContext();

export async function generateText(text) {

  let data = {
    text: text
  }

  let response = await fetch("http://127.0.0.1:8002/generate", 
    {
    method: "POST",
    contentType: "application/json",
    body: JSON.stringify(data)
  })

  let responseJson = await response.json()


  console.log("the response json", responseJson)
  return responseJson

}


export async function playAudio(text) {
  var audio = new Audio(`http://localhost:5002/api/tts?text=${encodeURIComponent(text)}`);
  audio.type = 'audio/wav';

  try {
    await audio.play();
    console.log('Playing...');
  } catch (err) {
    console.log('Failed to play...' + err);
  }
}

function App() {

  const [text, setText] = useState("")

  return (
    <div className="App">
      <header className="App-header">

        <p>Voice to text to GPT to voice</p>
    
        <textarea onChange={(e) => setText(e.target.value)}></textarea>
        <button onClick={() => playAudio(text)}>Transcribe</button>
        <button onClick={() => generateText(text)}>Generate</button>

        <audio id="audio_player" />

        {/* <VoiceRecorder/> */}
        <Dictaphone />

      </header>
    </div>
  );
}

export default App;
