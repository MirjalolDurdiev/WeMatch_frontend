import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { IoMdMenu } from "react-icons/io";
import Modal from "../../components/ui/Modal/Modal";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Opportunities", to: "/viewmore" },
    { name: "About Us", to: "/aboutus" },
  ];

  const handleNavigateProfile = () => {
    const isRegistered = localStorage.getItem("accessToken");
    if (!isRegistered) {
      setIsModalOpen(true);
    } else {
      navigate("/profile");
    }
  };

  return (
    <header className="bg-black py-4">
      <div className="max-w-[1336px] w-full mx-auto px-5 flex items-center justify-between">
        <Link className="text-white font-bold text-xl" to={"/"}>
          WeMatch
        </Link>

        <button
          className="text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <IoMdClose className="w-6 h-6" />
          ) : (
            <IoMdMenu className="w-6 h-6" />
          )}
        </button>

        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link className="text-[#FFFFFF99] font-inter" to={link.to}>
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={handleNavigateProfile}
              className="text-[#FFFFFF99] font-inter"
            >
              Profile
            </button>
          </li>
        </ul>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-black p-5 shadow-lg">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  className="text-white block p-2"
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={handleNavigateProfile}
                className="text-white block p-2"
              >
                Profile
              </button>
            </li>
          </ul>
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
};

export default Header;
