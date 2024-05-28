import React, { useState } from 'react'

const Chatfooter = ( {socket}) => {

  const [message, setMessage] = useState('');

  const handleTyping = () => 
    socket.emit('typing', `${localStorage.getItem('userName')} is typing`);
  

  const handleSendMessage = (e) => {
    e.preventDefault();
    if(message.trim() && localStorage.getItem('userName')){
      socket.emit('message', {
        text: message,
        name: localStorage.getItem('userName'),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    console.log({userName: localStorage.getItem('userName'), message});
    setMessage('');
  };
  return (
    <div>
      <form onSubmit={handleSendMessage}>
        <input
        type='text'
       
        value={message}
        placeholder='Type message...'
        onChange={(e) => setMessage(e.target.value)}
        />
        <button>SEND</button>
      </form>
    </div>
  )
}

export default Chatfooter