import React, { useState } from 'react';
import logo from './logo.svg';
import Dictaphone from './Dictaphone'
import { getApi, getGiphy } from './api.js'
import './App.css';

let checkfor = "what is"
let explain = "explain"
let xplain = "x-plane"
let joke = "joke"
let meme = "meme"

const context = new AudioContext();

function checkForSummary(text, api) {
  text = text.toLowerCase();
  if (text.includes(checkfor)) {
    return text.split(checkfor)[1]
  } else if (text.includes(explain)) {
    return text.split(explain)[1]
  } else if (text.includes(xplain)) {
    return text.split(xplain)[1]
  } else if (api === "summary")
    return text
  return false
}

function checkForJoke(text) {
  text = text.toLowerCase();

  if (text.includes(joke)) {
    return joke
  } else {
    return false
  }
}

async function checkForMeme(text) {
  text = text.toLowerCase();
  if (text.includes(meme)) {
    let meme = await getGiphy("kitten")
    return meme
  } else {
    return false
  }
}


async function getJoke() {
  let joke = await getApi("https://official-joke-api.appspot.com/jokes/programming/random")
  console.log("the joke is", joke)
  let jokeResponse = joke[0].setup + " " + joke[0].punchline
  let response = {
    text: jokeResponse
  }
  console.log("the joke response is", response)
  return response
}



export async function generateText(text, api) {
  let tellJoke = checkForJoke(text)
  let textToSum = checkForSummary(text, api)
  let showMeme = await checkForMeme(text)

  if (showMeme) {
    let response = {
      image: showMeme
    }
    return response
  }

  else if (tellJoke) {
    console.log("inside get joke")
    return await getJoke()
  }

  else if (textToSum) {

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

export async function playAudioWeb(text) {
  let utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}

export async function playAudioDocker(text) {
  var audio = new Audio(`http://localhost:5002/api/tts?text=${encodeURIComponent(text)}`);
  audio.type = 'audio/wav';

  try {
    await audio.play();
    console.log('Playing...');
  } catch (err) {
    console.log('Failed to play...' + err);
  }
}

export async function playAudio(text, web) {
  if (web) {
    playAudioWeb(text)
  }
  else {
    playAudioDocker(text)
  }
}


function App() {

  const [text, setText] = useState("")
  const [web, useWeb] = useState(false)
  const [api, setApi] = useState("gpt2")

  const updateApi = (e) => {
    setApi(e.target.value)
  }

  return (
    <div className="App">

      <header className="App-header">

        <p>Voice to Voice</p>

        <label for="api">Api</label>
        <br></br>
        <select name="api" id="api" onChange={updateApi}>
          <option default value="gpt2">GPT-2</option>
          <option value="summary">Summary</option>
        </select>
        <br></br>

        <label for="language">Language</label>
        <br></br>
        <select name="language" id="language" onChange={updateApi}>
          
          <option default value="en-us">English</option>
          <option value="swe">Swedish</option>
        </select>

        {/* <textarea onChange={(e) => setText(e.target.value)}></textarea>
        <button onClick={() => playAudio(text)}>Transcribe</button> */}

        {/* <button onClick={() => generateText(text)}>Generate</button> */}

        <audio id="audio_player" />

        <p>Share your voice</p>
        <Dictaphone api={api} web={web} />

      </header>
    </div>
  );
}

export default App;
