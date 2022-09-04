import { useState } from "react";
import io from "socket.io-client";
import "./App.css";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

const App = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", username, room);
    }
  };

  return (
    <div className="App">
      <div className="joinChatContainer">
        <h3>Join A Chat</h3>
        <input
          name="username"
          type="text"
          placeholder="Username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          name="room"
          type="text"
          placeholder="Room ID..."
          onChange={(e) => setRoom(e.target.value)}
        />
        <button onClick={joinRoom}>Join A Room</button>
      </div>
      <Chat socket={socket} username={username} room={room} />
    </div>
  );
};

export default App;
