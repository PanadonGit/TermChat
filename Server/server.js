const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


io.on('connection', (socket) => {
    console.log(socket)
  console.log('a user connected');
});

app.get('/',(req,res)=>{

    res.send("ok");
    io.emit('message', 'Hello from server'); 
    console.log("TEST")

});

server.listen(3000, () => {
  console.log('listening on *:3000');
});