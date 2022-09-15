const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
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
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, console.log(`Server started on port ${process.env.PORT}`))