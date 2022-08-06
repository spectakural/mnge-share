import { useState } from "react";
import "./ChatBox.scss";
import axios from "axios";

const ChatBox = ({ children, sendMessage, uploadFile }) => {
  const [message, setMessage] = useState("");

  return (
    <div className="chatbox-container">
      <div className="chatbox-header">
        <span>ChatBox</span>
      </div>
      <div className="chatbox-content">
        <div className="chats">{children}</div>
        <div className="input-box">
          <label for="file">
            <ion-icon name="attach"></ion-icon>
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={uploadFile}
          />
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
            <ion-icon name="send"></ion-icon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
