import PasswordSetterBox from "../components/PasswordSetterBox";
import { v4 as uuid } from "uuid";
import "./Room.scss";
import TextEditor from "../components/TextEditor";
import { useSelector, useDispatch } from "react-redux";

const Room = () => {
  const rCode = useSelector((state) => state.room.roomCode);
  const roomId = useSelector((state) => state.room.roomId);

  return (
    <div className="room-container">
      <div className="room-header">
        {/* <PasswordSetterBox rcode={rcode} /> */}
        <span>Room Code :</span>
        <span className="room-code">{" " + rCode}</span>
      </div>
      <div className="room-content">
        <TextEditor />
      </div>
    </div>
  );
};

export default Room;
