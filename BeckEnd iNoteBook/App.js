const express = require('express');
const connectToDB = require('./DB_connection');
const userRouter = require('./Routes/userRouter');
const authRouter = require('./Routes/authRouter');
const notesRouter = require('./Routes/notesRouter');
const cookie = require('cookie-parser');
const cors = require('cors')

connectToDB();
const server = express();
server.use(express.json());
server.use(cors());
server.use(cookie());
server.use("/images" , express.static('images'));
server.listen(5000);

server.use('/user', userRouter);
server.use('/auth', authRouter);
server.use('/notes', notesRouter);