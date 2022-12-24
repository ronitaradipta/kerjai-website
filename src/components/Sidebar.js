import React from "react";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineDashboard, MdBackupTable } from "react-icons/md";
import { CgProfile, CgPassword } from "react-icons/cg";

const Sidebar = ({ toggle }) => {
  let toggleActive = "h-screen hidden lg:block shadow-lg relative w-80";
  let toggleInActive = "h-screen lg:block shadow-lg relative w-80";
  let classActive =
    "w-full text-gray-800 dark:text-white flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start border-l-4 border-blue-500";

  let classInactive =
    "w-full text-gray-400 flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start hover:text-gray-800 border-l-4 border-transparent";
  return (
    <div className={toggle === true ? toggleActive : toggleInActive}>
      <div className="bg-white h-full dark:bg-gray-700">
        <div className="flex items-center justify-start pt-6 ml-8">
          <Link to="/">
            <p className="font-bold dark:text-white text-xl">Kerjai</p>
          </Link>
        </div>
        <nav className="mt-6">
          <div>
            <NavLink
              end
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? classActive : classInactive
              }
            >
              <span className="text-left">
                <MdOutlineDashboard className="text-xl" />
              </span>
              <span className="mx-2 text-sm font-normal">Dashboard</span>
            </NavLink>
            <NavLink
              to="/dashboard/list-job-vacancy"
              className={({ isActive }) =>
                isActive ? classActive : classInactive
              }
            >
              <span className="text-left">
                <MdBackupTable className="text-xl" />
              </span>
              <span className="mx-2 text-sm font-normal">List Data</span>
            </NavLink>
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                isActive ? classActive : classInactive
              }
            >
              <span className="text-left">
                <CgProfile className="text-xl" />
              </span>
              <span className="mx-4 text-sm font-normal">Profile</span>
            </NavLink>
            <NavLink
              to="/dashboard/change-password"
              className={({ isActive }) =>
                isActive ? classActive : classInactive
              }
            >
              <span className="text-left">
                <CgPassword className="text-xl" />
              </span>
              <span className="mx-4 text-sm font-normal">Ganti Password</span>
            </NavLink>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
