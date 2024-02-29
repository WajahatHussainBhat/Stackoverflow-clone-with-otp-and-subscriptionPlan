import * as api from "../api";
import { setCurrentUser } from "./currentUser";

export const subscriptionCheckout = (price, id, navigate) => async (dispatch) => {
  try {
    const { data } = await api.subscriptionCheckout(price, id);
    if (data?.session?.url) {
      window.location.href = data.session.url;
    } else {
      console.error("Failed to get checkout session URL:", data);
    }
  } catch (error) {
    console.error("Error during subscription:", error);
  }
};


export const getSubscriptionPaymentSuccess = (sessionId, id, navigate) => async (dispatch) => {
  try {
    const {data} = await api.subscriptionPaymentSuccess(sessionId, id);
    if(data){

      const profile = JSON.parse(localStorage.getItem("Profile"));

      const updatedResults = {
        ...profile.result,
        subscription: data.subscription,
      };

      // Merge the updated results with the rest of the profile
      const updatedProfile = {
        ...profile,
        result: updatedResults,
      };

      // Save the updated profile back to local storage
      localStorage.setItem("Profile", JSON.stringify(updatedProfile));

       navigate("/")
    }else{
      console.log(data.message)
    }
   
  } catch (error) {
    console.error("Error during payment:", error);
    navigate("/Cancel")
  }
}

export const updateSubscriptionDefault =  () => async (dispatch) => {
  try {
    await api.updateSubscriptionToDefault();
  } catch (error) {
    console.error("Error during subscription update to default settings:", error);
  }
}