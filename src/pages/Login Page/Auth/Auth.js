import React, { useRef, useState, useEffect } from "react";
import "./Auth.css";
import Modal from "../../../Modals/Modal";
import { useDispatch, useSelector } from "react-redux";
import { register, signIn } from "../../../Redux/actions/auth.actions";

function Auth() {
  const EmailRef = useRef(null);
  const PassRef = useRef(null);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.authReducer.error);

  const [isModelOpen, setIsModelOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [errorCode, setErrorCode] = useState(null);

  useEffect(() => {
    if (error) {
      setIsModelOpen(true);
      setErrorMsg(error.errorMessage);
      setErrorCode(error.errorCode);
    }
  }, [error]);

  const registerHandler = (event) => {
    event.preventDefault();

    dispatch(register(EmailRef.current.value.trim(), PassRef.current.value));
  };

  const signInHandler = (event) => {
    event.preventDefault();

    dispatch(signIn(EmailRef.current.value.trim(), PassRef.current.value));
  };

  return (
    <React.Fragment>
      <Modal isOpen={isModelOpen} close={() => setIsModelOpen(false)}>
        <h1>Auth Error</h1>
        <p>{errorCode}</p>
        <p>{errorMsg}</p>
      </Modal>
      <div className="auth">
        <h1>Sign in</h1>
        <form className="login_form" onSubmit={signInHandler}>
          <input
            placeholder="Email or phone number"
            type="email"
            ref={EmailRef}
          ></input>
          <input placeholder="Password" type="password" ref={PassRef}></input>
          <button type="submit">Sign In</button>
        </form>
        <div className="newToNetflix">
          <span id="ntfOne">New to Netflix?</span>
          <span id="ntftwo" onClick={registerHandler}>
            Sign up now
          </span>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Auth;
