import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import './Login.scss'; // Import the SCSS file

import { login, logout } from '../../redux/actions';

const Login = () => {
  // navigate
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  // select auth and login status from store  
  const authError = useSelector((state)=> state.auth.error);
  const loggedIn = useSelector((state)=>state.auth.loggedIn);
  
  async function handleFormSubmit(event){
    event.preventDefault();
    console.log("form submitted with: ", username, password);
    dispatch(login(username, password));
  }

  // Logout handler
  function handleLogout() {
    dispatch(logout());
    navigate('/');
  }

   // Navigate if already logged in
  if (loggedIn) {
    return (
      <div className="login-container">
        <h2>Welcome Back!</h2>
        <button onClick={handleLogout}>Logout</button>  
      </div>
    );
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleFormSubmit}>
        <label htmlFor="username">Username: </label>
        <input type="text" id="username" value={username} onChange={(e)=>setUsername(e.target.value)} /><br />
        
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} /><br />
        
        <button type="submit">Login</button>
        <a href="http://localhost:3000/register">Not a member? Please register</a>

      </form>
      {authError && <div className="error">{authError}</div>}
      <a href="http://localhost:5000/api/v1/users/auth/google" className='google-sign-in'>
          Sign in with Google
      </a>
    </div>
  );
}

export default Login;
