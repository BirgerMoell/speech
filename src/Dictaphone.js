import React, { useState, useEffect } from 'react'
import { playAudio, generateText } from './App.js'
import ClipLoader from "react-spinners/ClipLoader";
 
let wakeWord = "axela"

const Dictaphone = (props) => {

  const speech = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new speech()
  const grammar = 'hello; axela; summarize; joke; <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;'
  const grammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
  const speechRecognitionList = new grammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.continous = false
  recognition.interimResults = false

  const [loading, setLoading] = useState(false)
  const [sentence, setSentence] = useState("")
  const [transcript, setTranscript] = useState("")
  const [meme, setMeme] = useState("")
  const [wake, setWake] = useState(false)
  const [generatedImage, setGeneratedImage] = useState("http://127.0.0.1:8002/images/psychedelic jesus099dc0c3-6514-4e97-84b9-2cf743a1801c.png")

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
    setGeneratedImage("")
    recognition.stop()
  }

  recognition.onresult = async function(event) {
    //console.log("the event on result is", event)
    const transcript = event.results[0][0].transcript;
    console.log(transcript)
    let wake = checkForWakeWord(transcript)
    // if (wake) {
    //   console.log("the split is", transcript.split("hello".toLowerCase()))
    //   setTranscript(transcript.split("hello")[1])
    // }
    console.log("we got results")
    setTranscript(transcript)

    if (transcript.length > 10) {
      console.log("we got a really long word")
      await makeAnImage(transcript)
      setTranscript("listening...")
      recognition.start()
    }
   

    // if (transcript.length > 8) {
    //   getTextResponse(transcript, props.api)
    // }
 }

 async function checkForWakeWord(text) {
  text = text.toLowerCase();
  if (text.includes(wakeWord)) {
    setWake(true)
    return true
    //alert("the wake-word was called")
  }
}

async function makeAnImage(text) {
  text = text.toLowerCase();

  console.log("the text is", text)
  let data = {
    text: text
  }

  console.log("the data is", data)
  // generate on the api
  let response = await fetch("http://127.0.0.1:8002/generate_image",
  {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    contentType: "application/json",
    body: JSON.stringify(data)
  })

  let responseJson = await response.json()
  console.log("the image url is", responseJson.text)
  let image_url = responseJson.text
  let base_url = "http://127.0.0.1:8002/"
  let full_image_url = base_url + image_url
  console.log("the image url is", full_image_url)
  setGeneratedImage(full_image_url)
}

  return (
    <div>
      <button onClick={() => startListening()}>Start</button>
      {/* <button onClick={recognition.stop}>Stop</button> */}
      <button onClick={() => reset()}>Reset</button>

      {wake && <p style={{fontSize: '8px'}}>Listening</p> }
      <p>{transcript}</p>
      <hr></hr>
      {/* {!loading &&  <button onClick={() => getTextResponse(transcript, props.api)}>Generate response</button>} */}
      {/* <button onClick={() => makeAnImage(transcript)}>Make an image</button> */}
      {generatedImage && 
      <div><img height="400px" width="400px" src={generatedImage}/>
      </div>}
      {meme && <div className="Meme-container"><img height="300px" width="300px" src={meme}/><br></br></div> }
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