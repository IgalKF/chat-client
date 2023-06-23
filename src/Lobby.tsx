import React from "react";
import { RoomList } from "./RoomList";
import { Outlet } from "react-router-dom";
import { chatService } from "./chat-service";

function Lobby() {
  return (
    <div className="Lobby">
      <div className="panel">
        <div className="welcome">Chattos Lobby</div>
        <div className="actions">
          <button onClick={chatService.createRoom} className="create-room primary">+ Create Chat Room</button>
        </div>
        <RoomList />
      </div>
      <div className="chat">
        <Outlet />
      </div>
    </div>
  );
}

export default Lobby;
