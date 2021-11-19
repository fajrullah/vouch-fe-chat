import React, { useState } from "react";
import "./home.scss";
import { Link } from "react-router-dom";

function Homepage({ socket }) {
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");

  const sendData = () => {
    if (userName !== "" && roomName !== "") {
      socket.emit("joinRoom", { userName, roomName });
    } else {
      alert("username and roomname are must !");
      window.location.reload();
    }
  };

  return (
    <div className="homepage">
      <h1>Join Chat Room</h1>
      <input
        placeholder="Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      ></input>
      <input
        placeholder="RoomID"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      ></input>
      <Link to={`/chat/${roomName}/${userName}`}>
        <button onClick={sendData}>Join</button>
      </Link>
    </div>
  );
}

export default Homepage;
