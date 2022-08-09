import multer from "multer";
import cors from "cors";
import Express from "express";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import { createServer } from "http";
import fs from "fs";

const express = Express();
const httpServer = createServer(express);
const port = 3300;
express.use(cors());
const jsonParser = bodyParser.json();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

express.post("/createRoomStorage", jsonParser, async (req, res) => {
  console.log(req.body);
  const roomId = req.body.roomId;
  console.log(roomId, fs.existsSync(`uploads/${roomId}`));

  if (roomId != undefined && !fs.existsSync(`./uploads/${roomId}`)) {
    console.log("making dir");
    fs.mkdirSync(`./uploads/${roomId}`);
  }
});

express.post("/uploadFile", upload.single("file"), async (req, res) => {
  let path = req.file.path.replace(/\\/g, "/");
  console.log(req.body, path);
  fs.rename(
    path,
    `./uploads/${req.body.roomId}/${req.file.originalname}`,
    (err) => {
      if (err) throw err;
      console.log("moved actually");
    }
  );
  res.send({ status: 200 });
});

express.post("/getFiles", jsonParser, async (req, res) => {
  const roomId = req.body.roomId;
  console.log(req.body);
  const files = fs.readdirSync(`./uploads/${roomId}`);
  console.log(files);
  res.send(files);
});

express.post("/downloadFile", jsonParser, async (req, res) => {
  let roomId = req.body.roomId;
  let fileName = req.body.fileName;
  console.log(roomId, fileName, "checking");
  // const file = fs.readFileSync(`./uploads/${roomId}/${fileName}`);
  res.download(`./uploads/${roomId}/${fileName}`);
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

// express.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("joinRoom", (roomId) => {
    console.log("join room", roomId);
    socket.join(roomId);
  });
  socket.on("leaveRoom", (roomId) => {
    console.log("leave room", roomId);
    socket.leave(roomId);
  });
});

// io.listen(3300);
httpServer.listen(3300);
