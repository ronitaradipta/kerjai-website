import { Dropdown } from "flowbite-react";
import Cookies from "js-cookie";
import React, { useContext, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { GlobalContext } from "../context/GlobalContext";

const LayoutDashboard = (props) => {
  const user = JSON.parse(Cookies.get("user"));

  const { handleFunction } = useContext(GlobalContext);

  const { handleLogOut } = handleFunction;

  const [toggle, setToggle] = useState(true);

  const handleToggle = () => {
    if (toggle === false) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  };

  return (
    <main className="bg-gray-100 dark:bg-gray-800 h-screen overflow-hidden relative">
      <div className="flex items-start justify-between">
        <Sidebar toggle={toggle} />
        <div className="flex flex-col w-full md:space-y-4">
          <header className="w-full h-16 z-40 flex items-center justify-between">
            <div className="block lg:hidden ml-6">
              <button
                className="flex p-2 items-center rounded-full bg-white shadow text-gray-500 text-md"
                onClick={handleToggle}
              >
                <svg
                  width="20"
                  height="20"
                  className="text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
                </svg>
              </button>
            </div>
            <div className="relative z-20 flex flex-col justify-end h-full px-3 md:w-full">
              <div className="relative p-1 flex items-center w-full space-x-4 justify-end">
                <span className="w-1 h-8 rounded-lg bg-gray-200"></span>
                <Link to="/dashboard/profile" className="block relative">
                  {user.user.img_url === null ? (
                    <img
                      src={user.user.img_url}
                      alt="profile"
                      className="mx-auto object-cover rounded-full h-10 w-10 "
                    />
                  ) : (
                    <FaUserCircle className="text-[32px] text-slate-600" />
                  )}
                </Link>
                <Dropdown color="transparrent" label={user.user.name}>
                  <Link to="/dashboard/profile">
                    <Dropdown.Item>Profile</Dropdown.Item>
                  </Link>
                  <Link to="/" onClick={handleLogOut}>
                    <Dropdown.Item>Log Out</Dropdown.Item>
                  </Link>
                </Dropdown>
              </div>
            </div>
          </header>
          <div className="overflow-auto h-screen pt-4 pb-24 px-4 md:px-20">
            {props.children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default LayoutDashboard;
