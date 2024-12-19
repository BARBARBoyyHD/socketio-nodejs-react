import { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client'

const socket = io.connect("http://localhost:4001")
function App() {
  const [message,setMessage] = useState("")
  const [messageReceive,setMessageReceive] = useState("")
  const sendMessage = ()=>{
    socket.emit("send_message",{message})
  }
  useEffect(()=>{
    socket.on("receive_message",(data)=>{
      setMessageReceive(data.message)
    })
  },[socket])
  return (
    <div className="App">
      <input placeholder='send a message...' onChange={(e)=> setMessage(e.target.value)}/>
      <button onClick={sendMessage}>Send a Message</button>
      <h1>Message</h1>
      {messageReceive}
    </div>
  );
}

export default App;
