import { useState } from "react";
import "./PasswordSetterBox.scss";

const PasswordSetterBox = ({ rcode, open, setOpenCreate }) => {
  const [password, setPassword] = useState("");
  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div
      className={open ? "password-box-screen-active" : "password-box-screen"}
    >
      <div className="password-box">
        <div className="close" onClick={() => setOpenCreate(false)}>
          <ion-icon name="close-outline"></ion-icon>
        </div>
        <div className="password-box-header">
          <label>Room Code</label>
          <input type="text" value={rcode} readOnly />
          <label>Password</label>
          <input type="text" value={password} onChange={updatePassword} />
        </div>
      </div>
    </div>
  );
};

export default PasswordSetterBox;
