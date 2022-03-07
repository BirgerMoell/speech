import React, { useState, useEffect } from 'react'
import { playAudio, generateText } from './App.js'
import ClipLoader from "react-spinners/ClipLoader";
 
let wakeWord = "axela"

const Dictaphone = (props) => {

  const speech = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new speech()
  const grammar = 'hello; axela; summarize; joke; <color> = aqua | resource | forest | management | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;'
  const grammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
  const speechRecognitionList = new grammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.continous = true
  recognition.interimResults = true

  const [loading, setLoading] = useState(false)
  const [sentence, setSentence] = useState("")
  const [transcript, setTranscript] = useState("")
  const [meme, setMeme] = useState("")
  const [wake, setWake] = useState(false)

  const getTextResponse = async (transcript, api) => {
    setLoading(true)
    let words = await generateText(transcript, api)
    if (words && words.image) {
      console.log("the words are", words)
      setMeme(words.image)
      setLoading(false)
    } 
    
    else if (words && words.text) {
      console.log("the words are", words)
        console.log("inside words")
        playAudio(words.text, props.web)
        setSentence(words.text)
        setLoading(false)
    }
  }

  const startListening = async () => {
    // const context = new AudioContext();
    // context.resume();
    setSentence("")
    setMeme("")
    //SpeechRecognition.startListening()
    recognition.start()
  }

  const reset = async () => {
    setSentence("")
    setTranscript("")
    setMeme("")
    setWake(false)
    recognition.stop()
  }

  recognition.onresult = function(event) {
    console.log("the event is", event)
    const transcript = event.results[0][0].transcript;
    console.log(transcript)

    if (transcript.includes("Forest Management")) {
      alert("we got the rhight word")
    }

    setTranscript(transcript)

 } 

  return (
    <div>
      <button onClick={() => startListening()}>Start</button>
      {/* <button onClick={recognition.stop}>Stop</button> */}
      <button onClick={() => reset()}>Reset</button>

      <p>{transcript}</p>

  
      <ClipLoader
          size={150}
          color={"#96E42B"}
          loading={loading}
        />
      {sentence && !loading && <div className="Sentence-container"><p>{sentence}</p></div>}
    </div>
  )
}
export default Dictaphone