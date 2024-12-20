const express = require("express");
const app = express();
const http = require("http")
const {Server} = require("socket.io")
const cors = require("cors")
const server = http.createServer(app);

app.use(cors());

const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})

io.on("connection",(socket)=>{
    console.log(`user connected ${socket.id}`);

    socket.on("send_message",(data)=>{
        socket.broadcast.emit("receive_message",data)
    })

    const wordText = "hello from Server"
    const studentList = [{name:"Ankit",id:"1"},{name:"Nitin",id:"2"}]

    socket.emit("word",wordText)
    socket.emit("student",studentList)

})

server.listen(4001,()=>{
    console.log(`http://localhost:${4001}`);
})