import React, { useEffect, useState } from "react";
import "./Subscription.css";
import "./SubscriptionDarkMode.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { subscriptionCheckout } from "../../actions/subscription";


const Subscription = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const User = useSelector((state) => state.currentUserReducer);
  const darkMode = useSelector((state) => state.themeReducer.darkMode);
  const [planType, setPlanType] = useState("");

  const data = [
    {
      id: 1,
      title: "Basic",
      planDef: "Free",
      plan: "Free",
      price: 0,
      desc: "You can post only 1 question a day!",
    },
    {
      id: 2,
      title: "Silver",
      planDef: "Silver",
      plan: "100",
      price: 100,
      desc: "You can post only 5 question a day!",
    },
    {
      id: 3,
      title: "Gold",
      planDef: "Gold",
      plan: "1000",
      price: 1000,
      desc: "You can post unlimited questions!",
    },
  ];

  const checkout = async (price) => {
    try {
      if (User === null) {
        alert("Please login first to have a subscription plan");
        navigate("/Auth");
      } else {
        dispatch(subscriptionCheckout(price, User?.result?._id, navigate));
      }
    } catch (error) {
      console.log("Error during checkout:", error);
    }
  };

  useEffect(() => {
    const plan = User?.result?.subscription?.planType;
    setPlanType(plan || "");
  }, [User]);

  

  return (
    <div className="subscription-container">
      {data.map((item) => (
        <div
          key={item.id}
          className={`main-container ${darkMode ? "main-container-dark" : ""}`}
          style={
            planType === item.planDef.toLowerCase()
              ? { border: "0.3em solid #1eff52" , boxShadow: "rgb(0 112 26) 3px 3px 6px"}
              : null
          }
        >
          <div className="price-container">
            <div className="price">
              {item.id !== 1 && "₹"}
              {item.plan}
            </div>
            {item.id !== 1 && <p>/month</p>}
          </div>

          <div className="title">{item.title}</div>
          <div className="desc">{item.desc}</div>
          {planType === item.planDef.toLowerCase() ? (
            <button className={`subscribe-btn ${darkMode ? "subscribe-btn-dark" : ""}`} type="submit">
              Subscribed
            </button>
          ) : (
            <button
              className={`subscribe-btn ${darkMode ? "subscribe-btn-dark" : ""}`}
              type="submit"
              onClick={() => checkout(Number(item.price))}
            >
              Subscribe
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Subscription;
