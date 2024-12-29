import React from "react";

const Sidebar = ({ setActiveTab }) => {
  return (
    <div className="sidebar">
      <div className="section">
        <h3 className="section-heading">Recruitment</h3>
        <ul>
          <li onClick={() => setActiveTab("candidate")}>
            <span className="icon">👥</span> Candidate
          </li>
        </ul>
      </div>

      <div className="section">
        <h3 className="section-heading">Organization</h3>
        <ul>
          <li onClick={() => setActiveTab("employee")}>
            <span className="icon">🏢</span> Employees
          </li>
          <li onClick={() => setActiveTab("attendance")}>
            <span className="icon">📅</span> Attendance
          </li>
          <li onClick={() => setActiveTab("leaves")}>
            <span className="icon">🌴</span> Leaves
          </li>
        </ul>
      </div>

      <div className="section">
        <h3 className="section-heading">Other</h3>
        <ul>
          <li onClick={() => setActiveTab("logout")}>
            <span className="icon">🚪</span> Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
