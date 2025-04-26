import React from "react";
import { Link } from "react-router-dom";
import faceBookIcon from "../../assets/svg/face.svg";
import xBookIcon from "../../assets/svg/x.svg";
import instagramBookIcon from "../../assets/svg/insta.svg";

const Footer = () => {
  return (
    <footer className="bg-black pt-[60px] pb-[40px]">
      <div className="max-w-[1336px] w-full mx-auto px-[20px]">
        <div className="flex justify-between w-full mb-[60px] md:flex flex-wrap">
          <div className="max-w-[303px] w-full">
            <Link className="text-white font-bold text-4 " to={"/"}>
              WeMatch
            </Link>

            <div className="mb-3 mt-4">
              <p className="text-white font-normal font-inter text-4 leading-6 mb-3">
                WeMatch is an innovative platform designed to connect
                individuals with volunteering, internship, and job
                opportunities.
              </p>
              <span className="text-white font-semibold text-4 leading-6">
                Phone: <Link className="text-[#FFFFFF99]">(610) 366-7883</Link>
              </span>
            </div>

            <div>
              <span className="text-white font-semibold text-4 leading-6">
                Address:{" "}
                <Link className="text-[#FFFFFF99]">
                  100005, Tashkent Uzbekistan <br /> Yunusabad District, MD
                  11/17{" "}
                </Link>
              </span>
            </div>
          </div>

          <ul className="flex">
            <li>
              <h3 className="text-white font-semibold text-[20px] leading-[24px] mb-4">
                About Us
              </h3>
              <ul>
                <li>
                  <Link
                    className="text-white font-normal text-4 leading-[24px]"
                    to={"/"}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-white font-normal text-4 leading-[24px]"
                    to={"/"}
                  >
                    Opportunities
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-white font-normal text-4 leading-[24px]"
                    to={"/"}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-white font-normal text-4 leading-[24px]"
                    to={"/"}
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          <ul className="flex">
            <li>
              <h3 className="text-white font-semibold text-[20px] leading-[24px] mb-4">
                Useful Links
              </h3>
              <ul>
                <li>
                  <Link
                    className="text-white font-normal text-4 leading-[24px]"
                    to={"/"}
                  >
                    F.A.Q
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-white font-normal text-4 leading-[24px]"
                    to={"/"}
                  >
                    News
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-white font-normal text-4 leading-[24px]"
                    to={"/"}
                  >
                    Reports
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-white font-normal text-4 leading-[24px]"
                    to={"/"}
                  >
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-white font-normal text-4 leading-[24px]"
                    to={"/"}
                  >
                    Privacy Policy{" "}
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to={"/"}>
              <img
                src={faceBookIcon}
                alt="faceBookIcon"
                width={24}
                height={24}
              />
            </Link>
            <Link to={"/"}>
              <img src={xBookIcon} alt="xBookIcon" width={24} height={24} />
            </Link>
            <Link to={"/"}>
              <img
                src={instagramBookIcon}
                alt="instagramBookIcon"
                width={24}
                height={24}
              />
            </Link>
          </div>
          <p className="text-[#FFFFFF99] font-normal text-[14px] leading-[26px]">
            {" "}
            © 2025 WeMatch. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
