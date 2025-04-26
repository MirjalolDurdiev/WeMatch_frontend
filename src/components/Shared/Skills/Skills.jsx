import React, { useState, useEffect } from "react";
import { apiRoot } from "../../../api/apiRoot";
import rightIcon from "../../../assets/svg/right.svg";
import SkillModal from "../../ui/Modal/skill-modal";
import Title from "../Title/Title";
import { IoAddOutline } from "react-icons/io5";
import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [skillName, setSkillName] = useState("");
  const [level, setLevel] = useState("");
  const [postModal, setPostModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const token = localStorage.getItem("accessToken");

  const levels = ["beginner", "intermediate", "advanced", "expert"];

  const fetchSkills = async () => {
    try {
      const res = await apiRoot.get("/skills", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSkills(res?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleSkillsPost = async (e) => {
    e.preventDefault();
    if (!level) {
      toast.error("Please select a skill level.");
      return;
    }
    const data = { skill_name: skillName, level };
    try {
      await apiRoot.post("/skills", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Successfully posted");
      setSkillName("");
      setLevel("");
      setPostModal(false);
      fetchSkills();
    } catch (err) {
      toast.error("Failed to post");
      console.error(err);
    }
  };

  const openEditModal = (skill) => {
    setSkillName(skill.skill_name);
    setLevel(skill.level);
    setEditId(skill.id);
    setEditModal(true);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!level) {
      toast.error("Please select a skill level.");
      return;
    }
    const data = { skill_name: skillName, level };
    try {
      await apiRoot.patch(`/skills/${editId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Successfully edited");
      setEditModal(false);
      setSkillName("");
      setLevel("");
      setEditId(null);
      fetchSkills();
    } catch (err) {
      toast.error("Failed to edit");
      console.error(err);
    }
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await apiRoot.delete(`/skills/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Successfully deleted");
      setDeleteModal(false);
      fetchSkills();
    } catch (err) {
      toast.error("Failed to delete");
      console.error(err);
    }
  };

  return (
    <>
      <section className="bg-white shadow-sm shadow-gray-300 p-6 mb-4">
        <div className="mb-6 flex items-center justify-between">
          <Title title="Skills" />
          <button
            className="flex items-center gap-2"
            onClick={() => setPostModal(true)}
          >
            <IoAddOutline className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          {(showMore ? skills : skills.slice(0, 2)).map((skill) => (
            <div
              key={skill.id}
              className="mb-4 flex items-center justify-between"
            >
              <div>
                <h3 className="text-[24px] font-medium">{skill.skill_name}</h3>
                <p className="text-[16px] text-gray-700">{skill.level}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => openEditModal(skill)}>
                  <MdEdit className="w-4 h-4" />
                </button>
                <button onClick={() => openDeleteModal(skill.id)}>
                  <MdDelete className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {skills.length > 2 && (
          <div
            className="flex items-center justify-between cursor-pointer mt-4"
            onClick={() => setShowMore(!showMore)}
          >
            <p className="text-[#313D44] font-inter font-normal text-[16px] leading-[24px]">
              {showMore ? "Show less" : "Show more"}
            </p>
            <img
              src={rightIcon}
              alt="Toggle"
              className={`w-6 h-6 transform transition-transform duration-300 ${
                showMore ? "rotate-90" : ""
              }`}
            />
          </div>
        )}
      </section>

      {postModal && (
        <SkillModal close={() => setPostModal(false)}>
          <div className="bg-white rounded-[8px] p-4">
            <h1 className="mb-3 font-semibold text-[25px]">Add skills</h1>
            <form className="flex flex-col gap-2" onSubmit={handleSkillsPost}>
              <div>
                <label className="mb-2 block">Enter skill</label>
                <input
                  type="text"
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  placeholder="Enter skill"
                  className="p-2 border rounded-[8px] w-full border-[#130B544D] outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block">Level</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="p-2 border rounded-[8px] w-full border-[#130B544D] outline-none"
                >
                  <option value="">Select Level</option>
                  {levels.map((levelOption) => (
                    <option key={levelOption} value={levelOption}>
                      {levelOption.charAt(0).toUpperCase() +
                        levelOption.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <button className="bg-black p-2 rounded-[8px] text-white">
                Submit
              </button>
            </form>
          </div>
        </SkillModal>
      )}

      {editModal && (
        <SkillModal close={() => setEditModal(false)}>
          <div className="bg-white rounded-[8px] p-4">
            <h1 className="mb-3 font-semibold text-[25px]">Edit skills</h1>
            <form className="flex flex-col gap-2" onSubmit={handleEdit}>
              <div>
                <label className="mb-2 block">Enter skill</label>
                <input
                  type="text"
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  className="p-2 border rounded-[8px] w-full border-[#130B544D] outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block">Level</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="p-2 border rounded-[8px] w-full border-[#130B544D] outline-none"
                >
                  <option value="">Select Level</option>
                  {levels.map((levelOption) => (
                    <option key={levelOption} value={levelOption}>
                      {levelOption.charAt(0).toUpperCase() +
                        levelOption.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <button className="bg-black p-2 rounded-[8px] text-white">
                Submit
              </button>
            </form>
          </div>
        </SkillModal>
      )}

      {deleteModal && (
        <SkillModal close={() => setDeleteModal(false)}>
          <div className="bg-white rounded-[8px] p-4">
            <h1 className="mb-3 font-semibold text-[25px]">Delete skill?</h1>
            <div className="flex items-center justify-end gap-4">
              <button
                onClick={() => setDeleteModal(false)}
                className="p-2 rounded bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="p-2 rounded bg-red-500 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </SkillModal>
      )}
    </>
  );
};

export default Skills;
