import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailJob } from "../services/jobApi";

const DetailJob = () => {
  const [detail, setDetail] = useState([]);

  const { idData } = useParams();

  const getDetailList = useCallback(async () => {
    const data = await getDetailJob(idData);
    setDetail(data);
  }, [setDetail, idData]);

  useEffect(() => {
    getDetailList();
  }, [getDetailList]);

  return (
    <div className="container border-2 border-slate-200 shadow-lg mt-24 mb-24 p-10">
      <img src={detail.company_image_url} alt="company" className="w-64" />
      <h1 className="text-4xl font-bold text-blue-800 mt-5">
        {detail.company_name}
      </h1>
      <h2 className="text-lg font-semibold mt-3">Posisi : {detail.title}</h2>
      <p className="text-slate-500 mt-3">{detail.job_description}</p>
      <h3 className="mt-5 text-slate-500">
        <strong>Kualifikasi :</strong> {detail.job_qualification}
      </h3>
      <h3 className="mt-4 text-slate-500">
        <strong>Masa Jabatan :</strong> {detail.job_type}
      </h3>
      <h3 className="mt-4 text-slate-500">
        <strong>Tipe :</strong> {detail.job_tenure}
      </h3>
      <h3 className="mt-4 text-slate-500 mb-5">
        <strong>Rentang Gaji : </strong>
        {detail.salary_min} - {detail.salary_max}
      </h3>
      {detail.job_status === 1 ? (
        <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
          Open
        </span>
      ) : (
        <span className="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
          Closed
        </span>
      )}
    </div>
  );
};

export default DetailJob;
