import { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:4001");

function App() {
  const [message, setMessage] = useState("");
  const [messageReceive, setMessageReceive] = useState("");
  const [word, setWord] = useState("");
  const [studentList, setStudentList] = useState([]);
  const sendMessage = () => {
    socket.emit("send_message", { message });
  };

  useEffect(() => {
    // Listen for "receive_message" event
    socket.on("receive_message", (data) => {
      setMessageReceive(data.message);
    });

    // Listen for "word" event
    socket.on("word", (data) => {
      setWord(data); // Automatically update state when "word" event is received
    });

    socket.on("student",(data)=>{
      setStudentList(data)
    })


    // Cleanup listeners when component unmounts
    return () => {
      socket.off("receive_message");
      socket.off("word");
      socket.off("student")
    };
  }, []);

  return (
    <div className="App">
      <input
        placeholder="send a message..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send a Message</button>
      
      <h1>Message</h1>
      <p>{messageReceive}</p>
      
      <h1>Backend:</h1>
      <p>{word}</p>

      <h1>Student List :</h1>
      <p>
        {
          studentList.map((student)=>(
            <li key={student.id}>
              {student.name} - {student.id}
            </li>
          ))
        }
      </p>
    </div>
  );
}

export default App;
