import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="p-4 bg-blue-500 shadow md:px-6 md:py-8 dark:bg-gray-900">
      <div className="sm:flex sm:items-center sm:justify-between">
        <Link to="/">
          <h2 className="text-3xl font-bold text-white">Kerjai</h2>
        </Link>
        <ul className="flex flex-wrap items-center mb-6 text-sm text-white sm:mb-0 dark:text-gray-400">
          <li>
            <Link to="/" className="mr-4 hover:underline md:mr-6 ">
              Beranda
            </Link>
          </li>
          <li>
            <Link to="/lowongan" className="mr-4 hover:underline md:mr-6">
              Lowongan
            </Link>
          </li>
          <li>
            <Link to="/login" className="mr-4 hover:underline md:mr-6 ">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </li>
        </ul>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <span className="block text-sm text-white sm:text-center dark:text-gray-400">
        © 2022{" "}
        <Link to="https://flowbite.com/" className="hover:underline">
          Kerjai
        </Link>
        . All Rights Reserved.
      </span>
    </footer>
  );
};

export default Footer;
