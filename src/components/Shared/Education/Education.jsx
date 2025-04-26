import React, { useState, useEffect } from "react";
import { apiRoot } from "../../../api/apiRoot";
import { IoAddOutline } from "react-icons/io5";
import { MdEdit, MdDelete } from "react-icons/md";
import SkillModal from "../../ui/Modal/skill-modal";
import { toast } from "react-toastify";
import Title from "../Title/Title";
import rightIcon from "../../../assets/svg/right.svg";

const Education = () => {
  const [showMore, setShowMore] = useState(false);
  const [openEducation, setOpenEducation] = useState(false);
  const [editEducationModal, setEditEducationModal] = useState(false); // For edit modal
  const [education, setEducation] = useState([]);
  const [institution, setInstitution] = useState("");
  const [degree, setDegree] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [educationType, setEducationType] = useState("");
  const [description, setDescription] = useState("");
  const [currentEducationId, setCurrentEducationId] = useState(null); // Track the education ID being edited
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteEducationId, setDeleteEducationId] = useState(null);
  const token = localStorage.getItem("accessToken");

  const getEducation = async () => {
    try {
      const res = await apiRoot.get("/education", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setEducation(res?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getEducation();
  }, []);

  const handlePostEducation = async (e) => {
    e.preventDefault();

    const data = {
      institution,
      degree,
      field_of_study: fieldOfStudy,
      start_date: new Date(startDate).toISOString(),
      end_date: new Date(endDate).toISOString(),
      education_type: educationType,
      description,
    };

    try {
      await apiRoot.post("/education", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      getEducation();
      toast.success("Education successfully added!");
      setOpenEducation(false);
      setInstitution("");
      setDegree("");
      setFieldOfStudy("");
      setStartDate("");
      setEndDate("");
      setEducationType("");
      setDescription("");
    } catch (err) {
      console.log(err);
      toast.error("Failed to add education");
    }
  };

  const handleEditEducation = (educationId) => {
    const selectedEducation = education.find((edu) => edu.id === educationId);

    if (selectedEducation) {
      setInstitution(selectedEducation.institution);
      setDegree(selectedEducation.degree);
      setFieldOfStudy(selectedEducation.field_of_study);
      setStartDate(new Date(selectedEducation.start_date));
      setEndDate(new Date(selectedEducation.end_date));
      setEducationType(selectedEducation.education_type);
      setDescription(selectedEducation.description);
      setCurrentEducationId(educationId); // Store the ID of the education being edited
      setEditEducationModal(true); // Open the edit modal
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const data = {
      institution,
      degree,
      field_of_study: fieldOfStudy,
      start_date: new Date(startDate).toISOString(),
      end_date: new Date(endDate).toISOString(),
      education_type: educationType,
      description,
    };

    try {
      await apiRoot.patch(`/education/${currentEducationId}`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Education successfully updated!");
      setEditEducationModal(false);
      getEducation();
    } catch (err) {
      console.log(err);
      toast.error("Failed to update education");
    }
  };

  const handleDeleteEducation = async () => {
    try {
      await apiRoot.delete(`/education/${deleteEducationId}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Successfully deleted");
      setDeleteModal(false);
      getEducation();
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete");
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <section className="bg-white shadow-sm shadow-gray-300 p-6 mb-4">
        <div className="mb-6 flex items-center justify-between">
          <Title title={"Education"} />
          <button onClick={() => setOpenEducation(true)}>
            <IoAddOutline className="w-6 h-6" />
          </button>
        </div>

        <div>
          {education?.map(
            ({
              id,
              description,
              institution,
              degree,
              field_of_study,
              start_date,
              end_date,
            }) => (
              <div className="mb-6 flex items-start justify-between" key={id}>
                <div>
                  <h3 className="text-[24px] font-semibold">
                    {field_of_study}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#1D1C1C]">{institution}</span>
                    <p className="text-[#313D44] text-[12px]">
                      {`${formatDate(start_date)} - ${formatDate(end_date)}`}
                    </p>
                  </div>
                  <p className="text-[#313D44] text-[12px]">{description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={() => handleEditEducation(id)}>
                    <MdEdit className="w-4 h-4" />
                  </button>
                  <button onClick={() => setDeleteEducationId(id)}>
                    <MdDelete className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          )}
        </div>

        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setShowMore(!showMore)}
        >
          <p className="text-[#313D44] text-[16px]">
            {showMore ? "Show less" : "Show more"}
          </p>
          <img src={rightIcon} alt="rightIcon" width={28} height={16} />
        </div>
      </section>

      {openEducation && (
        <SkillModal close={() => setOpenEducation(false)}>
          <div className="bg-white rounded-[8px] p-4">
            <h1 className="mb-3 font-semibold text-[25px]">Add Education</h1>
            <form
              className="flex flex-col gap-2"
              onSubmit={handlePostEducation}
            >
              <input
                type="text"
                placeholder="Institution"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                required
                className="p-2 border rounded-[8px]"
              />
              <input
                type="text"
                placeholder="Degree"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                required
                className="p-2 border rounded-[8px]"
              />
              <input
                type="text"
                placeholder="Field of Study"
                value={fieldOfStudy}
                onChange={(e) => setFieldOfStudy(e.target.value)}
                required
                className="p-2 border rounded-[8px]"
              />
              <input
                type="date"
                placeholder="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="p-2 border rounded-[8px]"
              />
              <input
                type="date"
                placeholder="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className="p-2 border rounded-[8px]"
              />
              <input
                type="text"
                placeholder="Education Type"
                value={educationType}
                onChange={(e) => setEducationType(e.target.value)}
                required
                className="p-2 border rounded-[8px]"
              />
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="p-2 border rounded-[8px]"
              />
              <button
                type="submit"
                className="bg-black p-2 rounded-[8px] text-white"
              >
                Save Education
              </button>
            </form>
          </div>
        </SkillModal>
      )}

      {editEducationModal && (
        <SkillModal close={() => setEditEducationModal(false)}>
          <div className="bg-white rounded-[8px] p-4">
            <h1 className="mb-3 font-semibold text-[25px]">Edit Education</h1>
            <form className="flex flex-col gap-2" onSubmit={handleEditSubmit}>
              <input
                type="text"
                placeholder="Institution"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                required
                className="p-2 border rounded-[8px]"
              />
              <input
                type="text"
                placeholder="Degree"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                required
                className="p-2 border rounded-[8px]"
              />
              <input
                type="text"
                placeholder="Field of Study"
                value={fieldOfStudy}
                onChange={(e) => setFieldOfStudy(e.target.value)}
                required
                className="p-2 border rounded-[8px]"
              />
              <input
                type="date"
                placeholder="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="p-2 border rounded-[8px]"
              />
              <input
                type="date"
                placeholder="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className="p-2 border rounded-[8px]"
              />
              <input
                type="text"
                placeholder="Education Type"
                value={educationType}
                onChange={(e) => setEducationType(e.target.value)}
                required
                className="p-2 border rounded-[8px]"
              />
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="p-2 border rounded-[8px]"
              />
              <button
                type="submit"
                className="bg-black p-2 rounded-[8px] text-white"
              >
                Save Changes
              </button>
            </form>
          </div>
        </SkillModal>
      )}

      {deleteModal && (
        <SkillModal close={() => setDeleteModal(false)}>
          <div className="bg-white rounded-[8px] p-4">
            <h1 className="mb-3 font-semibold text-[25px]">Delete Education</h1>
            <div className="flex items-center justify-between">
              <button
                onClick={handleDeleteEducation}
                className="bg-red-500 text-white p-2 rounded-[8px]"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteModal(false)}
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

export default Education;
