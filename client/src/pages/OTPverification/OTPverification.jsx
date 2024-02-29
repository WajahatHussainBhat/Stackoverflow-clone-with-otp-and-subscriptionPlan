import React, { useState } from "react";
import "./OTPverification.css";
import "./OTPverificationDarkMode.css";
import firebase from "../../firebase";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const OTPverification = () => {
  const navigate = useNavigate()
  const auth = getAuth();
  const darkMode = useSelector((state) => state.themeReducer.darkMode);

  const [formData, setFormData] = useState({
    mobile: "",
    otp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const configureCaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
      size: "invisible",
      callback: (response) => {
      },
      defaultCountry: "IN",
    });
  };

  const onSignInSubmit = (e) => {
    e.preventDefault();
    configureCaptcha();

    const phoneNumber = "+91" + formData.mobile;
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        alert("OTP has been sent");
      })
      .catch((error) => {
        alert("OTP not send");
      });
  };

  const onSubmitOTP = (e) => {
    e.preventDefault();
    const code = formData.otp;
    const confirmationResult = window.confirmationResult;

    if (!confirmationResult) {
      alert("OTP confirmation result not found. Please send OTP first.");
      return;
    }

    confirmationResult
      .confirm(code)
      .then((result) => {
        alert("User is verified");
        localStorage.setItem("ChatBotVerified", true)
        navigate("/ChatBot")
      })
      .catch((error) => {
        alert("Enter correct OTP");
      });
  };

  return (
    <section className={`OTP-verify-container ${darkMode ? "OTP-verify-container-dark" : ""}`}>
      <div className="OTP-container-1">
        <h1>OTP Verification</h1>
        <div className={`OTP-container-2 ${darkMode ? "OTP-container-2-dark" : ""}`}>
          <form onSubmit={onSignInSubmit}>
            <div id="sign-in-button"></div>
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              required
              onChange={handleChange}
              className="form-input"
            />
            <button type="submit" className={`form-btn ${darkMode ? "form-btn-dark" : ""}`}>
              Send OTP
            </button>
          </form>
          <form onSubmit={onSubmitOTP}>
            <input
              type="number"
              name="otp"
              placeholder="OTP"
              required
              onChange={handleChange}
              className="form-input"
            />
            <button type="submit" className={`form-btn ${darkMode ? "form-btn-dark" : ""}`}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default OTPverification;
