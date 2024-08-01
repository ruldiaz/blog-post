import React, { useEffect } from 'react';
import './App.scss';
import Home from './components/Home/Home';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Login from './components/User/Login';
import About from './components/About/About';
import PostDetail from './components/Post/PostDetail';
import Register from './components/User/Register';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthStatus } from './redux/actions';
import CreatePost from './components/Post/CreatePost';

function App() {
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.auth);
  if(user){
    console.log(user);
  }
  
  useEffect(()=>{
      dispatch(checkAuthStatus());  
  }, [dispatch])

  
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route element={<Home />} path='/' />
        <Route element={<Login />} path='/login' />
        <Route element={<Register />} path='/register' />
        <Route element={<About />} path='/about' />
        <Route element={<CreatePost />} path='/create' />
        <Route element={<PostDetail />} path='/post/:postId' />
      </Routes>
    </BrowserRouter>    
  );
}

export default App;
