const express = require('express');
const sql = require('mssql')
const app = express();
const config = require('./src/config/appConfig');
const path = require('path');
const port = process.env.PORT;
require ('dotenv').config;
const userRoutes = require('./src/routes/userRoutes')
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});
const cors = require('cors');

app.use(cors());

app.use(express.json());
async function connectToDatabase() {
    try {
        const pool = await sql.connect(config)
        console.log("connected to database")



let users = [];

io.on('connection', (socket) => {
    console.log(`Hello: ${socket.id} user connected`);
    socket.on('message', (data) => {
        io.emit('messageResponse', data);
        console.log(data);
    });

    socket.on('newUser', (data) => {
        users.push(data);
        console.log(data)

        io.emit('newUserResponse', users);
    });

    socket.on('disconnect', () => {
        console.log('Bye: user disconnected');

        users = users.filter((user) => user.socketID !== socket.id);

        io.emit('newUserResponse', users);
        socket.disconnect();
    });
});


http.listen(port, () => console.log(`server is listening to port : ${port}`));

    } catch {
        console.log('error connecting to database')
        console.log(error)
    }
}
connectToDatabase();