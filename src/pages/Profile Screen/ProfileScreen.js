import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Plans from "./Plans/Plans";
import "./ProfileScreen.css";
import { useDispatch } from "react-redux";
import { logOut } from "../../Redux/actions/auth.actions";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../Redux/actions/subscription.actions";

function ProfileScreen() {
  const email = useSelector((state) => state.authReducer.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role, endAt } = useSelector((state) => state.subscriptionReducer);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const { products } = useSelector((state) => state.subscriptionReducer);

  const signOutHandler = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <div className="profileScreen">
      <button
        style={{ width: "100%" }}
        onClick={signOutHandler}
        className="sign_out"
      >
        sign out
      </button>
      <header className="profile">
        <h1>Edit Profile</h1>
        <div className="profileInfo">
          <img alt="profileImg" src="profile.jpg"></img>
          <div className="meta">
            <h3>{email}</h3>
            <h3>
              Current Plan:<span className="selectedPlan">{role}</span>
            </h3>
            <h3>
              Renewal Data:
              <span className="selectedPlan">
                {new Date(endAt * 1000).toLocaleDateString()}
              </span>
            </h3>
          </div>
        </div>
      </header>
      <hr></hr>
      {products &&
        Object.entries(products).map(([productId, productData]) => {
          return productData.name === role ? (
            <Plans
              key={productId}
              name={productData.name}
              description={productData.description}
              id={productId}
              selected
            ></Plans>
          ) : (
            <Plans
              key={productId}
              name={productData.name}
              description={productData.description}
              id={productId}
            ></Plans>
          );
        })}
      <hr></hr>
    </div>
  );
}

export default ProfileScreen;
