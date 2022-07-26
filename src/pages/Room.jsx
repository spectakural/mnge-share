import PasswordSetterBox from "../components/PasswordSetterBox";
import { v4 as uuid } from "uuid";
import "./Room.scss";
import TextEditor from "../components/TextEditor";

const Room = () => {
  let rcode = uuid().slice(0, 8);
  console.log(rcode);

  return (
    <div className="room-container">
      <div className="room-header">
        {/* <PasswordSetterBox rcode={rcode} /> */}
        <span>Room Code :</span>
        <span className="room-code"> {rcode}</span>
      </div>
      <div className="room-content">
        <TextEditor />
      </div>
    </div>
  );
};

export default Room;
