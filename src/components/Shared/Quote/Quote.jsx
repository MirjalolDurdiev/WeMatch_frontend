import React from "react";
import { data } from "../../../api/data";
import cardImage from "../../../assets/images/cardImg.png";
import profileIcon from "../../../assets/svg/profile.svg";

const Quote = () => {
  return (
    <section className="bg-[#F8F9FA] pt-[180px] pb-[120px] mb-[120px]">
      <div className="max-w-[1336px] w-full mx-auto px-[20px]">
        <div className="grid grid-cols-1 items-center gap-[60px] md:grid md:grid-cols-2">
          <div>
            <img
              className="max-w-[636px] w-full"
              src={cardImage}
              alt="cardImage"
              width={636}
              height={560}
            />
          </div>
          <div>
            <h3 className="font-bold text-[50px] leading-[100%] mb-[40px]">
              Make a Difference,
              <br />
              Gain valuable experience.
            </h3>
            <div>
              <div className="grid grid-cols-1 items-center gap-[24px] mb-[48px] md:grid md:grid-cols-2">
                {data?.map((item, index) => (
                  <div key={index}>
                    <p className="mb-3 font-normal text-4 leading-[28px font-inter text-[#00000099]">
                      {item?.title}
                    </p>
                    <p className="font-normal text-4 leading-[28px font-inter text-[#00000099]">
                      {item?.body}
                    </p>
                  </div>
                ))}
              </div>

              <div className="text-[red] flex items-center gap-[10px] cursor-pointer">
                <img src={profileIcon} alt="" />
                <div>
                  <h4 className="text-black font-semibold text-[20px] leading-6">
                    Felipe Vaughn
                  </h4>
                  <span className="text-black font-nornal text-4 leading-6">
                    Founder
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quote;
