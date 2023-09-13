import React, { useRef, useState } from "react";
import "./loginForm.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const database = [
    {
      username: "laraib",
      password: "123",
    },
    {
      username: "gillani",
      password: "1234",
    },
  ];
  const errors = {
    uname: "invalid user name",
    pass: "invalid password",
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    var { uname, pass } = document.forms[0];
    const userData = database.find((user) => user.username === uname.value);
    if (userData) {
      if (userData.password !== pass.value) {
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
        const token = "your-secret-token";
        const expireTime = new Date().getTime() + 1 * 60 * 1000;
        localStorage.setItem("token", token);
        localStorage.setItem("tokenExpiration", expireTime.toString());
        console.log(localStorage.getItem("tokenExpiration"));
        console.log(localStorage.getItem("token"));

        navigate("/home");
      }
    } else {
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const submitHandler = () => {
    toast("login successful!", { position: "top-right" });
    localStorage.setItem("userName", data.current.value);
    localStorage.setItem("pass", data1.current.value);

    console.log(localStorage.getItem("userName"));
    console.log(localStorage.getItem("pass"));
  };
  const data = useRef();
  const data1 = useRef();

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="loginPage">
          <h1>Login</h1>
          <input
            ref={data}
            className="inputClass"
            type="text"
            name="uname"
            placeholder="username"
            required
          />
          {renderErrorMessage("uname")}
          <input
            ref={data1}
            className="inputClass"
            type="password"
            placeholder="password"
            name="pass"
            required
          />
          {renderErrorMessage("pass")}

          <button className="login-btn" type="submit" onClick={submitHandler}>
            Login
          </button>
          <ToastContainer />
        </div>
      </form>
    </div>
  );
};

export default Login;
