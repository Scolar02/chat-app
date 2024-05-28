import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:3002');



const Home = () => {

    const navigate = useNavigate();
    const [ userName, setuserName ] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('userName', userName);


        socket.emit('newUser', { userName, socketID: socket.id});

        navigate('/Chat');
    }
  return (
    <div className='home-cont'>
        <form className='data'>
            <h3>Input your Dets</h3>
            <label> Username : </label>
            < input
            type='text'
            name='username'
            placeholder='My name...'
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
            />
            <button onClick={handleSubmit}>SUBMIT</button>
        </form>
    </div>
  )
}

export default Home