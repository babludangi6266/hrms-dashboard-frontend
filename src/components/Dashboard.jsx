
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Candidate from "./Candidates";
import Employee from "./Employees";
import Attendance from "./Attendance";
import Leaves from "./Leaves";
import Logout from "./Logout";
import "./../styles/Dashboard.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("candidate");

  const renderContent = () => {
    switch (activeTab) {
      case "candidate":
        return <Candidate />;
      case "employee":
        return <Employee />;
      case "attendance":
        return <Attendance />;
      case "leaves":
        return <Leaves />;
      case "logout":
        return <Logout />;
      default:
        return <Candidate />;
    }
  };

  return (
    <div className="dashboard">
      <Sidebar setActiveTab={setActiveTab} />
      <div className="content1">{renderContent()}</div>
    </div>
  );
};

export default Dashboard;
