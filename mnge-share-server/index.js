// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  QueryConstraint,
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

const checkPass = async (roomid, password) => {
  const query = await getDocs(collection(db, "rooms"));
  query.forEach((doc) => {
    let data = doc.data();
    if (data.roomId == roomid && data.password == password) {
      console.log("pass correct");
      return true;
    } else {
      console.log("pass incorrect");
      return false;
    }
  });
  // console.log(query);
};

const checkRoomExists = async (roomId) => {
  const query = await getDocs(collection(db, "rooms"));
  var found = false;
  query.forEach((doc) => {
    let data = doc.data();
    console.log(data.roomId);
    if (data.roomId == roomId) {
      console.log("room exists");
      found = true;
    }
  });

  return found;
};

const createRoom = async (roomId, password) => {
  try {
    const room = await addDoc(collection(db, "rooms"), {
      password: password,
      roomId: roomId,
      uniqueId: "9823u29rwxvcnl2934",
    });
    console.log("Document", room.id);
    return room.id;
  } catch (error) {
    console.log(error);
  }
};

express.get("/", (req, res) => {
  res.send("Hello World!");
});

express.post("/createRoom", jsonParser, async (req, res) => {
  console.log(req.body);
  const roomId = req.body.roomId;
  let result = await checkRoomExists(roomId);
  if (result) {
    console.log("Room already exists");
    res.sendStatus(409);
    return false;
  } else {
    console.log("Should not print");
    const password = req.body.password;
    const room = await createRoom(roomId, password);

    console.log("creating error");

    console.log(room, roomId, password);
    res.send({ roomId: room });
  }
});

express.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
