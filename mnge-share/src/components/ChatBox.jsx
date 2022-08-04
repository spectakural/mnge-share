import { useState } from "react";
import "./ChatBox.scss";

const ChatBox = ({ children, sendMessage }) => {
  const [message, setMessage] = useState("");
  return (
    <div className="chatbox-container">
      <div className="chatbox-header">
        <span>ChatBox</span>
      </div>
      <div className="chatbox-content">
        <div className="chats">{children}</div>
        <div className="input-box">
          <input
            type="text"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendMessage(message);
                setMessage("");
              }
            }}
          />
          <button
            onClick={() => {
              sendMessage(message);
              setMessage("");
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
