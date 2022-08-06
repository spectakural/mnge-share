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
import fetch from "node-fetch";
import multer from "multer";
import cors from "cors";
import Express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const express = Express();
const port = 3300;
express.use(cors());
const jsonParser = bodyParser.json();
const Multer = multer();
// const firebaseConfig = {
//   apiKey: "AIzaSyCI_CwbS_Z3dqchn31208csxB8wr97xRXM",
//   authDomain: "mnge-share.firebaseapp.com",
//   projectId: "mnge-share",
//   storageBucket: "mnge-share.appspot.com",
//   messagingSenderId: "24439804679",
//   appId: "1:24439804679:web:3d3e37d8c34925d7ea2ba2",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const db = getFirestore(app);

express.post(
  "/createRoomStorage",
  multer({ dest: "uploads/" }).single("file"),
  async (req, res) => {
    // const formData = req.body;
    console.log(req.body, req.file);
    axios.post("http://127.0.0.1:5000/createStorage", {
      roomId: req.body.roomId,
      file: req.file,
    });
    // fetch("http://127.0.0.1:5000/createStorage", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     roomId: roomId,
    //     file: file,
    //   }),
    // });
  }
);

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
