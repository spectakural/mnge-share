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
const Collaborate = () => {
  const [passwordBox, setPasswordBox] = useState(false);
  const [joinPopup, setJoinPopup] = useState(false);
  const [rCode, setrCode] = useState(v4().slice(0, 5));
  const [roomUniqueId, setRoomUniqueId] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createNewRoom = async (nickName, password) => {
    // console.log("CREATE ROOM", nickName, password);
    // let data = { nickName: nickName, password: password, roomCode: rCode };
    // fetch("http://127.0.0.1:3300/createRoom", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // }).then((res) => {
    //   if (res.status == 409) {
    //     alert("Room already exists");
    //   } else {
    //     res.json().then((data) => {
    //       if (data) {
    //         var roomId = data.roomId;
    //       }
    //     });
    //   }
    // });
    let roomId = await createRoom(rCode, password);
    setRoomUniqueId(roomId);
    dispatch(setRoomId(roomId));
    dispatch(setRoomCode(rCode));
    dispatch(setNickName(nickName));
    console.log("roomId", roomId, rCode, nickName);
    navigate("/room");
  };

  const handleJoinRoom = async (roomCode, password, nickName) => {
    // console.log(nickName, roomCode, password);
    // let data = { nickName: nickName, roomCode: roomCode, password: password };
    // fetch("http://127.0.0.1:3300/joinRoom", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // }).then((res) => {
    //   if (res.status == 409) {
    //     alert("Room does not exist");
    //   } else {
    //     res.json().then((data) => {
    //       if (data) {
    //         var roomId = data.roomId;
    //         console.log("roomId", roomId, roomCode);
    //       }
    //     });
    //   }
    // });
    let roomId = await joinRoom(roomCode, password);
    console.log(roomId);
    setRoomUniqueId(roomId);
    dispatch(setRoomId(roomId));
    dispatch(setRoomCode(roomCode));
    dispatch(setNickName(nickName));
    navigate("/room");
  };

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
