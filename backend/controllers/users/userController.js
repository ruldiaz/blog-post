const User = require('../../models/User/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const passport = require('passport');

// USER CONTROLLER
const userController = {
   //! register
   register: asyncHandler(async(req, res)=>{
      const {username, email, password} = req.body;
      //check if username already exists
      const userFound = await User.findOne({username, email});
      if(userFound){
         throw new Error('User already exists');
      }

      // hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Register the user
      const userRegistered = await User.create({
         username,
         email,
         password: hashedPassword
      });
      // send the response
      res.status(201).json({
         status: 'success',
         message: 'User registered succesfully',
         userRegistered
      });
   }),
   //! login
   login: asyncHandler(async(req, res, next)=>{
      passport.authenticate('local', (err, user, info)=>{
         if(err){
            return next(err);
         }
         // check if user not found
         if(!user){
            return res.status(401).json({message: info.message});
         }
         // generate jwt
         const token = jwt.sign({id: user?._id}, process.env.JWT_SECRET);
         // set token into session
         res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 24*60*60*1000, // 1 day
         })
         // send the response
         res.json({
            status: 'success',
            message: 'Login success',
            username: user?.username,
            email: user?.email,
            _id: user?._id
         });
      })(req, res, next);
   }),
   //! google auth with passport and retrieve the profile
   googleAuth: passport.authenticate('google', {scope: ['profile']}),
   //! google auth callback
   googleAuthCallback: asyncHandler(async(req, res, next)=>{
      passport.authenticate('google', {
         failureRedirect: '/login',
         session: false
      }, (err, user, info)=>{ // callback from passport google middleware
         if(err) return next(err);
         if(!user){
            return res.redirect('http://localhost:3000/google-login-error');
         }
         // generate token
         const token = jwt.sign({id: user?._id}, process.env.JWT_SECRET, {
            expiresIn: '3d',
         });
         // set token into the cookie
            res.cookie('token', token, {
               httpOnly: true,
               secure: false,
               sameSite: 'strict',
               maxAge: 24*60*60*1000, // 1 day
            });
         // redirect user to dasboard
         res.redirect(`http://localhost:3000`);
      })(req, res, next)
   }),
   //! check user authentication status
   checkAuthenticated: asyncHandler(async(req, res)=>{
      const token = req.cookies['token'];
      if(!token){
         return res.status(401).json({isAuthenticated: false});
      }
      try {
         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         // find the user
         const user = await User.findById(decoded.id);
         if(!user){
            return res.status(401).json({isAuthenticated: false});
         }else{
            return res.status(200).json({
               isAuthenticated: true,
               _id: user?._id,
               username: user?.username,
               profilePicture: user?.profilePicture,
            });
         }
      } catch (error) {
         return res.status(401).json({isAuthenticated: false}, error);
      }
   }),
  // ! Logout
  logout: asyncHandler(async (req, res) => {
   res.cookie("token", "", { maxAge: 1 });
   res.status(200).json({ message: "Logout success" });
 }),
}

module.exports = userController;