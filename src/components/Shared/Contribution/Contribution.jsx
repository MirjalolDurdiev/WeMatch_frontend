import React, { useState, useEffect } from "react";
import { apiRoot } from "../../../api/apiRoot";
import { IoAddOutline } from "react-icons/io5";
import { MdEdit, MdDelete } from "react-icons/md";
import SkillModal from "../../ui/Modal/skill-modal";
import { toast } from "react-toastify";
import Title from "../Title/Title";
import rightIcon from "../../../assets/svg/right.svg";
import { formatDateForBackend } from "../../../utils/date.utils";

const Contribution = () => {
  const [showMore, setShowMore] = useState(false);
  const [openPostContribution, setOpenPostContribution] = useState(false);
  const [editContributionModal, setEditContributionModal] = useState(false); // For edit modal
  const [companyName, setCompanyName] = useState("");
  const [posistion, setPosistion] = useState("");
  const [contributionDescription, setContributionDescription] = useState("");
  const [contributionStartdate, setContributionStartdate] = useState("");
  const [contributionEndDate, setContributionEndDate] = useState("");
  const [isCurrent, setIsCurrent] = useState(false);
  const [deleteContributionModal, setDeleteContributionModal] = useState(false);
  const [deleteContributionId, setDeleteContributionId] = useState(null);
  const [contribution, setContribution] = useState([]);
  const [currentContributionId, setCurrentContributionId] = useState(null); // Track the contribution ID being edited
  const token = localStorage.getItem("accessToken");

  console.log("contributionStartdate", contributionStartdate);
  const getContribution = async () => {
    try {
      const res = await apiRoot.get("/contribution-history", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setContribution(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getContribution();
  }, []);

  const postContribution = async (e) => {
    e.preventDefault();

    const data = {
      company_name: companyName,
      position: posistion,
      description: contributionDescription,
      start_date: contributionStartdate,
      end_date: contributionEndDate,
      is_current: isCurrent,
    };

    try {
      const res = await apiRoot.post("contribution-history", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      getContribution();
      setOpenPostContribution(false);
      setCompanyName("");
      setPosistion("");
      setContributionDescription("");
      setContributionStartdate("");
      setContributionEndDate("");
      setIsCurrent(false);
      toast.success("Successfully added");
    } catch (err) {
      console.log(err);
      toast.error("Failed to post");
    }
  };

  const handleDeleteContribution = async () => {
    try {
      const res = await apiRoot.delete(
        `/contribution-history/${deleteContributionId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDeleteContributionModal(false);
      toast.success("Successfully deleted");
      getContribution();
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete");
    }
  };

  const deleteIndexContribution = (id) => {
    setDeleteContributionModal(true);
    setDeleteContributionId(id);
  };

  const handleEditContribution = (contributionId) => {
    const selectedContribution = contribution.find(
      (contrib) => contrib.id === contributionId
    );

    if (selectedContribution) {
      setCompanyName(selectedContribution.company_name);
      setPosistion(selectedContribution.position);
      setContributionDescription(selectedContribution.description);
      setContributionStartdate(selectedContribution.start_date);
      setContributionEndDate(selectedContribution.end_date);
      setIsCurrent(selectedContribution.is_current);
      setCurrentContributionId(contributionId);
      setEditContributionModal(true); // Open the edit modal
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const data = {
      company_name: companyName,
      position: posistion,
      description: contributionDescription,
      start_date: formatDateForBackend(contributionStartdate),
      end_date: formatDateForBackend(contributionEndDate),
      is_current: isCurrent,
    };

    try {
      await apiRoot.patch(
        `/contribution-history/${currentContributionId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Contribution successfully updated!");
      setEditContributionModal(false);
      getContribution();
    } catch (err) {
      console.log(err);
      toast.error("Failed to update contribution");
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const displayedContributions =
    contribution.length <= 1
      ? contribution
      : showMore
      ? contribution
      : contribution.slice(0, 2);

  return (
    <>
      <section className="bg-white shadow-sm shadow-gray-300 p-6">
        <div className="mb-6 flex items-center justify-between">
          <Title title={"Contribution"} />
          <button onClick={() => setOpenPostContribution(true)}>
            <IoAddOutline className="w-6 h-6" />
          </button>
        </div>

        <div>
          {displayedContributions?.map(
            ({
              id,
              company_name,
              description,
              start_date,
              end_date,
              position,
            }) => (
              <div className="mb-6 flex items-start justify-between" key={id}>
                <div>
                  <h3 className="font-inter font-normal text-black leading-[32px] text-[24px] mb-2">
                    {position}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#1D1C1C] font-inter font-normal text-4 leading-6">
                      {company_name}
                    </span>
                    <p className="text-[#313D44] font-inter font-normal text-[12px] leading-4">
                      {`${formatDate(start_date)} - ${formatDate(end_date)}`}
                    </p>
                  </div>
                  <p className="text-black font-inter font-normal text-[12px] leading-[100%]">
                    {description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleEditContribution(id)}>
                    <MdEdit className="w-4 h-4" />
                  </button>
                  <button onClick={() => deleteIndexContribution(id)}>
                    <MdDelete className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          )}
        </div>

        {contribution.length > 0 && (
          <div
            className="flex items-center justify-between cursor-pointer mt-4"
            onClick={() => setShowMore(!showMore)}
          >
            <p
              className={`text-[16px] font-inter font-normal leading-[24px] ${
                contribution.length <= 2
                  ? "text-gray-400 cursor-default"
                  : "text-[#313D44]"
              }`}
            >
              {showMore ? "Show less" : "Show more"}
            </p>
            <img
              src={rightIcon}
              alt="Toggle icon"
              width={28}
              height={16}
              className={`transition-transform duration-200 ${
                showMore ? "rotate-90" : ""
              }`}
            />
          </div>
        )}
      </section>

      {/* Add Contribution Modal */}
      {openPostContribution && (
        <SkillModal close={() => setOpenPostContribution(false)}>
          <div className="bg-white rounded-[8px] p-4">
            <h1 className="mb-3 font-semibold text-[25px]">Add Contribution</h1>
            <form className="flex flex-col gap-2" onSubmit={postContribution}>
              <input
                type="text"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                className="p-2 border rounded-[8px]"
              />
              <input
                type="text"
                placeholder="Position"
                value={posistion}
                onChange={(e) => setPosistion(e.target.value)}
                required
                className="p-2 border rounded-[8px]"
              />
              <input
                type="text"
                placeholder="Description"
                value={contributionDescription}
                onChange={(e) => setContributionDescription(e.target.value)}
                required
                className="p-2 border rounded-[8px]"
              />
              <input
                type="date"
                placeholder="Start Date"
                value={contributionStartdate}
                onChange={(e) => setContributionStartdate(e.target.value)}
                required
                className="p-2 border rounded-[8px]"
              />
              <input
                type="date"
                placeholder="End Date"
                value={contributionEndDate}
                onChange={(e) => setContributionEndDate(e.target.value)}
                required
                className="p-2 border rounded-[8px]"
              />
              <label className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={isCurrent}
                  onChange={(e) => setIsCurrent(e.target.checked)}
                />
                <span>Currently working here</span>
              </label>
              <button className="bg-black p-2 rounded-[8px] text-white">
                Submit
              </button>
            </form>
          </div>
        </SkillModal>
      )}

      {/* Edit Contribution Modal */}
      {editContributionModal && (
        <SkillModal close={() => setEditContributionModal(false)}>
          <div className="bg-white rounded-[8px] p-4">
            <h1 className="mb-3 font-semibold text-[25px]">
              Edit Contribution
            </h1>
            <form className="flex flex-col gap-2" onSubmit={handleEditSubmit}>
              <input
                type="text"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                className="p-2 border rounded-[8px]"
              />
              <input
                type="text"
                placeholder="Position"
                value={posistion}
                onChange={(e) => setPosistion(e.target.value)}
                required
                className="p-2 border rounded-[8px]"
              />
              <input
                type="text"
                placeholder="Description"
                value={contributionDescription}
                onChange={(e) => setContributionDescription(e.target.value)}
                required
                className="p-2 border rounded-[8px]"
              />
              <input
                type="date"
                placeholder="Start Date"
                value={contributionStartdate.split("T")[0]}
                onChange={(e) => setContributionStartdate(e.target.value)}
                required
                className="p-2 border rounded-[8px]"
              />
              <input
                type="date"
                placeholder="End Date"
                value={contributionEndDate.split("T")[0]}
                onChange={(e) => setContributionEndDate(e.target.value)}
                required
                className="p-2 border rounded-[8px]"
              />
              <label className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={isCurrent}
                  onChange={(e) => setIsCurrent(e.target.checked)}
                />
                <span>Currently working here</span>
              </label>
              <button className="bg-black p-2 rounded-[8px] text-white">
                Save Changes
              </button>
            </form>
          </div>
        </SkillModal>
      )}

      {/* Delete Contribution Confirmation Modal */}
      {deleteContributionModal && (
        <SkillModal close={() => setDeleteContributionModal(false)}>
          <div className="bg-white rounded-[8px] p-4">
            <h1 className="mb-3 font-semibold text-[25px]">
              Delete Contribution
            </h1>
            <div className="flex items-center justify-between">
              <button
                onClick={handleDeleteContribution}
                className="bg-red-500 text-white p-2 rounded-[8px]"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteContributionModal(false)}
                className="bg-gray-500 text-white p-2 rounded-[8px]"
              >
                Cancel
              </button>
            </div>
          </div>
        </SkillModal>
      )}
    </>
  );
};

export default Contribution;
