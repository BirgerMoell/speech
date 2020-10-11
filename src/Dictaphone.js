import React, { useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { playAudio, generateText } from './App.js'

const Dictaphone = () => {
  const { transcript, resetTranscript } = useSpeechRecognition()
  const [sentence, setSentence] = useState("")

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  const getTextResponse = async (transcript) => {
    let words = await generateText(transcript)
    console.log("the words are", words)
    if (words && words.text) {
        console.log("inside words")
        playAudio(words.text)
        setSentence(words.text)
    }
  }

  return (
    <div>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>

      <p>{transcript}</p>
      <hr></hr>
      <button onClick={() => getTextResponse(transcript)}>Generate response</button>
      {sentence && <div className="Sentence-container"><p>{sentence}</p></div>}
    </div>
  )
}
export default Dictaphone