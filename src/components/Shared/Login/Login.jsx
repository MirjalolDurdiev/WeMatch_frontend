import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { apiRoot } from "../../../api/apiRoot";
import { LOGIN_ADMIN } from "../../../redux/action/login";
import { LuEye } from "react-icons/lu";
import { FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const Login = ({ onClose, onForgotPassword }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisiblePassword, setIsVisiblePassword] = useState(true);
  const dispatch = useDispatch();
  const handlePasswordVisible = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    try {
      const res = await apiRoot.post("/auth/login", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      console.log(res?.data);
      setEmail("");
      setPassword("");
      dispatch({ type: LOGIN_ADMIN, payload: res?.data });
      onClose();
      toast.success("Successfully Logged in");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form className="mt-4 relative" onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border-b border-[#130B544D] mb-2 outline-none"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type={isVisiblePassword ? "text" : "password"}
        placeholder="Password"
        className="w-full p-2 border-b border-[#130B544D] mb-2 outline-none relative"
        onChange={(e) => setPassword(e.target.value)}
      />
      {password?.length > 0 ? (
        isVisiblePassword ? (
          <LuEye
            className="absolute top-[60px] right-[15px] w-[20px] h-[20px]"
            onClick={handlePasswordVisible}
          />
        ) : (
          <FaRegEyeSlash
            className="absolute top-[60px] right-[15px] w-[20px] h-[20px]"
            onClick={handlePasswordVisible}
          />
        )
      ) : (
        <FaRegEyeSlash
          className="absolute top-[60px] right-[15px] w-[20px] h-[20px]"
          onClick={handlePasswordVisible}
        />
      )}
      <div className="mb-[19px] flex justify-between items-center">
        <div className="flex items-center gap-[9px]">
          <input type="checkbox" />
          <label className="text-[#11111F99]">Remember me</label>
        </div>
        <p className="text-[#0073E6]" onClick={onForgotPassword}>
          Forgot password?
        </p>
      </div>
      <button className="bg-[#0073E6] w-full text-white font-bold py-[7px] rounded-[5px]">
        Login
      </button>
    </form>
  );
};

export default Login;
