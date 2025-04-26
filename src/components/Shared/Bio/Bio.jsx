import React, { useState, useEffect } from "react";
import Title from "../Title/Title";
import { toast } from "react-toastify";

const Bio = () => {

  const [bio, setBio] = useState(localStorage.getItem("userBio") || "");
  const [isEditing, setIsEditing] = useState(false); 
  const [newBio, setNewBio] = useState(bio); 


  const handleBioChange = (e) => {
    setNewBio(e.target.value);
  };


  useEffect(() => {
    if (newBio !== bio) {
      localStorage.setItem("userBio", newBio); 
      setBio(newBio); 
    }
  }, [newBio, bio]);

  return (
    <section className="bg-white shadow-sm shadow-gray-300 p-6 mb-4">
      <Title title={"Bio"} />

      <div>
        {bio ? (
          <div>
            {isEditing ? (
              <div>
                <textarea
                  value={newBio}
                  onChange={handleBioChange}
                  onBlur={() => setIsEditing(false)} 
                  placeholder="Write your bio..."
                  className="w-full p-3 border rounded-md text-[#313D44] font-inter font-normal text-[18px] leading-[28px] mb-4"
                />
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  value={bio}
                  onClick={() => setIsEditing(true)} 
                  readOnly
                  className="w-full p-3 border rounded-md text-[#313D44] font-inter font-normal text-[18px] leading-[28px] mb-4"
                  placeholder="Write your bio..."
                />
              </div>
            )}
          </div>
        ) : (
          <div>
            <input
              type="text"
              value={newBio}
              onChange={handleBioChange}
              onClick={() => setIsEditing(true)} 
              placeholder="Write your bio..."
              className="w-full p-3 rounded-md text-[#313D44] font-inter font-normal text-[18px] leading-[28px] mb-4 border-none focus:ring-0"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Bio;
