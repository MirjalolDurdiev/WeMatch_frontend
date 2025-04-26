import React from "react";
import { useState } from "react";
import { apiRoot } from "../../../api/apiRoot";

const ResetPassword = ({ onBack, onUpdate }) => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const handleResetPassword = async (e) => {
    e.preventDefault();

    const data = {
      otp: otp,
      email: email,
    };
    console.log(data);

    try {
      const res = await apiRoot.put("/auth/reset-password", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      console.log(res?.data);
      setOtp("");
      setEmail("");
      onUpdate()
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form onSubmit={handleResetPassword}>
        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full p-2 border-b border-[#130B544D] mb-2 outline-none mb-4"
          onChange={(e) => setOtp(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border-b border-[#130B544D] mb-2 outline-none mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="bg-[#0073E6] w-full text-white font-bold py-[7px] rounded-[5px]">
          Reset password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
