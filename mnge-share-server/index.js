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

import cors from "cors";
import Express from "express";
import bodyParser from "body-parser";

const express = Express();
const port = 3300;
express.use(cors());
const jsonParser = bodyParser.json();

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

const checkPass = async (roomCode, password) => {
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
    return found;
  } else return false;
};

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
    });
    console.log("Document", room.id);
    return room.id;
  } catch (error) {
    console.log(error);
  }
};

const joinRoom = async (roomCode, password) => {
  try {
    const room = await checkPass(roomCode, password);
    if (room) {
      return room;
    }
  } catch (error) {
    console.log(error);
  }
};

express.get("/", (req, res) => {
  res.send("Hello World!");
});

// const sendMessage = async (message, roomId) => {
//   let docRef = doc(collection(db, "rooms"), roomId);

//   message["timestamp"] = new Date();

//   console.log("messageData", message, FieldValue);
//   await updateDoc(docRef, {
//     // messages: FieldValue.arrayUnion(message),
//     messages: arrayUnion(message),
//   });
// };

express.post("/createRoom", jsonParser, async (req, res) => {
  console.log(req.body);
  const roomCode = req.body.roomCode;
  let result = await checkRoomExists(roomCode);
  if (result) {
    console.log("Room already exists");
    res.sendStatus(409);
    return false;
  } else {
    console.log("Should not print");
    const password = req.body.password;
    const room = await createRoom(roomCode, password);

    console.log("creating error");

    console.log(room, roomCode, password);
    res.send({ roomId: room });
  }
});

express.post("/joinRoom", jsonParser, async (req, res) => {
  console.log(req.body);
  const roomCode = req.body.roomCode;
  const password = req.body.password;
  const room = await joinRoom(roomCode, password);
  if (room) {
    res.send({ roomId: room });
  } else {
    res.sendStatus(409);
  }
});

express.post("/sendMessage", jsonParser, async (req, res) => {
  console.log(req.body);
  const roomId = req.body.roomId;
  const message = req.body.message;
  try {
    await sendMessage(message, roomId);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

express.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
