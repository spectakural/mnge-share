import React from "react";
import "./Chat.scss";
import { useSelector } from "react-redux";

const Chat = ({ message, showName }) => {
  let date = message.timestamp.toDate();
  const nickName = useSelector((state) => state.room.nickName);

  return (
    <div
      className={
        (nickName == message.sender
          ? "chat-container chat-self"
          : "chat-container") + (!showName ? " no-name" : "")
      }
    >
      {showName && <div className="chat-header">{message.sender}</div>}
      <div className="chat-content">{message.text}</div>
      <div className="chat-footer">
        {String(date.getHours()).padStart(2, "0")} :{" "}
        {String(date.getMinutes()).padStart(2, "0")}
      </div>
    </div>
  );
};

export default Chat;
