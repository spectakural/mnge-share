// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, FieldValue, arrayUnion } from "firebase/firestore";
import {
  doc,
  collection,
  getDocs,
  addDoc,
  QueryConstraint,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCI_CwbS_Z3dqchn31208csxB8wr97xRXM",
  authDomain: "mnge-share.firebaseapp.com",
  projectId: "mnge-share",
  storageBucket: "mnge-share.appspot.com",
  messagingSenderId: "24439804679",
  appId: "1:24439804679:web:3d3e37d8c34925d7ea2ba2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const checkPass = async (roomCode, password) => {};

const checkRoomExists = async (roomCode) => {
  const query = await getDocs(collection(db, "rooms"));
  var found = false;
  query.forEach((doc) => {
    let data = doc.data();
    console.log(data.roomCode);
    if (data.roomCode == roomCode) {
      console.log("room exists", data.roomCode, roomCode);
      console.log(data);
      found = true;
    }
  });

  return found;
};

const createRoom = async (roomCode, password) => {
  try {
    const room = await addDoc(collection(db, "rooms"), {
      password: password,
      roomCode: roomCode,
      members: [],
      messages: [],
      texteditor: "",
    });
    console.log("Document", room.id);
    return room.id;
  } catch (error) {
    console.log(error);
  }
};

const joinRoom = async (roomCode, password) => {
  console.log(roomCode, password);
  try {
    const query = await getDocs(collection(db, "rooms"));
    let found = false;
    query.forEach((doc) => {
      let data = doc.data();

      if (
        found == false &&
        data.roomCode == roomCode &&
        data.password == password
      ) {
        console.log("pass correct");
        found = doc.id;
      }
    });
    if (found) {
      console.log("found room", found);
      return found;
    } else return false;
  } catch (error) {
    console.log(error);
  }
};

const sendMessage = async (message, roomId) => {
  let docRef = doc(collection(db, "rooms"), roomId);

  //   let messageData = {
  //     text: message,
  //     sender: nickName,
  //     timestamp: new Date(),
  //   };
  // message["timestamp"] = new Date();

  await updateDoc(docRef, {
    messages: arrayUnion(message),
  });
};

const updateText = async (text, roomId) => {
  let docRef = doc(collection(db, "rooms"), roomId);

  await updateDoc(docRef, {
    texteditor: text,
  });
};

export { sendMessage, createRoom, joinRoom, updateText };
