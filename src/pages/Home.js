import React, { useCallback, useContext, useEffect, useState } from "react";
import Search from "../components/Search";
import hero from "../resources/undraw_interview_re_e5jn.svg";
import { MdLocationOn } from "react-icons/md";
import { GrFormNextLink } from "react-icons/gr";
import ButtonComp from "../components/ButtonComp";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import moment from "moment";
import { getJobData } from "../services/jobApi";

const Home = () => {
  const { state, handleFunction } = useContext(GlobalContext);

  const { formatRupiah } = handleFunction;

  const { data, setData } = state;

  const [query, setQuery] = useState("");

  let navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/lowongan/${query}`);
  };

  const getJobsList = useCallback(async () => {
    const data = await getJobData();
    setData(data);
  }, [setData]);

  useEffect(() => {
    getJobsList();
  }, [getJobsList]);

  return (
    <>
      <section>
        <div className="container mx-auto flex flex-col lg:flex-row items-center py-4 md:min-h-[95vh]">
          <div className="lg:w-6/12">
            <h1 className=" lg:text-[64px] text-[32px] font-semibold text-slate-900">
              Cara Mudah <br />
              Mencari Kerja,
              <br /> ya Kerjai Aja!
            </h1>
            <p className="text-slate-500 lg:w-9/12 mt-3 mb-8">
              Temukan berbagai macam kemudahan dalam mencari{" "}
              <span className=" text-slate-700 font-bold">Ribuan </span>
              lowongan pekerjaan dengan segala informasi yang Anda butuhkan.
              Cukup dengan klak klik klak klik!
            </p>
            <Search
              onSubmit={handleSearch}
              onChange={(e) => setQuery(e.target.value.toLowerCase())}
              stx="lg:w-8/12 mb-8"
            />
          </div>
          <div className="lg:w-6/12 hidden md:block ">
            <img src={hero} alt="" />
          </div>
        </div>
      </section>
      <section className="bg-gray-100 py-14">
        <div className="md:w-[880px] mx-auto bg-white rounded-xl p-10 flex justify-center items-center flex-col md:mt-[-150px] shadow-lg">
          <div>
            <h2 className="text-[24px] text-center font-semibold">
              Kategori Pekerjaan <br />
              yang Paling Banyak dicari
            </h2>
          </div>
          <div className="flex flex-wrap justify-center container gap-3 pt-10">
            {data.map((res) => {
              return (
                <div className="bg-gray-100 p-2">
                  <Link to={`/lowongan/${res.title}`}>{res.title}</Link>
                </div>
              );
            })}
          </div>
          <Link to="/lowongan" className="mt-8 underline inline-block">
            Lihat Pekerjaan Lainnya <GrFormNextLink className="inline-block" />
          </Link>
        </div>
        <div className="container mt-11 flex flex-col gap-6 md:flex-row md:justify-center md:gap-20">
          <div className="text-center">
            <h3 className="text-3xl font-semibold">123.456</h3>
            <p className="text-slate-500">Total Pencari Kerja</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-semibold">90.200</h3>
            <p className="text-slate-500">Total Pemberi Kerja</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-semibold">250.000</h3>
            <p className="text-slate-500">Total Lowongan</p>
          </div>
        </div>
      </section>
      <section className="pt-11 pb-32">
        <div className="container">
          <div className="md:flex justify-between items-center">
            <div>
              <h2 className="lg:text-[40px] font-semibold">List Pekerjaan</h2>
              <p className="text-slate-500">
                Temukan pekerjaan impian Anda disini
              </p>
            </div>
            <Link to="/lowongan">
              <ButtonComp text="Selengkapnya" />
            </Link>
          </div>
        </div>
        <div className="container flex mt-10 flex-wrap gap-5">
          {data.slice(0, 4).map((res) => {
            return (
              <Link to={`/detail-job/${res.id}`} key={res.id}>
                <div className="w-72 mb-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 p-6">
                  <div className="flex flex-col justify-between gap-2 mt-4">
                    <img
                      src={res.company_image_url}
                      alt="logo"
                      className="w-14 h-14 mb-3 rounded"
                    />
                    <h5 className="text-md font-semibold text-blue-800 dark:text-white">
                      {res.company_name}
                    </h5>
                    <div className="w-full">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {res.title}
                      </p>
                      <MdLocationOn className="text-slate-600 inline" />
                      <span className="text-sm text-slate-600">
                        {res.company_city}
                      </span>
                      <div className="mt-4">
                        <p className="text-sm">
                          {res.salary_min !== null
                            ? `${formatRupiah(res.salary_min)} - ${formatRupiah(
                                res.salary_max
                              )}`
                            : 0}
                        </p>
                      </div>
                      <hr className="w-full mt-3 mb-2" />
                      <div className="flex justify-between">
                        {res.job_status === 1 ? (
                          <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
                            Open
                          </span>
                        ) : (
                          <span className="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
                            Closed
                          </span>
                        )}
                        <p className="text-sm text-slate-400">
                          {moment(res.created_at).format("DD/MM/YY")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      <section className="flex items-center bg-gray-100 py-32">
        <div className="container">
          <div className="md:flex gap-20">
            <div>
              <h2 className="md:text-[32px] text-[24px] font-semibold ">
                Daftar Perusahaan yang
                <br /> bekerjasama dengan kami
              </h2>
              <p className="text-slate-500 mb-8">
                Kami bekerjasama dengan perusahaan-perusahaan besar
              </p>
            </div>
            <div className="flex flex-wrap gap-5 justify-between md:w-6/12">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png"
                alt="company"
                className="w-32"
              />
              <img
                src="https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2021/10/29/885434810.jpg"
                alt="company"
                className="w-32"
              />
              <img
                src="https://eljohnnews.com/wp-content/uploads/2017/06/airbnb.png"
                alt="company"
                className="w-32"
              />
              <img
                src="https://rec-data.kalibrr.com/www.kalibrr.com/logos/JSXX8ZM2N6AH332RATCQ6RE5RXY6CKBEH47Y3XVV-5d356a17.jpg"
                alt="company"
                className="w-32"
              />
              <img
                src="https://alfamidiku.com/medias/content/content-1526297753.png"
                alt="company"
                className="w-32"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Shopee.svg/1024px-Shopee.svg.png"
                alt="company"
                className="w-32"
              />
              <img
                src="https://media.suara.com/pictures/653x366/2021/07/06/99067-logo-bukalapak.jpg"
                alt="company"
                className="w-32"
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="bg-white dark:bg-gray-800 ">
          <div className="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
            <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
              <span className="block">Sudah siap untuk mendapatkan</span>
              <span className="block text-blue-500">
                pekerjaan impian Anda ?
              </span>
            </h2>
            <p className="text-xl mt-4 max-w-md mx-auto text-gray-400">
              Hubungi kami jika ada pertanyaan.
            </p>
            <div className="lg:mt-0 lg:flex-shrink-0">
              <div className="mt-12 inline-flex rounded-md shadow">
                <button
                  type="button"
                  className="py-4 px-6  bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  Hubungi Kami
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
