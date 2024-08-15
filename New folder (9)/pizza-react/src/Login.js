import logo from './logo.svg';
import './login.css';
import Header from './components/Header';
import Body from './components/Body';
import { Provider } from 'react-redux';
/* import Login from './components/Login'; */
import store from './store';
import Home from './screens/Home';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";

import Cart from "./screens/Cart";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth ,firebase} from "./firebase.config";
import { toast, Toaster } from "react-hot-toast";
import {  RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth";
import {React} from 'react';

function Login() {
 

  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  return (
    <div>
    
    
    <section className=" ">
    <div>
      <Toaster toastOptions={{ duration: 4000 }} />
      <div id="recaptcha-container"></div>
      {user ? (
       <Home/>
      ) : (
        <div className='login-container'>
            <img src='https://pizzaonline.dominos.co.in/postorder-ui/images/appLogo.png' style={{marginBottom:10}}></img>
        <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
          <div style={{ marginBottom:15}}>Login to unlock awesome benefits</div>
          
            <div className='f1'>
                
              <img src='https://pizzaonline.dominos.co.in/postorder-ui/images/personalizedOffers.png'></img>
              <span>Personalized Offers </span>

              
              
              <img src='https://pizzaonline.dominos.co.in/postorder-ui/images/loyaltyRewards.png'></img>
              <span>Loyalty Rewards </span>

              
            
              <img src='https://pizzaonline.dominos.co.in/postorder-ui/images/easyPayments.png'></img>
              <span>Easy Payments </span>

              
            </div >
            
            </div>
          <div>
           
          {showOTP ? (
            <>
       
              <label
                htmlFor="otp"
                className="font-bold text-xl text-white text-center"
              >
                Enter your OTP
              </label>
              <OtpInput
                value={otp}
                onChange={setOtp}
                OTPLength={6}
                otpType="number"
                disabled={false}
                autoFocus
                className="opt-container "
              ></OtpInput>
              <button
                onClick={onOTPVerify}
                className="f2"
              >
                {loading && (
                  <CgSpinner size={20} className="mt-1 animate-spin" />
                )}
                <span>Verify OTP</span>
              </button>
             
            </>
             
          ) : (
            <>
            
              <label
                htmlFor=""
              >
                Mobile Number
              </label>
              <PhoneInput country={"in"} value={ph} onChange={setPh} />
              <button
             
                onClick={onSignup}
                className="f2"
              >
                {loading && (
                  <CgSpinner size={20} className="mt-1 animate-spin" />
                )}
                <span>Send code via SMS</span>
              </button>
            </>
          )}
        </div>
        </div>
      )}
    </div>
  </section> 
</div>
  );
}

export default Login;
