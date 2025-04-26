import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // This is to fetch the ID from URL
import { apiRoot } from "../../api/apiRoot"; // API utility to fetch opportunity details
import { toast } from "react-toastify";

const OpportunityDetail = () => {
  const { id } = useParams(); // Extract the opportunity ID from the URL
  const [opportunity, setOpportunity] = useState(null);
  const [message, setMessage] = useState(""); // For the successful application message
  const token = localStorage.getItem("accessToken");
  const [opportunities, setOpportunities] = useState([]);

  // Fetch opportunity details using the ID from the URL
  useEffect(() => {
    const fetchOpportunityDetails = async () => {
      try {
        const res = await apiRoot.get(`/opportunities/byUser/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOpportunity(res?.data); // Assuming the response has a `data` object with the opportunity details
      } catch (err) {
        console.log("Error fetching opportunity details:", err);
      }
    };

    fetchOpportunityDetails();
  }, [id, token]);

  const handleApply = () => {
    toast.success("You have successfully applied.");
  };

  const getOpportunities = async () => {
    try {
      const res = await apiRoot.get("/opportunities/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOpportunities(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOpportunities();
  }, []);

  return (
    <div className="max-w-[1336px] w-full mx-auto px-5 py-10 flex justify-between md:flex-row flex-col">
      <div className="flex-1 p-6 rounded-[24px] mb-[50px] ">
        {/* Opportunity Image */}
        <img
          className="w-full aspect-[16/9] object-cover rounded-[24px] mb-6"
          src={"http://localhost:3000/images/" + opportunity?.image}
          alt="job image"
        />
        {/* Opportunity Title and Salary */}
        <div>
          <h3 className="text-[#2a3137] mb-2 text-4xl font-bold">
            {opportunity?.name}
          </h3>
        </div>

        {/* Opportunity Details */}
        <div className="mb-6">
          <p className="text-black text-[16px] mb-[5px] capitalize">
            <b>Salary:</b> {opportunity?.paymentType}
          </p>
          <p className="text-black text-[16px] mb-[5px]">
            <b>Experience Level:</b>{" "}
            {opportunity?.experienceLevel == "no_experience"
              ? "Not required"
              : opportunity?.experienceLevel}
          </p>
          <p className="text-black text-[16px] mb-[5px] capitalize">
            <b>Opportunity Type:</b> {opportunity?.opportunityType}
          </p>
          <p className="text-black text-[16px] mb-[5px]">
            <b>Location:</b> {opportunity?.location}
          </p>
          <p className="text-black text-[16px] mb-[5px] capitalize">
            <b>Category:</b> {opportunity?.category}
          </p>
          <p className="text-black text-[16px] mb-[5px] max-w-[795px]">
            {opportunity?.description}
          </p>
        </div>

        {/* Apply, Contact, and Like Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleApply}
            className="w-full bg-black text-white uppercase rounded-lg py-3 font-bold text-base border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition"
          >
            Apply Now
          </button>
        </div>
      </div>
      <div className="w-full max-w-[600px] p-6 rounded-[24px] flex flex-col gap-4 sm:max-w-[400px] mx-auto">
        <h3 className="font-bold text-xl">Related Vacancies</h3>
        <div className="flex flex-col gap-4 max-h-[500px] overflow-y-scroll sm:w-full">
          {opportunities.map((item) => (
            <div
              key={item.id}
              className="bg-gray-200 p-4 rounded-lg cursor-pointer sm:w-full"
              onClick={() => {
                window.location.href = `/cardsid/${item.id}`;
              }}
            >
              <h4 className="text-lg font-semibold">{item.name}</h4>
              <p>{item.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OpportunityDetail;
