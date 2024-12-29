import React, { useState, useEffect } from "react";
import axios from "axios";
import EditEmployeeModal from "../components/EditEmployeeModal";
import "./../styles/EmployeeList.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Fetch the employee list
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("https://hrms-dasboard-backend.onrender.com/api/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // Handle search input changes
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Filter employees based on search input
  const filteredEmployees = employees.filter((employee) =>
    `${employee.fullName} ${employee.department} ${employee.role}`
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  // Open the edit modal for a specific employee
  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  // Close the modal
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  // Save the edited employee details
  const handleSave = async (updatedEmployee) => {
    try {
      await axios.put(
        `https://hrms-dasboard-backend.onrender.com/api/employees/${updatedEmployee._id}`,
        updatedEmployee
      );
      console.log("Employee updated successfully.");
      fetchEmployees(); // Refresh employee list
      handleModalClose();
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  // Delete the employee
  const handleDelete = async (employeeId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this employee?"
      );
      if (confirmDelete) {
        await axios.delete(`https://hrms-dasboard-backend.onrender.com/api/employees/${employeeId}`);
        console.log("Employee deleted successfully.");
        fetchEmployees(); // Refresh employee list after deletion
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="employee-container">
      <header className="employee-header">
        <h1>Employees</h1>
        <div className="employee-actions">
          <input
            type="text"
            placeholder="Search by name, department, or role"
            value={filter}
            onChange={handleFilterChange}
            className="search-bar"
          />
        </div>
      </header>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Profile</th>
            <th>Employee Name</th>
            <th>Email Address</th>
            <th>Phone Number</th>
            <th>Position</th>
            <th>Department</th>
            <th>Date Of Joining</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>
                <img
                  src={`https://ui-avatars.com/api/?name=${employee.fullName}`}
                  alt="Profile"
                  className="profile-picture"
                />
              </td>
              <td>{employee.fullName}</td>
              <td>{employee.emailAddress}</td>
              <td>{employee.phoneNumber}</td>
              <td>{employee.role || "N/A"}</td>
              <td>{employee.department}</td>
              <td>{employee.dateOfJoining || "N/A"}</td>
              <td>
                <div className="actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEditClick(employee)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(employee._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render the Edit Employee Modal */}
      {isModalOpen && selectedEmployee && (
        <EditEmployeeModal
          employee={selectedEmployee}
          onClose={handleModalClose}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default EmployeeList;
