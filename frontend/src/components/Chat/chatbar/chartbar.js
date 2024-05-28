import React, { useState, useEffect } from 'react';
import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:3002');

const Chartbar = () => {
  const [ users, setUsers ] = useState([]);

  useEffect(() => {
    socket.on('newUserResponse', (data) => setUsers(data));
  }, [users]);

  return (
    <div>
        <h3>Open Chart</h3>
        <div>
            <h4>active users</h4>
            <div className='active-users'>
              {users.map((user) => (
                <p key={user.socketID}>{user.userName}</p>
              ))}
            </div>
        </div>
    </div>
  )
}

export default Chartbar