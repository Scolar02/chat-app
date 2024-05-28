import React from 'react'
import { useNavigate } from 'react-router-dom'


const Chatbody = ({messages, lastMessageRef}) => {
  const navigate = useNavigate()

  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    navigate('/Home');
    window.location.reload();
  };

  return (
    <div>
        <header className='hangout'>
    <p>Start a conversataion</p>
    <button onClick={handleLeaveChat}>Leave Chat</button>
  </header>
  <div>
    {messages.map((message) => 
    message.name === localStorage.getItem('userName') ? (
      <div key={message.id}>
        <p>You</p>
    <p>{message.text}</p>
      </div>
    ):
    (
      <div key={message.id}>
    <p>{message.name}</p>
    <p>{message.text}</p>

      </div>
    )
    )}
    <div ref={lastMessageRef}/>
  </div>

  <div>
    <p>Someone is typing...</p>
  </div>
    </div>
  )
}

export default Chatbody