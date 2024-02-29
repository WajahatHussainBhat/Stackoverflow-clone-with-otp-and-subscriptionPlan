import React from 'react'
import cancel from "../../assets/cancel.png"
import "./Subscription.css";

const SubscriptionCancel = () => {
  return (
   
      
      <div className='SubscriptionSuccess-container'>
        <div className='SubscriptionCancel-container-2'>
          <img src={cancel} alt="" width={220} height={220}/>
          <h3 className=''>
          Something Went Wrong
          </h3>
          <a
          href="/"
          className=''
          >
             Go To Homepage
          </a>
        </div>

    </div>
  )
}

export default SubscriptionCancel
