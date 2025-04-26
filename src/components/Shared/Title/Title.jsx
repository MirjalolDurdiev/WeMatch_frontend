import React from "react";

const Title = ({ title, props }) => {
  return (
    <div {...props}>
      <h3 className="text-[#1D1C1C] font-inter font-medium text-[30px] leading-[36px]">
        {title}
      </h3>
    </div>
  );
};

export default Title;
