import React, { useContext } from "react";
import hero from "../resources/undraw_interview_re_e5jn.svg";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const Register = () => {
  const { state, handleFunction } = useContext(GlobalContext);

  const { setName, setEmail, setPassword, setImageUrl } = state;

  const { handleRegister } = handleFunction;

  return (
    <div className="container mx-auto flex justify-center items-center gap-11 min-h-[100vh]">
      <div className="w-6/12 hidden lg:block">
        <img src={hero} alt="" />
      </div>

      <div className="p-4 lg:w-5/12 w-[90%] bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" onSubmit={handleRegister}>
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Daftar Akun
          </h5>
          <div>
            <label
              htmlFor="nama"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Nama Anda
            </label>
            <input
              type="text"
              name="nama"
              id="nama"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required={true}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Email Anda
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@gmail.com"
              required={true}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              min="8"
              placeholder="minimal 8 karakter"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required={true}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Link Gambar (opsional)
            </label>
            <input
              type="text"
              name="image"
              id="image"
              placeholder="link gambar"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              onChange={(e) => {
                setImageUrl(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Daftar
          </button>
        </form>
        <Link to="/" className="flex items-center gap-3 mt-2">
          <span>
            <BsArrowLeft className="text-slate-500" />
          </span>
          <span className="text-slate-500">Kembali ke Beranda</span>
        </Link>
      </div>
    </div>
  );
};

export default Register;
