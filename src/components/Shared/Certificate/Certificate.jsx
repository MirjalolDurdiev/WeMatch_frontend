import React, { useState, useEffect } from "react";
import { apiRoot } from "../../../api/apiRoot";
import rightIcon from "../../../assets/svg/right.svg";
import { IoAddOutline } from "react-icons/io5";
import { MdEdit, MdDelete } from "react-icons/md";
import Title from "../Title/Title";
import SkillModal from "../../ui/Modal/skill-modal";
import { toast } from "react-toastify";

const Certificate = () => {
  const [showMore, setShowMore] = useState(false);
  const [openPostCertificate, setOpenPostCertificate] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [certificate, setCertificate] = useState([]);
  const [newCertificate, setNewCertificate] = useState({
    certificate_name: "",
    issued_by: "",
    issue_date: "",
    image: null,
  });
  const [editCertificate, setEditCertificate] = useState({
    certificate_name: "",
    issued_by: "",
    issue_date: "",
    image: null,
    id: null,
  });
  const [deleteCertificateId, setDeleteCertificateId] = useState(null);

  const token = localStorage.getItem("accessToken");

  const getCertificate = async () => {
    try {
      const res = await apiRoot.get("/certificates", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCertificate(res?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCertificate();
  }, []);

  const handleAddCertificate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("certificate_name", newCertificate.certificate_name);
      formData.append("issued_by", newCertificate.issued_by);
      formData.append("issue_date", newCertificate.issue_date);
      formData.append("image", newCertificate.image);

      await apiRoot.post("/certificates", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Certificate added successfully!");
      setOpenPostCertificate(false);
      setNewCertificate({
        certificate_name: "",
        issued_by: "",
        issue_date: "",
        image: null,
      });
      getCertificate();
    } catch (error) {
      console.error("Add certificate error:", error);
    }
  };

  const handleEditModalOpen = (cert) => {
    setEditCertificate(cert);
    setOpenEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("certificate_name", editCertificate.certificate_name);
      formData.append("issued_by", editCertificate.issued_by);
      formData.append("issue_date", editCertificate.issue_date);
      if (editCertificate.image) {
        formData.append("image", editCertificate.image);
      }

      await apiRoot.patch(`/certificates/${editCertificate.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Certificate updated successfully!");
      setOpenEditModal(false);
      getCertificate();
    } catch (error) {
      console.error("Edit certificate error:", error);
      toast.error("Failed to update certificate");
    }
  };

  const handleDeleteConfirmation = (id) => {
    setDeleteCertificateId(id);
    setOpenDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await apiRoot.delete(`/certificates/${deleteCertificateId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Certificate deleted successfully!");
      setOpenDeleteModal(false);
      getCertificate();
    } catch (error) {
      console.error("Delete certificate error:", error);
      toast.error("Failed to delete certificate");
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
          <Title title={"Certificates"} />
          <button onClick={() => setOpenPostCertificate(true)}>
            <IoAddOutline className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          {(showMore ? certificate : certificate.slice(0, 2)).map(
            ({ id, image, issued_by, issue_date, certificate_name }) => (
              <div
                className="mb-4 flex items-start justify-between gap-6"
                key={id}
              >
                <div className="flex gap-4">
                  <img
                    src={`http://localhost:3000/images/${image}`}
                    alt="certificate"
                    className="w-[100px] h-[100px] object-cover rounded-md"
                  />
                  <div>
                    <h3 className="text-[24px] font-medium">
                      {certificate_name}
                    </h3>
                    <p className="text-[16px] text-gray-700">{issued_by}</p>
                    <p className="text-[14px] text-gray-500">
                      {formatDate(issue_date)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleEditModalOpen({
                        id,
                        certificate_name,
                        issued_by,
                        issue_date,
                      })
                    }
                  >
                    <MdEdit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDeleteConfirmation(id)}>
                    <MdDelete className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          )}
        </div>

        {certificate.length > 1 && (
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

      {openPostCertificate && (
        <SkillModal close={() => setOpenPostCertificate(false)}>
          <div className="bg-white rounded-[8px] p-4 w-[400px]">
            <h1 className="mb-3 font-semibold text-[22px]">Add Certificate</h1>
            <form
              className="flex flex-col gap-4"
              onSubmit={handleAddCertificate}
            >
              <input
                type="text"
                placeholder="Certificate Name"
                value={newCertificate.certificate_name}
                onChange={(e) =>
                  setNewCertificate({
                    ...newCertificate,
                    certificate_name: e.target.value,
                  })
                }
                required
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Issued By"
                value={newCertificate.issued_by}
                onChange={(e) =>
                  setNewCertificate({
                    ...newCertificate,
                    issued_by: e.target.value,
                  })
                }
                required
                className="border p-2 rounded"
              />
              <input
                type="date"
                value={newCertificate.issue_date}
                onChange={(e) =>
                  setNewCertificate({
                    ...newCertificate,
                    issue_date: e.target.value,
                  })
                }
                required
                className="border p-2 rounded"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setNewCertificate({
                    ...newCertificate,
                    image: e.target.files[0],
                  })
                }
                required
                className="border p-2 rounded"
              />
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setOpenPostCertificate(false)}
                  className="bg-gray-200 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </SkillModal>
      )}

      {openEditModal && (
        <SkillModal close={() => setOpenEditModal(false)}>
          <div className="bg-white rounded-[8px] p-4 w-[400px]">
            <h1 className="mb-3 font-semibold text-[22px]">Edit Certificate</h1>
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                value={editCertificate.certificate_name}
                onChange={(e) =>
                  setEditCertificate({
                    ...editCertificate,
                    certificate_name: e.target.value,
                  })
                }
                required
                className="border p-2 rounded"
              />
              <input
                type="text"
                value={editCertificate.issued_by}
                onChange={(e) =>
                  setEditCertificate({
                    ...editCertificate,
                    issued_by: e.target.value,
                  })
                }
                required
                className="border p-2 rounded"
              />
              <input
                type="date"
                value={editCertificate.issue_date}
                onChange={(e) =>
                  setEditCertificate({
                    ...editCertificate,
                    issue_date: e.target.value,
                  })
                }
                required
                className="border p-2 rounded"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setEditCertificate({
                    ...editCertificate,
                    image: e.target.files[0],
                  })
                }
                className="border p-2 rounded"
              />
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setOpenEditModal(false)}
                  className="bg-gray-200 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </SkillModal>
      )}

      {openDeleteModal && (
        <SkillModal close={() => setOpenDeleteModal(false)}>
          <div className="bg-white rounded-[8px] p-4 w-[400px]">
            <h1 className="mb-3 font-semibold text-[22px]">
              Delete Certificate?
            </h1>
            <p>Are you sure you want to delete this certificate?</p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                type="button"
                onClick={() => setOpenDeleteModal(false)}
                className="bg-gray-200 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded"
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

export default Certificate;
