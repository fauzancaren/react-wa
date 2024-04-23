import logo from './logo.svg';
import './App.css';
import QrCode from "react-qr-code";
import { useEffect,useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:2000");


function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  function sendMessage() {
    console.log("Button clicked");
    socket.emit("create_session", { number: message  });
  }
  useEffect(() => {
    socket.on("qr", (data) => {
      setMessageReceived(data.message); 
    });
  }, [socket]);

  return (
    <div className="App">
      <h1>Whatsapp Web Js Client</h1> 
      <h1>QrCode</h1> 
      <input  placeholder="Message"
        onChange={(e) => {
          setMessage(e.target.value);
        }}/>
      <button onClick={sendMessage}>Send message</button>
      <h1>
        Message: {messageReceived}</h1>
      {/* <QrCode value="2@pxHANbQI4TsbQdKqEAh0heMCiv93sI0J2PFzVN6u3gOHzNF6x9g2H2hyVd/Je/XE26aJHu6/ixJyXA==,c6c65t5mnxcWsibO01i462MzOnQ5r56ntaDowY8J8Eo=,FklTlz7ggkzcYQrN7ZJx8yszknUUFK9Gp/RewspiFW0=,hm8lGZzeSeVWvJLjvHtUHGy8d5QmRKHy7g4G2IfA9hs=,1"/> */}
    </div>
  );
}

export default App;
