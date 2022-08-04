import { useState } from "react";
import "./PasswordSetterBox.scss";

const PasswordSetterBox = ({
  rCode,
  setPasswordBox,
  createNewRoom,
  passwordBox,
}) => {
  const [password, setPassword] = useState("");
  const [nickName, setNickName] = useState("");

  const startRoom = () => {
    createNewRoom(nickName, password);
  };

  return (
    <div
      className={passwordBox ? "password-box-screen" : "password-screen-screen"}
      id="password-box-screen"
    >
      <div className="password-box">
        <div className="password-box-header">
          <span>
            Room <span className="rcode">{rCode}</span>
            <i
              className="fa-light fa-clipboard"
              onClick={() => {
                navigator.clipboard.writeText(rCode);
              }}
            ></i>
          </span>
        </div>
        <div className="password-form">
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
            <button onClick={() => setPasswordBox(false)}>Cancel</button>
            <button onClick={startRoom}>Start room!</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordSetterBox;
