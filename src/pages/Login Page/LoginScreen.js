import React, { useState } from "react";
import "./LoginScreen.css";
import Auth from "./Auth/Auth";

function LoginScreen() {
  const [btnText, setBtnText] = useState("Sign In");
  const [isLogin, setIsLogin] = useState(false);

  const switchMode = () => {
    if (isLogin) {
      setIsLogin(false);
      setBtnText("Sign In");
    } else {
      setIsLogin(true);
      setBtnText("Cancel");
    }
  };

  const signUp = (event) => {
    event.preventDefault();
    setIsLogin(true);
    setBtnText("cancel");
  };

  const Home = () => {
    return (
      <div className="center_content">
        <h1>Unlimited movies, TV shows and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <form className="signUp" onSubmit={signUp}>
          <label htmlFor="email">
            Ready to watch? Enter your email to create or restart your
            membership.
          </label>
          <div className="form_inputs">
            <input id="email" placeholder="Email Address" type="email"></input>
            <button type="submit">Get Started</button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div
      className="loginScreen"
      style={{ backgroundImage: `url("login-back.jpg")` }}
    >
      <div className="background_gradient">
        <div className="header">
          <img alt="logo" src="logo1.svg"></img>
          <div className="inputs">
            <select id="lang">
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
            </select>
            <button onClick={switchMode}>{btnText}</button>
          </div>
        </div>
        {isLogin ? <Auth></Auth> : <Home></Home>}
        <div className="dummy"></div>
      </div>
    </div>
  );
}

export default LoginScreen;
