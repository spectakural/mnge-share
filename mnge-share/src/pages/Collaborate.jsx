import "./Collaborate.scss";
import { useEffect, useState } from "react";
import Ripples from "react-ripples";
import PasswordSetterBox from "../components/PasswordSetterBox";
import JoinRoomPopup from "../components/JoinRoomPopup";
import { v4 } from "uuid";
import ReactTypingEffect from "react-typing-effect";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setRoomId, setRoomCode, setNickName } from "../redux/roomSlice";
import { createRoom, joinRoom } from "../firebase/firestoreControls";
import axios from "axios";

const Collaborate = () => {
  const [passwordBox, setPasswordBox] = useState(false);
  const [joinPopup, setJoinPopup] = useState(false);
  const [rCode, setrCode] = useState(v4().slice(0, 5));
  const [roomUniqueId, setRoomUniqueId] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createNewRoom = async (nickName, password) => {
    let roomId = await createRoom(rCode, password);
    setRoomUniqueId(roomId);
    dispatch(setRoomId(roomId));
    dispatch(setRoomCode(rCode));
    dispatch(setNickName(nickName));
    console.log("roomId", roomId, rCode, nickName);
    axios.post("http://127.0.0.1:3300/createRoomStorage", {
      roomId: roomId,
    });
    navigate("/room");
  };

  const handleJoinRoom = async (roomCode, password, nickName) => {
    let roomId = await joinRoom(roomCode, password);
    if (roomId) {
      console.log(roomId);
      setRoomUniqueId(roomId);
      dispatch(setRoomId(roomId));
      dispatch(setRoomCode(roomCode));
      dispatch(setNickName(nickName));
      navigate("/room");
    } else {
      alert("room Doesnt exist");
    }
  };

  return (
    <div className="collab">
      <div className="content">
        <div className="big">
          The one stop to <br />
          <ReactTypingEffect
            text={["Share", "Chat", "Talk", "Work"]}
            speed={100}
            eraseDelay={1000}
            eraseSpeed={50}
            typingDelay={50}
            style={{ color: "#ff4444" }}
            className="typer"
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
          <button>
            <Ripples color="#ff444444" onClick={() => setPasswordBox(true)}>
              <span>Create</span>
            </Ripples>
          </button>
          <button>
            <Ripples color="#ff444444" onClick={() => setJoinPopup(true)}>
              <span>Join</span>
            </Ripples>
          </button>
        </div>
      </div>
      {passwordBox ? (
        <PasswordSetterBox
          rCode={rCode}
          setPasswordBox={setPasswordBox}
          createNewRoom={createNewRoom}
          passwordBox={passwordBox}
        />
      ) : null}
      {joinPopup ? (
        <JoinRoomPopup
          rCode={rCode}
          setJoinPopup={setJoinPopup}
          joinRoom={handleJoinRoom}
          joinPopup={joinPopup}
        />
      ) : null}
    </div>
  );
};

export default Collaborate;
