import React from "react";
import { Link } from "react-router-dom";

const Item = ({
  image,
  name,
  description,
  paymentType,
  time,
  experience,
  location,
  handleViewDetails,
  opportunityType,
  id,
}) => {
  return (
    <div className="max-w-[416px] w-full bg-white shadow shadow-gray-400 rounded-2xl mx-auto hover:shadow-lg transition  duration-300 ease-in-out">
      <img
        className="rounded-t-2xl w-full h-[200px] object-cover"
        src={"http://localhost:3000/images/" + image}
        alt="image"
      />
      <div className="p-5">
        <div className="mb-6">
          <h3 className="text-black font-bold text-2xl leading-tight mb-2">
            {name}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-1">{location}</p>
        </div>
        <input
          type="range"
          className="w-full h-3 bg-gray-100 rounded-lg appearance-none cursor-pointer
             [&::-webkit-slider-runnable-track]:bg-orange-500
             [&::-webkit-slider-runnable-track]:h-3 [&::-webkit-slider-runnable-track]:rounded-lg
             [&::-webkit-slider-thumb]:appearance-none
             [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
             [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:rounded-full
             [&::-webkit-slider-thumb]:mt-[-2px] [&::-moz-range-track]:bg-orange-500
             [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4
             [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:rounded-full"
        />

        <div className="flex flex-wrap justify-between mb-6">
          <div className="w-full flex items-center justify-between">
            <p className="font-medium text-lg capitalize">
              Payment: {paymentType}
            </p>
            <p className="text-gray-500 text-sm capitalize">
              {opportunityType}
            </p>
          </div>
        </div>

        <button
          className="w-full bg-black text-white uppercase rounded-lg py-3 font-bold text-base border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition"
          onClick={handleViewDetails}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default Item;
