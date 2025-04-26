import React, { useEffect } from "react";
import Child from "./Child/Child";
import Form from "./Form/Form";
import { apiRoot } from "../../../api/apiRoot";

const Search = ({ search, setSearch }) => {
  const [opportunities, setOpportunities] = React.useState([]);
  const token = localStorage.getItem("accessToken");
  const [category, setCategory] = React.useState("");
  const [opportunityType, setOpportunityType] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [experienceLevel, setExperienceLevel] = React.useState("");
  const [paymentType, setPaymentType] = React.useState("");

  const getOpportunities = async () => {
    try {
      const params = {};

      if (search) {
        params.name = search;
      }
      if (category) {
        params.category = category;
      }
      if (opportunityType) {
        params.opportunityType = opportunityType;
      }

      if (location) {
        params.location = location;
      }

      if (experienceLevel) {
        params.experienceLevel = experienceLevel;
      }

      if (paymentType) {
        params.paymentType = paymentType;
      }

      const res = await apiRoot.get("/opportunities/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      });
      setOpportunities(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOpportunities();
  }, [
    search,
    category,
    opportunityType,
    location,
    experienceLevel,
    paymentType,
  ]);

  return (
    <div>
      <div className="flex justify-between gap-[32px]">
        <div className="w-full">
          <div className="mb-6">
            <h4 className="font-inter text-[19px] leading-[24px]">
              Found results: {opportunities?.length}
            </h4>
          </div>
          <div>
            {opportunities?.map((item) => {
              const { id, image, name, description, location, paymentType } =
                item;
              return (
                <Child
                  key={id}
                  id={id}
                  image={image}
                  name={name}
                  description={description}
                  location={location}
                  paymentType={paymentType}
                />
              );
            })}
          </div>
        </div>
        <Form
          setCategory={setCategory}
          category={category}
          setOpportunityType={setOpportunityType}
          opportunityType={opportunityType}
          setLocation={setLocation}
          location={location}
          experienceLevel={experienceLevel}
          setExperienceLevel={setExperienceLevel}
          paymentType={paymentType}
          setPaymentType={setPaymentType}
          setSearch={setSearch}
        />
      </div>
    </div>
  );
};

export default Search;
