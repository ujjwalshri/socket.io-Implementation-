import express from "express";
import { Server } from "socket.io";
import {createServer} from "http";
import cors from 'cors';
const PORT = 3000;
const app = express();

const server = createServer(app);
const io = new Server(server , {
    cors: {
        origin:"http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    }
});

app.use(cors());

app.get('/', (req,res)=>{
    res.send("Hello OWl");
})

io.on("connection", (socket)=>{
   console.log("User coonnected");
   console.log("id", socket.id);
   socket.on("message", (data)=>{
    console.log(data);
   })
   socket.on("disconnect",()=>{
    console.log("User Disconnected " , socket.id);
   })
})

server.listen(PORT, ()=>{
    console.log(`server started at port ${PORT}`)
})