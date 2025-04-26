import React, { useState, useEffect } from "react";
import { apiRoot } from "../../api/apiRoot";
import { FaEdit } from "react-icons/fa";
import { BsBoxArrowRight } from "react-icons/bs";
import Title from "../../components/Shared/Title/Title";
import Bio from "../../components/Shared/Bio/Bio";
import Skills from "../../components/Shared/Skills/Skills";
import Certificate from "../../components/Shared/Certificate/Certificate";
import Education from "../../components/Shared/Education/Education";
import Contribution from "../../components/Shared/Contribution/Contribution";
import SkillModal from "../../components/ui/Modal/skill-modal"; // Import SkillModal

const Profile = () => {
  const [profileUsers, setProfileUsers] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false); // State for logout confirmation modal
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await apiRoot.get("/users/me", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const user = res?.data?.data;
        setProfileUsers({
          profileImg: user?.image,
          profileName: user?.name,
          profileEmail: user?.email,
          profileAge: user?.age,
          profileGender: user?.gender,
          profileLocation: user?.location,
        });
        setName(user?.name);
        setAge(user?.age);
        setGender(user?.gender);
        setLocation(user?.location);
      } catch (err) {
        console.log(err);
      }
    };

    getProfile();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/";
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const data = {
      name,
      age,
      gender,
      location,
    };

    try {
      const res = await apiRoot.patch("/users/me", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setProfileUsers({
        profileImg: res?.data?.data?.image,
        profileName: res?.data?.data?.name,
        profileEmail: res?.data?.data?.email,
        profileAge: res?.data?.data?.age,
        profileGender: res?.data?.data?.gender,
        profileLocation: res?.data?.data?.location,
      });
      setOpenEditModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImg(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpdate = async () => {
    const formData = new FormData();
    formData.append("image", profileImg);

    try {
      const res = await apiRoot.patch("/users/me", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setProfileUsers({
        ...profileUsers,
        profileImg: res?.data?.data?.image,
      });
      setOpenImageModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="pt-[84px] pb-[180px] bg-[#F4F5F6]">
      <div className="max-w-[1091px] w-full mx-auto px-[20px]">
        <div className="bg-white shadow-xl rounded-lg p-6 mb-6 flex flex-col gap-4">
          <div className="flex items-start justify-between mb-6">
            <div className="relative group flex-shrink-0">
              <img
                src={
                  profileUsers?.profileImg
                    ? "http://localhost:3000/images/" + profileUsers?.profileImg
                    : "https://cdn-icons-png.flaticon.com/512/6858/6858504.png"
                }
                alt="profileImg"
                className="rounded-full border-4 border-[#F4F5F6] cursor-pointer w-32 h-32 transition duration-300 transform group-hover:scale-105"
                onClick={() => setOpenImageModal(true)}
              />
              <div
                className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                onClick={() => setOpenImageModal(true)}
              >
                <FaEdit className="text-white" />
              </div>
            </div>

            <div className="ml-6 w-full">
              <h3 className="text-[26px] text-[#313D44] ml-[-50px] text-center">
                Personal Info
              </h3>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col items-start w-1/2 pr-4">
              <span className="text-[#6B7280] text-[16px]">Name</span>
              <span className="text-[#313D44] font-semibold text-[16px]">
                {profileUsers?.profileName}
              </span>
            </div>
            <div className="flex flex-col items-start w-1/2 pr-4">
              <span className="text-[#6B7280] text-[16px]">Age: </span>
              <span className="text-[#313D44] font-semibold text-[16px]">
                {profileUsers?.profileAge}
              </span>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col items-start w-1/2 pr-4">
              <span className="text-[#6B7280] text-[16px]">Gender</span>
              <span className="text-[#313D44] font-semibold text-[16px] capitalize">
                {profileUsers?.profileGender}
              </span>
            </div>
            <div className="flex flex-col items-start w-1/2 pr-4">
              <span className="text-[#6B7280] text-[16px]">Email: </span>
              <span className="text-[#313D44] font-semibold text-[16px]">
                {profileUsers?.profileEmail}
              </span>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col items-start w-1/2 pr-4">
              <span className="text-[#6B7280] text-[16px]">Location</span>
              <span className="text-[#313D44] font-semibold text-[16px]">
                {profileUsers?.profileLocation}
              </span>
            </div>
          </div>

          {/* Log Out Button */}
          <div className="flex justify-end mt-4 gap-4">
            <button
              onClick={() => setOpenEditModal(true)}
              className="flex items-center gap-2 w-auto bg-yellow-500 text-white px-6 py-2 rounded-full text-[16px] hover:bg-yellow-600 transition duration-300"
            >
              <FaEdit /> Edit Profile
            </button>
            <button
              onClick={() => setOpenLogoutModal(true)} // Open confirmation modal on click
              className="bg-red-500 text-white px-6 py-2 rounded-full text-[16px] hover:bg-red-600 transition duration-300"
            >
              <BsBoxArrowRight className="inline mr-2" />
              Log Out
            </button>
          </div>
        </div>

        <Bio />
        <Skills />
        <Certificate />
        <Education />
        <Contribution />
      </div>

      {/* Edit Profile Modal */}
      {openEditModal && (
        <SkillModal close={() => setOpenEditModal(false)}>
          <div className="bg-white rounded-[8px] p-4">
            <h1 className="mb-3 font-semibold text-[25px]">Edit Profile</h1>
            <form
              className="flex flex-col gap-4"
              onSubmit={handleProfileUpdate}
            >
              <div className="flex flex-col">
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="p-2 border rounded-[8px] outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label>Age</label>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="p-2 border rounded-[8px] outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label>Gender</label>
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="p-2 border rounded-[8px] outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label>Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="p-2 border rounded-[8px] outline-none"
                />
              </div>
              <button className="bg-blue-600 text-white p-2 rounded-[8px]">
                Save Changes
              </button>
            </form>
          </div>
        </SkillModal>
      )}

      {/* Edit Profile Image Modal */}
      {openImageModal && (
        <SkillModal close={() => setOpenImageModal(false)}>
          <div className="bg-white rounded-[8px] p-4">
            <h1 className="mb-3 font-semibold text-[25px]">
              Change Profile Image
            </h1>
            <input
              type="file"
              onChange={handleImageChange}
              className="p-2 border rounded-[8px] outline-none"
            />
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="w-32 h-32 rounded-full object-cover"
                />
              </div>
            )}
            <button
              onClick={handleImageUpdate}
              className="bg-blue-600 text-white p-2 rounded-[8px] mt-4"
            >
              Save Profile Image
            </button>
          </div>
        </SkillModal>
      )}

      {/* Logout Confirmation Modal */}
      {openLogoutModal && (
        <SkillModal close={() => setOpenLogoutModal(false)}>
          <div className="bg-white rounded-[8px] p-4">
            <h1 className="mb-3 font-semibold text-[25px]">
              Do you want to log out?
            </h1>
            <div className="flex items-center justify-between">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white p-2 rounded-[8px]"
              >
                Logout
              </button>
              <button
                onClick={() => setOpenLogoutModal(false)}
                className="bg-gray-300 p-2 rounded-[8px]"
              >
                Cancel
              </button>
            </div>
          </div>
        </SkillModal>
      )}
    </section>
  );
};

export default Profile;
