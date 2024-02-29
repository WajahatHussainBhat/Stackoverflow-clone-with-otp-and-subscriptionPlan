import React from 'react'
import success from "../../assets/success.png"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import "./Subscription.css";
import {  getSubscriptionPaymentSuccess } from '../../actions/subscription';

const SubscriptionSuccess = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const User = useSelector((state) => state.currentUserReducer)

    const sessionId = User?.result?.subscription?.sessionId;
    const id =User?.result?._id;

    const handlePaymentSuccess = async() => {
        try {
          dispatch(getSubscriptionPaymentSuccess(sessionId, id, navigate))
        } catch (error) {
            console.error("Error during payment:", error);
        }
    } 

  return (
 
      <div className='SubscriptionSuccess-container'>
        <div className='SubscriptionSuccess-container-2'>
          <img src={success} alt="" width={220} height={220}/>
          <h3 className=''>
            Payment Successful
          </h3>
          <button onClick={() => handlePaymentSuccess()}
          className=''
          >
            Proceed
          </button>
        </div>

    </div>
  )
}

export default SubscriptionSuccess
