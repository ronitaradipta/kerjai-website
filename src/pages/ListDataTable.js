import React, { useCallback, useContext, useEffect } from "react";
import { Table } from "flowbite-react";
import ButtonComp from "../components/ButtonComp";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import Search from "../components/Search";
import { getJobData } from "../services/jobApi";

const ListDataTable = () => {
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
    handleDelete,
    handleEdit,
    handleFilter,
    handleChangeFilter,
    search,
    handleReset,
  } = handleFunction;

  const getJobsList = useCallback(async () => {
    const data = await getJobData();
    setData(data);
  }, [setData]);

  useEffect(() => {
    if (fetchStatus === true) {
      getJobsList();
      setFetchStatus(false);
    }
  }, [setData, setFetchStatus, fetchStatus, setQuery, getJobsList]);

  return (
    <>
      <div className="flex justify-between mb-5">
        <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
          List Data
        </h1>
        <Link to="/dashboard/list-job-vacancy/form">
          <ButtonComp text="Input Data" />
        </Link>
      </div>
      <div className="md:flex gap-10">
        <Search
          value={query}
          onChange={(e) => {
            setQuery(e.target.value.toLowerCase());
          }}
          onSubmit={(e) => e.preventDefault()}
          stx="lg:w-6/12 mb-8"
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

      <div className="pt-1 pb-24 md:w-[1080px]">
        <Table className="overflow-y-auto">
          <Table.Head className="bg-blue-400">
            <Table.HeadCell className="text-white">
              <span className="sr-only">Action</span>
            </Table.HeadCell>
            <Table.HeadCell className="text-white text-ellipsis">
              Lowongan
            </Table.HeadCell>
            <Table.HeadCell className="text-white">Deskripsi</Table.HeadCell>
            <Table.HeadCell className="text-white">Kualifikasi</Table.HeadCell>
            <Table.HeadCell className="text-white">
              Kontrak Kerja
            </Table.HeadCell>
            <Table.HeadCell className="text-white">Tipe</Table.HeadCell>
            <Table.HeadCell className="text-white">Status</Table.HeadCell>
            <Table.HeadCell className="text-white">Perusahaan</Table.HeadCell>
            <Table.HeadCell className="text-white">Logo</Table.HeadCell>
            <Table.HeadCell className="text-white">Kota</Table.HeadCell>
            <Table.HeadCell className="text-white">Gaji</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {search(data).map((res) => {
              return (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={res.id}
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <button
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500 mr-2 inline-block "
                      value={res.id}
                      onClick={handleEdit}
                    >
                      Edit
                    </button>
                    <button
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500 ml-2 inline-block"
                      value={res.id}
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </Table.Cell>
                  <Table.Cell>{res.title}</Table.Cell>
                  <Table.Cell>
                    {res.job_description !== null
                      ? `${res.job_description.substring(0, 20)}...`
                      : 0}
                  </Table.Cell>
                  <Table.Cell>
                    {res.job_qualification !== null
                      ? `${res.job_qualification.substring(0, 20)}...`
                      : 0}
                  </Table.Cell>
                  <Table.Cell>{res.job_type}</Table.Cell>
                  <Table.Cell>{res.job_tenure}</Table.Cell>
                  <Table.Cell>
                    {res.job_status === 0 ? "Closed" : "Open"}
                  </Table.Cell>
                  <Table.Cell>{res.company_name}</Table.Cell>
                  <Table.Cell>
                    <img src={res.company_image_url} alt="logo-company" />
                  </Table.Cell>
                  <Table.Cell>{res.company_city}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {res.salary_min !== null
                      ? `${formatRupiah(res.salary_min)} - ${formatRupiah(
                          res.salary_max
                        )}`
                      : 0}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};

export default ListDataTable;
