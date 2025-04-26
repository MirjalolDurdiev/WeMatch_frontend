import React, { useEffect, useState } from "react";
import ForgotPassword from "../../Shared/ForgotPassword/ForgotPassword";
import Login from "../../Shared/Login/Login";
import OptModal from "../../Shared/OptModal/OptModal";
import Register from "../../Shared/Register/Register";
import ResetPassword from "../../Shared/ResetPassword/ResetPassword";
import UpdatePassword from "../../Shared/UpdatePassword/UpdatePassword";

export default function Modal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [isOtpModal, setIsOtpModal] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [isUpdatePassword, setIsUpdatePassword] = useState(false);

  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 flex items-center z-50 justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 shadow-lg w-96">
        <h2 className="text-[#11111F] font-bold text-[17px] leading-[100%] mb-2">
          Welcome to <span className="text-[#0073E6]">WeMatch</span>
        </h2>
        {!isForgotPassword && !isResetPassword && (
          <p className="text-gray-600 mt-2">Please enter your details</p>
        )}

        {isOtpModal ? (
          <OptModal
            onVerify={() => {
              setIsOtpModal(false);
              setIsLogin(true);
            }}
          />
        ) : isUpdatePassword ? (
          <UpdatePassword toLogin={() => {
            setIsUpdatePassword(false)
            setIsLogin(true)
          }} />
        ) : isResetPassword ? (
          <ResetPassword
            onBack={() => setIsResetPassword(false)}
            onUpdate={() => {
              setIsResetPassword(false);
              setIsUpdatePassword(true);
            }}
          />
        ) : isForgotPassword ? (
          <ForgotPassword
            onBack={() => setIsForgotPassword(false)}
            onReset={() => {
              setIsForgotPassword(false);
              setIsResetPassword(true);
            }}
          />
        ) : isLogin ? (
          <Login
            onSwitch={() => setIsLogin(false)}
            onClose={onClose}
            onForgotPassword={() => setIsForgotPassword(true)}
          />
        ) : (
          <Register onSwitch={() => setIsOtpModal(true)} />
        )}

        {!isOtpModal &&
          !isForgotPassword &&
          !isResetPassword &&
          !isUpdatePassword && (
            <div className="mt-4 flex justify-between">
              <span className="text-[#11111F99] font-medium font-inter text-2 leading-[100%]">
                {isLogin
                  ? "Don’t have an account?"
                  : "Already have an account?"}
                <button
                  className="text-[#0073E6] ml-[5px]"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "Sign Up" : "Login"}
                </button>
              </span>
            </div>
          )}

        {!isForgotPassword && !isResetPassword && !isUpdatePassword && (
          <button onClick={onClose} className="mt-4 text-red-500 w-full">
            Close
          </button>
        )}
      </div>
    </div>
  );
}
