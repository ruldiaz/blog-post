import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import './Register.scss'; // Import the SCSS file
import { register } from '../../redux/actions';

const Register = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  // select auth status from store  
  const authError = useSelector((state)=> state.auth.error);
  const success = useSelector((state)=>{
   //console.log(state);
   return state?.auth?.user?.message});

   
  async function handleFormSubmit(event){
    event.preventDefault();
    console.log("form submitted with: ", username, email, password);
    dispatch(register(username, email, password));
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleFormSubmit}>
        <label htmlFor="username">Username: </label>
        <input type="text" id="username" value={username} onChange={(e)=>setUsername(e.target.value)} /><br />

        <label htmlFor="email">Email: </label>
        <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} /><br />
        
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} /><br />
        
        <button type="submit">Register</button>
        <a href="http://localhost:3000/login">Already a member? Please login</a>

      </form>
      {authError && <div className="error">{authError}</div>}
      {success && <div>{success}</div>}
    </div>
  );
}

export default Register;
