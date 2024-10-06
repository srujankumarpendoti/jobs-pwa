import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Jobs");

  const jobTabColor = activeTab === "Jobs" ? "active-color" : "";
  const bookmarkTabColor = activeTab === "Bookmarks" ? "active-color" : "";

  return (
    <nav className="navbar fixed-bottom nav-container">
      <Link
        onClick={() => setActiveTab("Jobs")}
        className={`navbar-brand nav-jobs `}
        to="/"
      >
        <h5 className={`${jobTabColor}`}>Jobs</h5>
      </Link>
      <Link
        onClick={() => setActiveTab("Bookmarks")}
        className={`navbar-brand nav-booksmarks `}
        to="/bookmarks"
      >
        <h5 className={`${bookmarkTabColor}`}>Bookmarks</h5>
      </Link>
    </nav>
  );
};

export default Navbar;
