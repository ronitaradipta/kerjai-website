import React, { useCallback, useContext, useEffect } from "react";
import { Label, TextInput, Button } from "flowbite-react";
import ButtonComp from "../components/ButtonComp";
import { Link, useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import { getDetailJob } from "../services/jobApi";

const DataForm = () => {
  const { stateData, handleFunction } = useContext(GlobalContext);
  const {
    title,
    setTitle,
    description,
    setDescription,
    qualify,
    setQualify,
    type,
    setType,
    tenure,
    setTenure,
    jobStatus,
    setJobStatus,
    company,
    setCompany,
    companyImg,
    setCompanyImg,
    city,
    setCity,
    salaryMin,
    setSalaryMin,
    salaryMax,
    setSalaryMax,
  } = stateData;

  const { handleSubmit, deleteInput } = handleFunction;

  let { idData } = useParams();

  const getDetailList = useCallback(async () => {
    const data = await getDetailJob(idData);
    setTitle(data.title);
    setDescription(data.job_description);
    setQualify(data.job_qualification);
    setType(data.job_type);
    setTenure(data.job_tenure);
    setJobStatus(data.job_status);
    setCompany(data.company_name);
    setCompanyImg(data.company_image_url);
    setCity(data.company_city);
    setSalaryMin(data.salary_min);
    setSalaryMax(data.salary_max);
  }, [
    idData,
    setCity,
    setCompany,
    setCompanyImg,
    setDescription,
    setJobStatus,
    setQualify,
    setSalaryMax,
    setSalaryMin,
    setTenure,
    setTitle,
    setType,
  ]);

  useEffect(() => {
    if (idData !== undefined) {
      getDetailList();
    }
  }, [getDetailList, idData]);

  return (
    <>
      <div className="flex md:w-6/12 justify-between">
        <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
          Input Data
        </h1>
        <Link to="/dashboard/list-job-vacancy" onClick={deleteInput}>
          <ButtonComp text="Kembali" />
        </Link>
      </div>
      <div className="md:w-6/12 mt-6 mb-32">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="lowongan" value="Jenis Lowongan" />
            </div>
            <TextInput
              id="lowongan"
              type="text"
              required={true}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="deskripsi" value="Deskripsi" />
            </div>
            <TextInput
              id="deskripsi"
              type="text"
              value={description}
              required={true}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="kualifikasi" value="Kualifikasi" />
            </div>
            <TextInput
              id="kualifikasi"
              type="text"
              value={qualify}
              required={true}
              onChange={(e) => {
                setQualify(e.target.value);
              }}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="tipe" value="Tipe" />
            </div>
            <TextInput
              id="tipe"
              type="text"
              value={type}
              required={true}
              placeholder="Work From Home / Onsite / Hybrid"
              onChange={(e) => {
                setType(e.target.value);
              }}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="kontrak" value="Kontrak Kerja" />
            </div>
            <TextInput
              id="kontrak"
              type="text"
              value={tenure}
              required={true}
              onChange={(e) => {
                setTenure(e.target.value);
              }}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="status" value="Status Kerja" />
            </div>
            <TextInput
              id="status"
              placeholder="0 : tutup | 1 : Buka"
              type="number"
              value={jobStatus}
              required={true}
              min="0"
              max="1"
              onChange={(e) => {
                setJobStatus(e.target.value);
              }}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="perusahaan" value="Perusahaan" />
            </div>
            <TextInput
              id="perusahaan"
              type="text"
              value={company}
              required={true}
              onChange={(e) => {
                setCompany(e.target.value);
              }}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="logoperusahaan" value="Logo Perusahaan" />
            </div>
            <TextInput
              id="logoperusahaan"
              type="text"
              value={companyImg}
              required={true}
              onChange={(e) => {
                setCompanyImg(e.target.value);
              }}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="kota" value="Kota" />
            </div>
            <TextInput
              id="kota"
              type="text"
              value={city}
              required={true}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="minimal" value="Minimal Gaji" />
            </div>
            <TextInput
              id="minimal"
              type="number"
              value={salaryMin}
              required={true}
              onChange={(e) => {
                setSalaryMin(e.target.value);
              }}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="maximal" value="Maximal Gaji" />
            </div>
            <TextInput
              id="maximal"
              type="number"
              value={salaryMax}
              required={true}
              onChange={(e) => {
                setSalaryMax(e.target.value);
              }}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </>
  );
};

export default DataForm;
