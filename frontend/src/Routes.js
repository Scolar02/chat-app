import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Messages from "./components/messages/messages";
import Home from "./components/Face/home/home";
import Chat from "./components/Chat/chat";
import Chatfooter from "./components/Chat/chatfooter/chatfooter";
import Chartbar from "./components/Chat/chatbar/chartbar";
import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:3002');



const router = createBrowserRouter([
  {
    path: "/",
    element: <Messages />
  },
  {
    path: "/Home",
    element: < Home />
  },
  {
    path: "/Chat",
    element: < Chat socket={socket}/>
  },
  {
    path: "/footer",
    element: < Chatfooter socket={socket} />
  },
  {
    path: "/bar",
    element: <Chartbar socket={socket} />
  }

]);

export default router;