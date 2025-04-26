import React from "react";

const CategoryOptions = [
  "select category",
  "tech",
  "education",
  "health",
  "environment",
  "arts",
];
const OpportunityTypeOptions = [
  "select type",
  "internship",
  "volunteering",
  "part-time",
  "full-time",
];

const experienceLevelOptions = [
  "select experience",
  "no_experience",
  "junior",
  "middle",
  "senior",
];

const paymentTypeOptions = ["select payment type", "paid", "unpaid"];

const Form = ({
  setCategory,
  category,
  setOpportunityType,
  opportunityType,
  location,
  setLocation,
  experienceLevel,
  setExperienceLevel,
  paymentType,
  setPaymentType,
  setSearch,
}) => {
  const handleClear = () => {
    setCategory("");
    setOpportunityType("");
    setLocation("");
    setExperienceLevel("");
    setPaymentType("");
    setSearch("");
  };
  return (
    <div className="max-w-[321px] w-full bg-white rounded-[16px] px-4 pt-4 pb-[129px] flex-shrink-0 h-fit mt-12">
      <div className="text-center">
        <p
          className="font-inter cursor-pointer font-normal text-[13px] leading-[40px] text-[#363E45] underline"
          onClick={handleClear}
        >
          Clear
        </p>
      </div>

      <form>
        <div className="mb-[15px]">
          <label
            className="text-[#24292E] font-inter font-normal text-[15px] leading-4"
            htmlFor=""
          >
            Category
          </label>
          <div className="flex items-center justify-between mt-2">
            <select
              className="border border-grey w-full h-[40px] rounded-[12px]"
              onChange={(e) =>
                setCategory(
                  e.target.value === "select category" ? "" : e.target.value
                )
              }
            >
              {CategoryOptions.map((c) => {
                return (
                  <option value={c} selected={category === c} key={c}>
                    {c}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="mb-[15px]">
          <label
            className="text-[#24292E] font-inter font-normal text-[15px] leading-4"
            htmlFor=""
          >
            Type
          </label>
          <div className="flex items-center justify-between mt-2">
            <select
              className="border border-grey w-full h-[40px] rounded-[12px]"
              onChange={(e) =>
                setOpportunityType(
                  e.target.value === "select type" ? "" : e.target.value
                )
              }
            >
              {OpportunityTypeOptions.map((c) => {
                return (
                  <option value={c} selected={opportunityType === c} key={c}>
                    {c}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="mb-[15px]">
          <label
            className="text-[#24292E] font-inter font-normal text-[15px] leading-4"
            htmlFor=""
          >
            Location
          </label>
          <div className="flex items-center justify-between mt-2">
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border border-grey w-full h-[40px] rounded-[12px]"
              type="text"
              placeholder="Type location"
            />
          </div>
        </div>

        <div className="mb-[15px]">
          <label
            className="text-[#24292E] font-inter font-normal text-[15px] leading-4"
            htmlFor=""
          >
            Experience
          </label>
          <div className="flex items-center justify-between mt-2">
            <select
              className="border border-grey w-full h-[40px] rounded-[12px]"
              onChange={(e) =>
                setExperienceLevel(
                  e.target.value === "select experience" ? "" : e.target.value
                )
              }
            >
              {experienceLevelOptions.map((c) => {
                return (
                  <option value={c} selected={experienceLevel === c} key={c}>
                    {c}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="mb-[15px]">
          <label
            className="text-[#24292E] font-inter font-normal text-[15px] leading-4"
            htmlFor=""
          >
            Payment Type
          </label>
          <div className="flex items-center justify-between mt-2">
            <select
              className="border border-grey w-full h-[40px] rounded-[12px]"
              onChange={(e) =>
                setPaymentType(
                  e.target.value === "select payment type" ? "" : e.target.value
                )
              }
            >
              {paymentTypeOptions.map((c) => {
                return (
                  <option value={c} selected={paymentType === c} key={c}>
                    {c}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
