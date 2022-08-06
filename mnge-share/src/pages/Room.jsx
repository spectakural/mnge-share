import PasswordSetterBox from "../components/PasswordSetterBox";
import { v4 as uuid } from "uuid";
import "./Room.scss";
import TextEditor from "../components/TextEditor";
import ChatBox from "../components/ChatBox";
import FileDrawer from "../components/FileDrawer";
import Chat from "../components/Chat";
import { useSelector, useDispatch } from "react-redux";
import { initializeApp } from "firebase/app";

import axios from "axios";

import {
  getFirestore,
  collection,
  where,
  query,
  doc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";

import { sendMessage, updateText } from "../firebase/firestoreControls";

import { useDocumentData } from "react-firebase-hooks/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyCI_CwbS_Z3dqchn31208csxB8wr97xRXM",
  authDomain: "mnge-share.firebaseapp.com",
  projectId: "mnge-share",
  storageBucket: "mnge-share.appspot.com",
  messagingSenderId: "24439804679",
  appId: "1:24439804679:web:3d3e37d8c34925d7ea2ba2",
};

const fire = initializeApp(firebaseConfig);
const firestore = getFirestore(fire);

const Room = () => {
  const rCode = useSelector((state) => state.room.roomCode);
  const roomId = useSelector((state) => state.room.roomId);
  const nickName = useSelector((state) => state.room.nickName);
  // const navigate = useNavigate();
  const [notification, setNotification] = useState(false);

  const docRef = doc(firestore, "rooms", roomId);
  console.log("roomId", roomId);
  const [roomData, loading, error, snapshot] = useDocumentData(docRef);
  const [prevMessages, setPrevMessages] = useState([]);
  // const messagesRef = collection(firestore, "rooms");

  useEffect(() => {
    try {
      if (
        prevMessages != roomData.messages &&
        roomData.messages[roomData.messages.length - 1].sender != nickName
      ) {
        setNotification(true);
        // alert("New Message");
      }
    } catch (error) {
      console.log(error);
    }
  }, [roomData]);

  const handleSendMessage = (message) => {
    let messageData = {
      text: message,
      timestamp: new Date(),
      sender: nickName,
    };

    sendMessage(messageData, roomId);
    setPrevMessages(roomData.messages);
  };

  const handleUpdateText = (text) => {
    updateText(text, roomId);
  };

  const handleUploadFile = (e) => {
    console.log("upload", e.target.value, e.target.files[0].size / 1024 / 1024);
    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("roomId", roomId);

    axios.post("http://127.0.0.1:3300/uploadFile", formData);
  };

  // const handleUploadFile = (e) => {

  //   axios.post("http://127.0.0.1:3300/uploadFile", {
  //     file: e.target.files[0],
  //     roomId: roomId,
  //   });
  // };
  return (
    <div className="room-container">
      <div className="room-header">
        {/* <PasswordSetterBox rcode={rcode} /> */}
        <span>Room Code :</span>
        <span className="room-code">{" " + rCode}</span>
      </div>
      <div className="room-content">
        {!loading && (
          <TextEditor updateText={handleUpdateText} roomData={roomData} />
        )}
        {/* <div className="input">
            <label htmlFor="file-input">DRAG ON ME</label>
            <input type="file" id="file-input" onChange={handleUpload} />
          </div> */}

        <ChatBox sendMessage={handleSendMessage} uploadFile={handleUploadFile}>
          {!loading &&
            roomData.messages.map((message, index) => (
              <>
                <Chat
                  key={index}
                  message={message}
                  showName={
                    index > 0 &&
                    roomData.messages[index - 1].sender == message.sender
                      ? false
                      : true
                  }
                />
              </>
            ))}
        </ChatBox>
        <FileDrawer />
      </div>
    </div>
  );
};

export default Room;
