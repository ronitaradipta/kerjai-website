import Cookies from "js-cookie";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import ButtonComp from "../components/ButtonComp";

const ProfileUser = () => {
  const user = JSON.parse(Cookies.get("user"));

  return (
    <>
      <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
        {user.user.name}
      </h1>
      <h2 className="text-md text-gray-400">{user.user.email}</h2>
      <div className="bg-white mt-24 min-h-[300px] flex-col items-center p-8 md:p-10 md:w-6/12">
        {user.user.img_url === null ? (
          <img src={user.user.img_url} alt="profile" />
        ) : (
          <FaUserCircle className="text-[64px] text-slate-600" />
        )}
        <div className="flex flex-col gap-5 mb-10">
          <div>
            <h3>Nama Lengkap</h3>
            <p className="font-bold text-[32px]">{user.user.name}</p>
          </div>
          <div>
            <h3>Email</h3>
            <p className="ont-bold text-[20px]">{user.user.email}</p>
          </div>
        </div>
        <Link to="/dashboard/change-password">
          <ButtonComp text="Ganti Password" />
        </Link>
      </div>
    </>
  );
};

export default ProfileUser;
