const express = require('express');
const app = express(); // create a new instance
const path = require('path');
const http = require('http').Server(app);
const port = process.env.PORT || 8080;

//attached http server to the socket.io

const io = require('socket.io')(http);
//route
app.get('/',(req,res)=>{
res.sendFile(path.join(__dirname,'src/index.html'));
})
//create a new connection

io.on('connection', socket =>{
console.log('A user connected');

socket.on('disconnect',()=>{
    console.log("A user disconnected");
})

socket.on("message",msg=>{
    console.log("Client Message:"+ msg);
})
// emit event
socket.emit("server","Receive From Server")

})
http.listen(port,()=>{
    console.log(`app lisening on port ${port}`);
})
