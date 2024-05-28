import React, { useState, useEffect, useRef } from 'react'
import Chatbar from "./chatbar/chartbar";
import Chatfooter from "./chatfooter/chatfooter";
import Chatbody from "./chatbody/chatbody";


const Chat = ({socket}) => {
  const [ messages, setMessages ] = useState([]);
  const [ typingStatus, setTypingStatus ] = useState('');
  const lastMessageRef = useRef(null);

  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [socket, messages]);
  console.log(messages);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

  return (
    <div className='chat-cont'>
    <div className='chat'>
        <Chatbar socket={socket}/>
    </div>
    <div className='chat-main'>
        < Chatbody messages={messages} lastMessageRef={lastMessageRef}/>
        < Chatfooter socket={socket} />
    </div>
    </div>
  )
}

export default Chat