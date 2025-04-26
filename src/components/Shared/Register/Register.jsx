import React from "react";
import { useState } from "react";
import { apiRoot } from "../../../api/apiRoot";
import { toast } from "react-toastify";

const Register = ({ onSwitch }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const data = {
      name: name,
      email: email,
      password: createPassword,
      conifirmPassword: confirmPassword,
    };
    console.log(data);

    try {
      const res = await apiRoot.post("/auth/register", data, {
        "Content-Type": "application/json",
        Accept: "application/json",
      });
      console.log(res?.data);
      setName("");
      setEmail("");
      setCreatePassword("");
      setConfirmPassword("");
      onSwitch();
      toast.success("Successfully Registered");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };
  return (
    <form className="mt-4" onSubmit={handleRegister}>
      <input
        type="text"
        placeholder="Enter your name"
        className="w-full p-2 border-b border-[#130B544D] mb-2 outline-none"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border-b border-[#130B544D] mb-2 outline-none"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Create password"
        className="w-full p-2 border-b border-[#130B544D] mb-2 outline-none"
        onChange={(e) => setCreatePassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm password"
        className="w-full p-2 border-b border-[#130B544D] mb-2 outline-none"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button className="bg-[#0073E6] w-full text-white font-bold py-[7px] rounded-[5px]">
        Sign Up
      </button>
    </form>
  );
};

export default Register;
