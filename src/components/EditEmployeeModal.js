import React, { useState } from "react";
import "./../styles/EditEmployeeModal.css";

const EditEmployeeModal = ({ employee, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    fullName: employee.fullName || "",
    emailAddress: employee.emailAddress || "",
    phoneNumber: employee.phoneNumber || "",
    department: employee.department || "",
    role: employee.role || "",
    dateOfJoining: employee.dateOfJoining
      ? employee.dateOfJoining.slice(0, 10) 
      : "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    if (
      !formData.fullName ||
      !formData.emailAddress ||
      !formData.phoneNumber ||
      !formData.department ||
      !formData.role ||
      !formData.dateOfJoining
    ) {
      setError("All fields are required.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave({ ...employee, ...formData }); 
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Employee Details</h2>
        {error && <p className="error-message">{error}</p>}
        <form>
          <div className="form-row">
            <div className="form-group">
              <label>Full Name*</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email Address*</label>
              <input
                type="email"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Phone Number*</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Department*</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Position*</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Date of Joining*</label>
              <input
                type="date"
                name="dateOfJoining"
                value={formData.dateOfJoining}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </form>
        <div className="modal-actions">
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
