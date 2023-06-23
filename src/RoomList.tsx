import React, { useState } from "react";
import { chatService } from "./chat-service";
import { Link } from "react-router-dom";

export function RoomList() {
  const [roomState] = useState(chatService.getRooms());

  return (
    <div className="room-list">
      <div className="title">Available Rooms</div>
      <div className="list">
        {roomState.map((room) => (
          <Link to={`/${room.id}`} key={room.id}>
            <span>{room.id}.</span>
            <span>{room.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
