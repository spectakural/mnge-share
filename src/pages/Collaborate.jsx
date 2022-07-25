import "./Collaborate.scss";
import { useState } from "react";
import Ripples from "react-ripples";

const Collaborate = () => {
  const [hovering, setHovering] = useState(false);
  return (
    <div className="collab">
      <Ripples>
        <div className="button">
          <div className="create-room">
            <ion-icon name="add-outline"></ion-icon>
          </div>
        </div>
      </Ripples>
      <div className="button">
        <div className="join-room">
          <ion-icon name="enter-outline"></ion-icon>
        </div>
      </div>
    </div>
  );
};

export default Collaborate;
