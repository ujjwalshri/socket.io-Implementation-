import React, { useEffect,useState } from 'react'

import {io} from 'socket.io-client';
import { Container, TextField,Button, Typography } from '@mui/material';
const App = () => {
   const socket = io('http://localhost:3000');
   const [message, setMessage] = useState("");
   const handleSubmit= (e)=>{
        q.preventDefault();
        socket.emit("message",message);
        setMessage("");

   }
    useEffect(()=>{
      socket.on("connect", ()=>{
        console.log("connected", socket.id);
      })
     socket.on("welcome", (s)=>{
      console.log(s);

     })
     return ()=>{
      socket.disconnect();
     }

    },[])
  return (
    
    <Container maxWidth="sm">
      <Typography variant="h1" component="div" gutterBottom>
        Welcome to Socket.io
      </Typography>
    <form onSubmit={handleSubmit}> 
      <TextField value={message} 
      onChange={e=>setMessage(e.target.value)}
      id="outlined-basic" label="Outlined" variant="outlined"/>
      <Button type="submit" variant="contained" color="primary">Send</Button>
    </form>
     </Container>
    
  )
}

export default App