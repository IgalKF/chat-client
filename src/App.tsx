import React from "react";
import "./App.scss";
import { ChatIcon } from "./icons/chat";
import { router } from "./router";
import { RouterProvider } from "react-router-dom";


function App() {
  const userName = `User ${(1000 + Math.random() * 10000).toFixed()}`;
  sessionStorage.setItem('user', userName)
  return (
    <div className="App">
        <div className="main">
          <div className="header">
            <div className="title">
              <ChatIcon />
              <span>Chattos - Secure Chat</span>
            </div>
            <span>Your Name: <span>{userName}</span></span>
            </div>
          <div className="page">
            <RouterProvider router={router} />
          </div>
          <div className="footer">
            <div className="info">
              <div className="contact-info">
                <span>Contact Info:</span>
                <ul>
                  <li>
                    <span>Igal:</span> <span>igalkf@gmail.com</span>
                  </li>
                  <li>
                    <span>Reuven:</span> <span>1robib1@gmail.com</span>
                  </li>
                </ul>
              </div>
              <div className="lecturer-info">
                Lecturer:
                <ul>
                  <li>Yakir Menachem</li>
                </ul>
              </div>
            </div>
            <div className="copyright">@Copyright - All right reserved to the studens?</div>
          </div>
      </div>
    </div>
  );
}

export default App;
