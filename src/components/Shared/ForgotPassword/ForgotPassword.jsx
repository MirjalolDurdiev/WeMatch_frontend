import React, { useState } from "react";
import { apiRoot } from "../../../api/apiRoot";

const ForgotPassword = ({ onBack, onReset }) => {
  const [email, setEmail] = useState("");
  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
    };

    try {
      const res = await apiRoot.post("/auth/forgot-password", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      console.log(res?.data);
      setEmail("");
      onReset()
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form onSubmit={handleUpdatePassword}>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border-b border-[#130B544D] mb-2 outline-none mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="bg-[#0073E6] w-full text-white font-bold py-[7px] rounded-[5px] mb-4">
          Continue
        </button>
      </form>
      <p className="text-center text-[#0073E6]" onClick={onBack}>
        Back to Login
      </p>
    </div>
  );
};

export default ForgotPassword;
