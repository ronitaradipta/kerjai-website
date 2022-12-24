import Cookies from "js-cookie";
import React from "react";
import { MdBackupTable } from "react-icons/md";
import { CgProfile, CgPassword } from "react-icons/cg";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const user = JSON.parse(Cookies.get("user"));
  return (
    <>
      <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
        Selamat datang {user.user.name}.
      </h1>
      <p className="mt-5">
        Ini merupakan halaman dashboard. Silahkan manfaatkan fitur-fitur yang
        tersedia di sini.
      </p>
      <div className="sm:flex flex-wrap items-stretch text-center gap-8 mt-10">
        <Link
          to="/dashboard/list-job-vacancy"
          className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-4 py-4 bg-white mt-6  shadow-lg rounded-lg dark:bg-gray-800"
        >
          <div className="flex-shrink-0">
            <div className="flex items-center mx-auto justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
              <MdBackupTable className="text-2xl" />
            </div>
          </div>
          <h3 className="text-2xl sm:text-xl text-gray-700 font-semibold dark:text-white py-4">
            List Data
          </h3>
          <p className="text-md  text-gray-500 dark:text-gray-300 py-4">
            List data lowongan pekerjaan. Anda juga bisa memposting lowongan
          </p>
        </Link>
        <Link
          to="/dashboard/profile"
          className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-4 py-4 mt-6 bg-white shadow-lg rounded-lg dark:bg-gray-800"
        >
          <div className="flex-shrink-0">
            <div className="flex items-center mx-auto justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
              <CgProfile className="text-2xl" />
            </div>
          </div>
          <h3 className="text-2xl sm:text-xl text-gray-700 font-semibold dark:text-white py-4">
            Profile
          </h3>
          <p className="text-md text-gray-500 dark:text-gray-300 py-4">
            Lihat detail profile anda, dan pengaturan akun.
          </p>
        </Link>
        <Link
          to="/dashboard/change-password"
          className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 mt-6  px-4 py-4 bg-white shadow-lg rounded-lg dark:bg-gray-800"
        >
          <div className="flex-shrink-0">
            <div className="flex items-center mx-auto justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
              <CgPassword className="text-3xl" />
            </div>
          </div>
          <h3 className="text-2xl sm:text-xl text-gray-700 font-semibold dark:text-white py-4">
            Ganti Password
          </h3>
          <p className="text-md  text-gray-500 dark:text-gray-300 py-4">
            Ganti password Anda, jika Anda tidak suka yang lama.
          </p>
        </Link>
      </div>
    </>
  );
};

export default Dashboard;
