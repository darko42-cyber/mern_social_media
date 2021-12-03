import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";

const Login = () => {
  const email = useRef();
  const password = useRef();

  const { dispatch, error, isFetching, user } = useContext(AuthContext);

  const handleSumit = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  console.log(user);

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
              placeholder="Email"
              type="email"
              className="loginInput"
              ref={email}
              required
            />
            <input
              placeholder="Password"
              type="password"
              className="loginInput"
              ref={password}
              required
            />
            <button className="loginButton" disabled = {isFetching}>
              {" "}
              {isFetching ? <CircularProgress color = 'white' size ='20px' /> : "Log in"}{" "}
            </button>
            <span className="loginForgot">Forgot password?</span>
            <button className="loginRegisterButton">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
