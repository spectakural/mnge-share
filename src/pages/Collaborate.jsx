import "./Collaborate.scss";
import { useState } from "react";
import Ripples from "react-ripples";
import PasswordSetterBox from "../components/PasswordSetterBox";
import { v4 } from "uuid";

const Collaborate = () => {
  const [passwordBox, setPasswordBox] = useState(false);
  const rcode = v4().slice(0, 5);

  return (
    <div className="collab">
      <Ripples color="#ff000022">
        <div className="button" onClick={() => setPasswordBox(true)}>
          <div className="create-room">
            <ion-icon name="add-outline"></ion-icon>
          </div>
        </div>
      </Ripples>
      <Ripples color="#ff000022">
        <div className="button">
          <div className="join-room">
            <ion-icon name="enter-outline"></ion-icon>
          </div>
        </div>
      </Ripples>
      {passwordBox ? (
        <PasswordSetterBox rcode={rcode} setPasswordBox={setPasswordBox} />
      ) : null}
    </div>
  );
};

export default Collaborate;
