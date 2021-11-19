import "./chat.scss";
import React, { useState, useEffect, useRef } from "react";
function Chat({ userName, roomName, socket }) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket.on("message", (data) => {
      const msg = Array.isArray(data) ? data : [...data]
      setMessages(msg);
    });

  }, [socket]);

  const sendData = () => {
    if (text !== "") {
      socket.emit("chat", {
        userName, roomName, text
      });
      setText("");
    }
  };
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="chat">
      <div className="user-name">
        <h2>
          {userName} <span style={{ fontSize: "0.7rem" }}>in {roomName}</span>
        </h2>
      </div>
      <div className="chat-message">
        {messages.map((i) => {
          if (i.userName === userName) {
            return (
              <div className="message mess-right">
                <p>{i.text}</p>
                <span>{i.userName}</span>
              </div>
            );
          } else {
            return (
              
              <div className="message">
                <p>{i.text} </p>
                <span>{i.userName}</span>
              </div>
            );
          }
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="send">
        <input
          placeholder="Message here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendData();
            }
          }}
        ></input>
        <button onClick={sendData}>Send</button>
      </div>
    </div>
  );
}
export default Chat;
