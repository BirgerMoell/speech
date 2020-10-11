import React from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { playAudio, generateText } from './App.js'

const Dictaphone = () => {
  const { transcript, resetTranscript } = useSpeechRecognition()

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  const getTextResponse = async (transcript) => {
    let words = await generateText(transcript)
    console.log("the words are", words)
    if (words && words.text) {
        console.log("inside words")
        playAudio(words.text)
    }
  }

  return (
    <div>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <button onClick={() => getTextResponse(transcript)}>Transcribe</button>
      <p>{transcript}</p>
    </div>
  )
}
export default Dictaphone