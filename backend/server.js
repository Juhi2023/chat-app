const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

dotenv.config();
connectDB(process.env.MONGO_URI);
const app = express();
app.use(express.json()); // to accept json data
app.use(cors())

app.get('/', (req, res)=>{
    res.send('API is running')
})

app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)
app.use(notFound);
app.use(errorHandler);

const server = app.listen(process.env.PORT, console.log(`Server started on port ${process.env.PORT}`))

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000"
    }
})

io.on("connection", (socket)=>{
    console.log("conntected to socket.io")
    socket.on("setup", (userData)=>{
        socket.join(userData._id)
        socket.emit("connected");
    })

    socket.on("join chat", (room)=>{
        socket.join(room)
        console.log("User joined the room: ", room)
    })

    socket.on("typing", (room)=>{
        socket.in(room).emit("typing");
    })

    socket.on("stop typing", (room)=>{
        socket.in(room).emit("stop typing");
    })

    socket.on("new message", (newMessageRecieved)=>{
        var chat = newMessageRecieved.chat;

        if(!chat.users) 
            return console.log("chat.users not defined")
        chat.users.forEach((user)=>{
            if(user._id === newMessageRecieved._id)
                return;
            socket.in(user._id).emit("message recieved", newMessageRecieved)
        })
    })

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
      });
})
  