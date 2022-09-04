import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    const sendLocaleTime = new Date(Date.now()).toLocaleString();

    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: sendLocaleTime,
      };

      await socket.emit("send_message", messageData);
      setMessageList((prev) => [...prev, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (receivedMessage) => {
      setMessageList((prev) => [...prev, receivedMessage]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((message) => {
            return (
              <div
                className="message"
                id={username === message.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{message.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{message.time}</p>
                    <p id="author">{message.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="message..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>✉️</button>
      </div>
    </div>
  );
};

export default Chat;
