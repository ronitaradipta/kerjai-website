import React, { useCallback, useContext, useEffect } from "react";
import { MdLocationOn } from "react-icons/md";
import Search from "../components/Search";
import { GlobalContext } from "../context/GlobalContext";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { getJobData } from "../services/jobApi";

const Lowongan = () => {
  const { state, handleFunction } = useContext(GlobalContext);

  const {
    data,
    setData,
    query,
    setQuery,
    setFetchStatus,
    fetchStatus,
    filter,
  } = state;

  const {
    formatRupiah,
    handleFilter,
    handleChangeFilter,
    search,
    handleReset,
  } = handleFunction;

  let { jobtitle } = useParams();

  const getJobsList = useCallback(async () => {
    const data = await getJobData();
    setData(data);
  }, [setData]);

  useEffect(() => {
    if (fetchStatus === true) {
      getJobsList();
      setFetchStatus(false);
    }

    if (jobtitle !== undefined) {
      setQuery(jobtitle.toLowerCase());
    }
  }, [setData, jobtitle, setQuery, setFetchStatus, fetchStatus, getJobsList]);

  return (
    <>
      <div className="container flex md:flex-row flex-col md:mt-32 mt-10 md:gap-24 gap-4">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
          Lowongan Pekerjaan
        </h1>
        <div className="w-full flex md:flex-row flex-col gap-4 md:items-center">
          <Search
            value={query}
            onChange={(e) => {
              setQuery(e.target.value.toLowerCase());
            }}
            onSubmit={(e) => {
              e.preventDefault();
            }}
            stx="md:w-6/12"
          />

          <div className="md:w-6/12">
            <form
              className="flex md:flex-row flex-col gap-4"
              onSubmit={handleFilter}
            >
              <div>
                <input
                  name="company_city"
                  type="text"
                  id="kota"
                  placeholder="kota"
                  value={filter.company_city}
                  onChange={handleChangeFilter}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <input
                  name="job_type"
                  type="text"
                  id="tipejob"
                  placeholder="tipe job"
                  value={filter.job_type}
                  onChange={handleChangeFilter}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <input
                  name="title"
                  type="text"
                  id="kota"
                  placeholder="posisi"
                  value={filter.title}
                  onChange={handleChangeFilter}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Filter
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Reset
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="container flex mt-5 flex-wrap gap-5 pb-36">
        {search(data).map((res) => {
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
    </>
  );
};

export default Lowongan;
