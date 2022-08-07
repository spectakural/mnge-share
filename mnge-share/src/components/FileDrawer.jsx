import React, { useEffect, useState } from "react";
import "./FileDrawer.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import { createRoutesFromChildren } from "react-router-dom";
const FileDrawer = () => {
  const roomId = useSelector((state) => state.room.roomId);
  const [files, setFiles] = useState([]);
  useEffect(() => {
    getFiles();
  }, []);
  const getFiles = async () => {
    const res = await axios.post("http://localhost:3300/getFiles", {
      roomId: roomId,
    });

    setFiles(res.data);
  };

  const downloadFile = async (fileName) => {
    const res = await axios.post("http://localhost:3300/downloadFile", {
      fileName: fileName,
      roomId: roomId,
    });
    axios
      .post("http://localhost:3300/downloadFile", {
        roomId: roomId,
        fileName: fileName,
      })
      .then((res) => {
        console.log(res.data);
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="fileDrawer" onMouseEnter={getFiles}>
      <h3>File Drawer</h3>
      <div className="file-icon">
        <ion-icon name="document-outline"></ion-icon>
      </div>
      <div className="fileContainer">
        <div className="file">
          {files.map((file, index) => (
            <p key={index} onClick={() => downloadFile(file)}>
              {file}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileDrawer;
