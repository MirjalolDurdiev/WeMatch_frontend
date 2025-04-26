import React, { useState, useEffect } from "react";
import { apiRoot } from "../../../api/apiRoot";

const UpdatePassword = ({toLogin}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (!accessToken) {
      console.log("Access token not found!");
      return;
    }

    const data = {
      currentPassword: currentPassword,
      newPassword: newPassword,
    };

    try {
      const res = await apiRoot.put("/auth/update-password", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(res?.data);
      localStorage.removeItem("accessToken");
      setCurrentPassword("");
      setNewPassword("");
      toLogin()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleUpdatePassword}>
        <input
          type="password"
          placeholder="Current password"
          className="w-full p-2 border-b border-[#130B544D] mb-2 outline-none"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="New password"
          className="w-full p-2 border-b border-[#130B544D] mb-2 outline-none"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button className="bg-[#0073E6] w-full text-white font-bold py-[7px] rounded-[5px]">
          Update password
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
