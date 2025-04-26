import React, { useState } from "react";
import { apiRoot } from "../../../api/apiRoot";

export default function OtpModal({ onVerify }) {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!email.includes("@") || otp.length !== 6 || isNaN(otp)) {
      alert("Invalid email or OTP format!");
      return;
    }

    const data = {
      email: email,
      otp: otp,
    };
    console.log(data);

    try {
      const res = await apiRoot.post("/auth/verify-otp", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      console.log(res?.data);
      setEmail("");
      setOtp("");
      onVerify();
    } catch (err) {
      console.log(
        "Server error:",
        err.response ? err.response.data : err.message
      );
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-[#11111F] font-bold text-[17px] leading-[100%] mb-2">
        Enter OTP
      </h2>
      <p className="text-gray-600 mt-2">
        Please enter the 6-digit OTP sent to your phone
      </p>
      <form
        onSubmit={handleVerify}
        className="w-full flex flex-col items-center"
      >
        <input
          type="email"
          className="border p-2 mt-2 text-center w-full"
          placeholder="Verify email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          maxLength={6}
          onChange={(e) => setOtp(e.target.value)}
          className="border p-2 mt-2 text-center w-full"
          placeholder="Enter OTP"
        />

        <button
          type="submit"
          className="mt-4 bg-[#0073E6] text-white px-4 py-2 rounded w-full"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
}
