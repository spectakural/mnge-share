import { useState } from "react";
import "./PasswordSetterBox.scss";

const JoinRoomPopup = ({ rCode, setJoinPopup, joinRoom, joinPopup }) => {
  const [password, setPassword] = useState("");
  const [nickName, setNickName] = useState("");
  const [roomCode, setRoomCode] = useState("");

  const handleClick = () => {
    joinRoom(roomCode, password, nickName);
  };

  return (
    <div
      className={joinPopup ? "password-box-screen" : "password-screen-screen"}
      id="password-box-screen"
    >
      <div className="password-box">
        <div className="password-box-header">
          <span>
            <b>Join Room </b>
          </span>
        </div>
        <div className="password-form">
          <span>Enter room Code</span>
          <input
            placeholder="Enter room Code"
            type="text"
            onChange={(e) => setRoomCode(e.target.value)}
            value={roomCode}
          />
          <span>Enter room password</span>
          <input
            placeholder="Enter room Password"
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <span>Enter Nick Name</span>
          <input
            placeholder="Enter nick name"
            type="text"
            onChange={(e) => setNickName(e.target.value)}
            value={nickName}
          />
          <div className="buttons">
            <button onClick={() => setJoinPopup(false)}>Cancel</button>
            <button onClick={handleClick}>Join room!</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinRoomPopup;
