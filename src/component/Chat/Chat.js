import React, { useEffect, useState } from "react";
import { user } from "../Join/Join";
import socketIO from "socket.io-client";
import "./Chat.css";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";

import closeIcon from "../../Images/closeIcon.png";

let socket;

const ENDPOINT = "http://localhost:4500/";

const Chat = () => {
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);

  const send = () => {
    const message = document.getElementById("chatInput").value;
    if (message.trim()) {
      socket.emit("message", { message, id });
      document.getElementById("chatInput").value = "";
    }
  };

  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      setId(socket.id);
    });

    socket.emit("joined", { user });

    socket.on("Welcome", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("userJoined", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("leave", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.emit("discon");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("sendMessage");
    };
  }, []);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
        
          <h2>ChatApp</h2>
          <a href="/">
            <img src={closeIcon} alt="Close" />
          </a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages.map((item, i) => (
            <Message
              key={i}
              user={item.id === id ? "" : item.user}
              message={item.message}
              classs={item.id === id ? "right" : "left"}
            />
          ))}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input
            onKeyUp={(event) => (event.key === "Enter" ? send() : null)}
            type="text"
            id="chatInput"
          />
          <button onClick={send} className="sendbtn">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
