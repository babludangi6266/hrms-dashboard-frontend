import React, { useState, useEffect } from "react";
import axios from "axios";
import { supabase } from "../components/supabaseClient";
import { FaDownload, FaTrash } from "react-icons/fa";
import "./../styles/Candidates.css";

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCandidate, setNewCandidate] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    department: "",
    experience: "",
    resume: null,
  });

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/candidates");
      setCandidates(response.data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setNewCandidate({
      fullName: "",
      emailAddress: "",
      phoneNumber: "",
      department: "",
      experience: "",
      resume: null,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCandidate({ ...newCandidate, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewCandidate({ ...newCandidate, resume: e.target.files[0] });
  };

  const handleAddCandidate = async () => {
    try {
      if (!newCandidate.resume) {
        alert("Please select a resume file.");
        return;
      }

      const { data, error } = await supabase.storage
        .from("resume")
        .upload(`resumes/${newCandidate.resume.name}`, newCandidate.resume);

      if (error) {
        console.error("Supabase upload error:", error);
        throw error;
      }

      const resumeUrl = `https://ombxdtljhgrhoyvilyjt.supabase.co/storage/v1/object/public/resume/${data.path}`;

      const candidateDetails = {
        fullName: newCandidate.fullName,
        emailAddress: newCandidate.emailAddress,
        phoneNumber: newCandidate.phoneNumber,
        department: newCandidate.department,
        experience: newCandidate.experience,
        resumeUrl,
        status: "New",
      };

      await axios.post("http://localhost:5000/api/candidates", candidateDetails);

      fetchCandidates();
      handleCloseModal();
    } catch (error) {
      console.error("Error adding candidate:", error);
    }
  };

  const handleSaveAsEmployee = async (candidate) => {
    try {
      const employeeDetails = {
        fullName: candidate.fullName,
        emailAddress: candidate.emailAddress,
        phoneNumber: candidate.phoneNumber,
        department: candidate.department,
        experience: candidate.experience,
      };

      await axios.post("http://localhost:5000/api/employees", employeeDetails);

      alert(`${candidate.fullName} has been saved as an employee.`);
    } catch (error) {
      console.error("Error saving as employee:", error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/candidates/${id}`, { status });
      fetchCandidates();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDeleteCandidate = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/candidates/${id}`);
      fetchCandidates();
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  };

  return (
    <div className="candidates-page">
      <header className="header">
        <h1>Candidates</h1>
        <button className="add-button" onClick={handleOpenModal}>
          Add New Candidate
        </button>
      </header>
      <table className="candidates-table">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Check</th>
            <th>Full Name</th>
            <th>Email Address</th>
            <th>Phone Number</th>
            <th>Department</th>
            <th>Experience</th>
            <th>Status</th>
            <th>Resume</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, index) => (
            <tr key={candidate._id}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleSaveAsEmployee(candidate)}
                />
              </td>
              <td>{candidate.fullName}</td>
              <td>{candidate.emailAddress}</td>
              <td>{candidate.phoneNumber}</td>
              <td>{candidate.department}</td>
              <td>{candidate.experience}</td>
              <td>
                <select
                  value={candidate.status}
                  onChange={(e) => handleStatusChange(candidate._id, e.target.value)}
                >
                  <option value="New">New</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Ongoing">Ongoing</option>
                </select>
              </td>
              <td>
                <a href={candidate.resumeUrl} target="_blank" rel="noopener noreferrer">
                <FaDownload />
                </a>
              </td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteCandidate(candidate._id)}
                >
                   <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Candidate</h2>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={newCandidate.fullName}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="emailAddress"
              placeholder="Email Address"
              value={newCandidate.emailAddress}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={newCandidate.phoneNumber}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={newCandidate.department}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="experience"
              placeholder="Experience"
              value={newCandidate.experience}
              onChange={handleInputChange}
            />
            <input type="file" name="resume" onChange={handleFileChange} />
            <div className="modal-actions">
              <button onClick={handleCloseModal}>Cancel</button>
              <button onClick={handleAddCandidate}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Candidates;
