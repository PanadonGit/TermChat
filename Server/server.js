const express = require('express');

const app = express();
app.use(express.json());

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let clientSockets = {};  // Store client IDs

io.on('connection', (socket) => {
  console.log('a user connected ',socket.id, " header = ",socket.handshake.headers);

  // Store the socket ID associated with the client
  clientSockets[socket.id] = socket;
  

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('user disconnected');
    delete clientSockets[socket.id];  // Remove from the list on disconnect
  });

  // Example of sending a message to the specific client on connection
  socket.emit('message', 'Welcome to the server!');

  // Example of listening for a custom event from the client
  socket.on('custom-event', (data) => {
    console.log(`Received data: ${data}`);
  });
});

// Route to send a message to a specific client
app.get('/send/:socketId', (req, res) => {
  const { socketId } = req.params;
  const message = 'Hello to specific client';
  
  if (clientSockets[socketId]) {
    clientSockets[socketId].emit('message', message);
    res.send(`Message sent to client with socket ID ${socketId}`);
  } else {
    res.status(404).send('Client not found');
  }
});

app.get('/notify/:socketId', (req, res) => {
  const { socketId } = req.params;
  const message = 'Notify to specific client';
  
  if (clientSockets[socketId]) {
    clientSockets[socketId].emit('notification', message);
    res.send(`Message sent to client with socket ID ${socketId}`);
  } else {
    res.status(404).send('Client not found');
  }
});


app.post('/api/login',(req,res)=>{

  //login logic goes here ===================================
  const {user,password} = req.body;

  if(user === "admin" && password === "1234") return res.sendStatus(200);
  return res.sendStatus(403);

  // ========================================================================

});



server.listen(3000, () => {
  console.log('listening on *:3000');
});
