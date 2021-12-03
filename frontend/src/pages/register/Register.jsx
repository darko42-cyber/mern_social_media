import { useRef } from "react";
import {useHistory} from 'react-router'
import axios from 'axios'

import "./register.css";

const Register = () => {
  const email = useRef();
  const rePassword = useRef();
  const password = useRef();
  const username = useRef();
  const history = useHistory()

  const handleSumit = async (e) => {
    e.preventDefault();
    if(rePassword.current.value !== password.current.value){
      password.current.setCustomValidity("Passwords don't match")
    }else{
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post('auth/register', user)
        history.push('/login')
        
      } catch (error) {
        console.log(error)
      }

    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginRight">
          <h3 className="loginLogo">Social_Connect</h3>
          <span className="loginDesc">
            Connect with friends and the world aound you
          </span>
        </div>
        <div className="loginLeft">
          <form className="loginBox" onSubmit={handleSumit}>
            <input
              placeholder="Username"
              type="text"
              className="loginInput"
              required
              ref={username}
            />
            <input
              placeholder="Email"
              type="email"
              className="loginInput"
              required
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              className="loginInput"
              required
              ref={password}
            />
            <input
              placeholder="Re-Password "
              type="password"
              className="loginInput"
              ref={rePassword}
              required
            />
            <button className="loginButton">Sign Up</button>
            <button className="loginRegisterButton">
              Log in to your account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
