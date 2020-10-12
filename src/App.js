import React, { useState } from 'react';
import logo from './logo.svg';
import Dictaphone from './Dictaphone'
import './App.css';

let checkfor = "what is"
let explain = "explain"
let xplain = "x-plane"

const context = new AudioContext();

function checkForSummary(text) {
  text = text.toLowerCase();
  if (text.includes(checkfor)) {
    return text.split(checkfor)[1]
  } else if (text.includes(explain)) {
    return text.split(explain)[1]
  } else if (text.includes(xplain)) {
    return text.split(xplain)[1]
  }
  return false
}

export async function generateText(text) {

  let textToSum = checkForSummary(text)

  if (textToSum) {

    let data = {
      text: textToSum
    }
  
    let response = await fetch("http://127.0.0.1:8002/summary", 
      {
      method: "POST",
      contentType: "application/json",
      body: JSON.stringify(data)
    })
  
    let responseJson = await response.json()

    if (responseJson.text) {
      console.log("the summary response json", responseJson)
      return responseJson
    } else {
      return await generateFromApi(text)
    }
  } else {
    return await generateFromApi(text)
  }

}

async function generateFromApi(text) {
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

      {/* creepy head <iframe height="350px" width="500px" src="http://localhost:8009/container.html"/> */}

        <p>Voice to text to GPT to voice</p>

     
    
        <textarea onChange={(e) => setText(e.target.value)}></textarea>
        <button onClick={() => playAudio(text)}>Transcribe</button>
        {/* <button onClick={() => generateText(text)}>Generate</button> */}

        <audio id="audio_player" />

        {/* <VoiceRecorder/> */}

        <p>Start recording your voice</p>
        <Dictaphone />

      </header>
    </div>
  );
}

export default App;
