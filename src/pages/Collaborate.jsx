import "./Collaborate.scss";
import { useEffect, useState } from "react";
import Ripples from "react-ripples";
import PasswordSetterBox from "../components/PasswordSetterBox";
import { v4 } from "uuid";
import ReactTypingEffect from "react-typing-effect";

const Collaborate = () => {
  const [passwordBox, setPasswordBox] = useState(false);
  const rcode = v4().slice(0, 5);
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState([0, 1]);
  const words = ["Share.", "Chat.", "Talk.", "Collaborate."];

  return (
    <div className="collab">
      {/* <Ripples color="#ff000011">
        <div
          className="button"
          id="createButton"
          onClick={() => setOpenCreate(true)}
        >
          <div className="create-room">
            <ion-icon name="add-outline"></ion-icon>
          </div>
        </div>
      </Ripples>
      <Ripples color="#ff000011">
        <div className="button">
          <div className="join-room">
            <ion-icon name="enter-filled"></ion-icon>
          </div>
        </div>
      </Ripples> */}
      <div className="content">
        <div className="big">
          The one platform to <br />
          <ReactTypingEffect
            text={["Share.", "Chat.", "Talk.", "Collaborate."]}
            speed={100}
            eraseDelay={1000}
            eraseSpeed={50}
            typingDelay={50}
            style={{ color: "#ff4444" }}
          />{" "}
          <br />
          with your team.
        </div>
      </div>
      <div className="button-area">
        <div className="skew-box"></div>
        <div className="content">
          Ready to rock? <br />
          Create or Join <br /> a room to start..
        </div>
        <div className="buttons">
          <button>Create</button>
          <button>Join</button>
        </div>
      </div>
      {passwordBox ? (
        <PasswordSetterBox rcode={rcode} setPasswordBox={setPasswordBox} />
      ) : null}
    </div>
  );
};

export default Collaborate;
