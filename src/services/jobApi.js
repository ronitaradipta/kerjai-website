import axios from "axios";
import Cookies from "js-cookie";

export async function getJobData() {
  const ROOT_API = process.env.REACT_APP_API_ENDPOINT;
  const URL = "job-vacancy";

  const response = await axios.get(`${ROOT_API}/${URL}`);
  const axiosResponse = response.data;

  return axiosResponse.data;
}

export async function getDetailJob(id) {
  const ROOT_API = process.env.REACT_APP_API_ENDPOINT;
  const URL = "job-vacancy";

  const response = await axios.get(`${ROOT_API}/${URL}/${id}`);
  return response.data;
}

export async function submitPost(
  title,
  description,
  qualify,
  type,
  tenure,
  jobStatus,
  company,
  companyImg,
  city,
  salaryMin,
  salaryMax
) {
  const ROOT_API = process.env.REACT_APP_API_ENDPOINT;
  const URL = "job-vacancy";

  const response = await axios.post(
    `${ROOT_API}/${URL}`,
    {
      title,
      job_description: description,
      job_qualification: qualify,
      job_type: type,
      job_tenure: tenure,
      job_status: jobStatus,
      company_name: company,
      company_image_url: companyImg,
      company_city: city,
      salary_min: salaryMin,
      salary_max: salaryMax,
    },
    { headers: { Authorization: "Bearer " + Cookies.get("token") } }
  );

  return response;
}

export async function editPost(
  currentID,
  title,
  description,
  qualify,
  type,
  tenure,
  jobStatus,
  company,
  companyImg,
  city,
  salaryMin,
  salaryMax
) {
  const ROOT_API = process.env.REACT_APP_API_ENDPOINT;
  const URL = "job-vacancy";

  const response = await axios.put(
    `${ROOT_API}/${URL}/${currentID}`,
    {
      title,
      job_description: description,
      job_qualification: qualify,
      job_type: type,
      job_tenure: tenure,
      job_status: jobStatus,
      company_name: company,
      company_image_url: companyImg,
      company_city: city,
      salary_min: salaryMin,
      salary_max: salaryMax,
    },
    { headers: { Authorization: "Bearer " + Cookies.get("token") } }
  );

  return response;
}

export async function deletePost(idData) {
  const ROOT_API = process.env.REACT_APP_API_ENDPOINT;
  const URL = "job-vacancy";

  const response = await axios.delete(`${ROOT_API}/${URL}/${idData}`, {
    headers: { Authorization: "Bearer " + Cookies.get("token") },
  });

  return response;
}

export async function changePassword(oldPass, newPass, confNewPass) {
  const ROOT_API = process.env.REACT_APP_API_ENDPOINT;
  const URL = "change-password";

  const response = await axios.post(
    `${ROOT_API}/${URL}`,
    {
      current_password: oldPass,
      new_password: newPass,
      new_confirm_password: confNewPass,
    },
    { headers: { Authorization: "Bearer " + Cookies.get("token") } }
  );

  return response;
}
