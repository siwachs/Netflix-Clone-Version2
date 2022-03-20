import { React, useEffect, Fragment } from "react";
import HomeScreen from "./pages/Home Page/HomeScreen";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginScreen from "./pages/Login Page/LoginScreen";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileScreen from "./pages/Profile Screen/ProfileScreen";
import NavBar from "./component/NavBar/NavBar";
import { getSubscription } from "./Redux/actions/subscription.actions";

function App() {
  const userId = useSelector((state) => state.authReducer.uid);
  const { role } = useSelector((state) => state.subscriptionReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let routes;

  useEffect(() => {
    dispatch(getSubscription(userId));
  }, [userId, dispatch]);

  useEffect(() => {
    if (userId) {
      navigate("/");
      if (!role) {
        navigate("/profile");
      }
    }
  }, [userId, role]);

  if (!userId) {
    routes = (
      <Routes>
        <Route exact path="/" element={<LoginScreen></LoginScreen>}></Route>
        <Route path="*" element={<Navigate to="/"></Navigate>}></Route>
      </Routes>
    );
  } else if (userId && !role) {
    routes = (
      <Routes>
        <Route
          exact
          path="/profile"
          element={<ProfileScreen></ProfileScreen>}
        ></Route>
        <Route path="*" element={<Navigate to="/profile"></Navigate>}></Route>
      </Routes>
    );
  } else {
    routes = (
      <Fragment>
        <NavBar></NavBar>
        <Routes>
          <Route exact path="/" element={<HomeScreen></HomeScreen>}></Route>
          <Route
            exact
            path="/profile"
            element={<ProfileScreen></ProfileScreen>}
          ></Route>
          <Route path="*" element={<Navigate to="/"></Navigate>}></Route>
        </Routes>
      </Fragment>
    );
  }

  return routes;
}

export default App;
