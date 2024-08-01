require('dotenv').config();
const cors = require('cors');
const passport = require('./utils/passport-config');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const connectDB = require('./utils/connectDB');
const postRouter = require('./router/post/postsRouter');
const usersRouter = require('./router/user/usersRouter');

// Connecting mongo db
connectDB();

// PORT
const PORT = 5000;

// MIDDLEWARES
app.use(express.json()); // pass the json data
//CORS
const corsOptions = {
   origin: ["http://localhost:3000"],
   credentials: true
};
app.use(cors(corsOptions));

// passport middleware
app.use(passport.initialize());

// COOKIE PARSER
app.use(cookieParser()); // automatic cookie parsing

// ROUTE HANDLERS
app.use('/api/v1/posts', postRouter);

app.use('/api/v1/users', usersRouter);

// if there is no matched route
app.use((req, res, next)=>{
   res.status(404).json({message: 'Route not found on our server'});
});

// error handling middleware
app.use((err, req, res, next)=>{
   // prepare the error message
   const message = err.message;
   const stack = err.stack;
   res.status(500).json({
      message,
      stack
   })
});

// starting the express server
app.listen(PORT, console.log(`Server is running on PORT ${PORT}`));