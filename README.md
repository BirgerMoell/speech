# speech

## Speech APIs for real time voice analysis.


## Speech to text web
https://www.npmjs.com/package/react-speech-recognition

```js
import React from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { playAudio } from './App.js'

const Dictaphone = () => {
  const { transcript, resetTranscript } = useSpeechRecognition()

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  return (
    <div>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <button onClick={() => playAudio(transcript)}>Transcribe</button>
      <p>{transcript}</p>
    </div>
  )
}
export default Dictaphone
````

## Text to speech docker
https://github.com/synesthesiam/docker-mozillatts

```
docker run -it -p 5002:5002 synesthesiam/mozillatts
```

Running inside react
```js
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
```




