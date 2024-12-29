
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../styles/Attendance.css";

const AttendanceComponent = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [editMode, setEditMode] = useState({});
  const [statusUpdates, setStatusUpdates] = useState({});
  const [taskUpdates, setTaskUpdates] = useState({});

  useEffect(() => {
    fetchEmployees();
    fetchAttendance();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchAttendance = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/attendance");
      setAttendanceData(response.data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  const handleEdit = (employeeId) => {
    setEditMode((prev) => ({ ...prev, [employeeId]: true }));
    const record = attendanceData.find(
      (item) => item.employeeId?._id === employeeId
    );
    setStatusUpdates((prev) => ({ ...prev, [employeeId]: record?.status || "" }));
    setTaskUpdates((prev) => ({ ...prev, [employeeId]: record?.task || "" }));
  };

  const handleSave = async (employeeId) => {
    try {
      const status = statusUpdates[employeeId] || "";
      const task = taskUpdates[employeeId] || "";
      await axios.put(`http://localhost:5000/api/attendance/${employeeId}`, {
        status,
        task,
      });
      console.log("Attendance updated successfully");
      fetchAttendance();
      setEditMode((prev) => ({ ...prev, [employeeId]: false }));
    } catch (error) {
      console.error("Error saving attendance:", error);
    }
  };

  const handleStatusChange = (employeeId, value) => {
    setStatusUpdates((prev) => ({ ...prev, [employeeId]: value }));
  };

  const handleTaskChange = (employeeId, value) => {
    setTaskUpdates((prev) => ({ ...prev, [employeeId]: value }));
  };

  return (
    <div className="attendance-container">
      <h2 className="attendance-header">Attendance Management</h2>
      <table className="attendance-table">
        <thead className="attendance-thead">
          <tr>
            <th>Profile</th>
            <th>Employee Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Status</th>
            <th>Task</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id} className="attendance-row">
              <td>
                <img
                  src={`https://ui-avatars.com/api/?name=${employee.fullName}`}
                  alt="Profile"
                  className="attendance-profile-picture"
                />
              </td>
              <td>{employee.fullName}</td>
              <td>{employee.role}</td>
              <td>{employee.department}</td>
              <td>
                {editMode[employee._id] ? (
                  <select
                    value={statusUpdates[employee._id] || ""}
                    onChange={(e) =>
                      handleStatusChange(employee._id, e.target.value)
                    }
                    className="attendance-select"
                  >
                    <option value="">Select Status</option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Medical Leave">Medical Leave</option>
                    <option value="Work From Home">Work From Home</option>
                  </select>
                ) : (
                  attendanceData.find(
                    (record) => record.employeeId?._id === employee._id
                  )?.status || "N/A"
                )}
              </td>
              <td>
                {editMode[employee._id] ? (
                  <input
                    type="text"
                    placeholder="Assign Task"
                    value={taskUpdates[employee._id] || ""}
                    onChange={(e) =>
                      handleTaskChange(employee._id, e.target.value)
                    }
                    className="attendance-input"
                  />
                ) : (
                  attendanceData.find(
                    (record) => record.employeeId?._id === employee._id
                  )?.task || "N/A"
                )}
              </td>
              <td>
                {editMode[employee._id] ? (
                  <button
                    onClick={() => handleSave(employee._id)}
                    className="attendance-button"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(employee._id)}
                    className="attendance-button"
                  >
                    Update
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceComponent;
