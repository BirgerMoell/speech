import React, { useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { playAudio, generateText } from './App.js'

import ClipLoader from "react-spinners/ClipLoader";
 

const Dictaphone = () => {
  const { transcript, resetTranscript } = useSpeechRecognition()
  const [loading, setLoading] = useState(false)
  const [sentence, setSentence] = useState("")

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  const getTextResponse = async (transcript) => {
    setLoading(true)
    let words = await generateText(transcript)
    console.log("the words are", words)
    if (words && words.text) {
        console.log("inside words")
        playAudio(words.text)
        setSentence(words.text)
        setLoading(false)
    }
  }

  const startListening = async () => {
    setSentence("")
    SpeechRecognition.startListening()
  }

  const reset = async () => {
    setSentence("")
    resetTranscript()
  }


  return (
    <div>
      <button onClick={startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={reset}>Reset</button>

      <p>{transcript}</p>
      <hr></hr>
      {!loading &&  <button onClick={() => getTextResponse(transcript)}>Generate response</button>}
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