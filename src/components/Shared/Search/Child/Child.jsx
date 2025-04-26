import React from "react";
import { Link } from "react-router-dom";

const Child = ({ image, description, name, location, paymentType, id }) => {
  return (
    <Link to={`/cardsid/${id}`}>
      <div className="rounded-b-[20px] bg-white flex flex-col justify-between mb-6 overflow-hidden gap-4">
        <div className=" flex gap-4  pt-4 pr-[14px]  pl-4">
          <img
            className="rounded-b-2xl"
            src={"http://localhost:3000/images/" + image}
            alt="viewImage"
            width={184}
            height={184}
          />
          <div>
            <span className="bg-[#98A3AE29] rounded-[4px] text-[#24292E] py-[4px]  px-[20px] font-inter font-lg  leading-4 capitalize">
              {paymentType}
            </span>
            <div className="mt-[15px]">
              <h4 className="font-inter font-medium text-[19.2px] leading-6 text-[#24292E] mb-[5px]">
                {name}
              </h4>
              <p className="text-[#363E45] text-[13.5px] leading-5 mb-[7px]">
                {location}
              </p>
              <p className="text-[#24292E] font-normal font-inter text-[15px] leading-5 line-clamp-2">
                {description}
              </p>
            </div>
          </div>
        </div>
        <div className="h-[20px] w-full bg-black"></div>
      </div>
    </Link>
  );
};

export default Child;
