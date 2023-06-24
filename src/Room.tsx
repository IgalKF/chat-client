import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { chatService } from "./chat-service";
import SendIcon from "./icons/chat copy";

function Room() {
  const { room } = useParams();

  const [messages, setMessages] = useState<string[]>([]);
  const [textInput, setTextInput] = useState<string>("");
  const [keyInput, setKeyInput] = useState<string>("");
  let publicKey: bigint = BigInt(0);
  chatService.recieveMessage.onmessage = (event) => {
    const data = event.data as string;
    const welcome = "Welcome, your private key is: ";
    let message = data;

    if (data.startsWith(welcome)) {
      const pk = data.substring(welcome.length);
      sessionStorage.setItem("privateKey", pk);
    }

    if (
      data.startsWith(
        `${sessionStorage.getItem("user")} logged in. Their public key is:`
      )
    ) {
      publicKey = BigInt(data.split(": ")[1].split(":")[0]);
      sessionStorage.setItem("publicKey", publicKey.toString());
    }

    if (/User \d+:/.test(data)) {
      message = data.split(":")[0] + ': ' + chatService.decryptMessage(
        data.split(":")[1],
        sessionStorage.getItem("privateKey")!,
        sessionStorage.getItem("publicKey")!,
      );
    }

    setMessages([...messages, message]);
  };

  return (
    <div className="Room">
      <div className="title">
        {chatService.getRoomById(parseInt(room ?? "0"))?.name}
      </div>
      <div className="chat-panel">
        {messages.map((m, i) => (
          <div key={i} className="message">
            <p>{m}</p>
          </div>
        ))}
      </div>
      <input
        onChange={(e) => setKeyInput(e.currentTarget.value)}
        type="text"
        placeholder="Encrypt message with public key .."
      />
      <div className="message-panel">
        <input
          onChange={(e) => setTextInput(e.currentTarget.value)}
          type="text"
          placeholder="Write message.."
        />
        <div
          onClick={() =>
            chatService.sendMessage({
              messageType: "text",
              publicKey: keyInput,
              content: textInput,
            })
          }
          className="send-message-button"
        >
          <SendIcon />
        </div>
      </div>
    </div>
  );
}

export default Room;
