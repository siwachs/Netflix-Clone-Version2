import React, { useState, useEffect } from "react";
import "./plans.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../utils/config";
import { useSelector } from "react-redux";
import { useSubscription } from "../../../Custom Hooks/useSubscription";

function Plans({ name, description, id, selected }) {
  const [price, setPrice] = useState(null);
  const userId = useSelector((state) => state.authReducer.uid);
  const { loadCheckout } = useSubscription();

  useEffect(() => {
    async function fetchPrice() {
      const ref = collection(db, `products/${id}/prices`);
      const snap = await getDocs(ref);
      snap.forEach((doc) => {
        setPrice({
          priceId: doc.id,
          priceData: doc.data(),
        });
      });
    }
    fetchPrice();
  }, [id]);

  const subscribe = () => {
    console.log("check");
    if (price?.priceId) {
      loadCheckout(price.priceId, userId);
    }
  };

  return (
    <div
      className={selected ? `plan_row ${"plan_row_selected"}` : "plan_row"}
      onClick={selected ? undefined : subscribe}
    >
      <div className="plan_desc">
        {selected ? (
          <button disabled className="sub_btn subscribed_btn">
            subscribed
          </button>
        ) : (
          <button className="sub_btn">subscribe</button>
        )}
        <div className="plan_name">
          <h3>{name}</h3>
          <h3>{description}</h3>
        </div>
      </div>
      <div className="plan_price">
        <h3>{price?.priceData?.description} &#8377;</h3>
      </div>
    </div>
  );
}

export default Plans;
