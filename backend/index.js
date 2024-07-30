const express = require("express")
const socketio = require("socket.io") 
const http = require("http")
const dotenv = require("dotenv")
const cors = require("cors")

const app = express();



const server = http.createServer(app)

const io = socketio(server, {
    cors: {
        origin: "*"
    }
})

dotenv.config({})
const port = process.env.PORT || 3000; 



io.on("connection", function (socket){
    socket.on("send-location", (data)=>{
        io.emit("recieve-location", {id: socket.id, ...data})
    })
    socket.on("disconnect", ()=>{
        io.emit("user-disconnected", socket.id)
    })
})


server.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})