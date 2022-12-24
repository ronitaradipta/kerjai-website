import Cookies from "js-cookie";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/auth";
import {
  changePassword,
  deletePost,
  editPost,
  getJobData,
  submitPost,
} from "../services/jobApi";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  let navigate = useNavigate();
  // State
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [pesan, setPesan] = useState(undefined);
  const [fetchStatus, setFetchStatus] = useState(true);
  const [currentID, setCurrentId] = useState(-1);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState({
    company_city: "",
    job_type: "",
    title: "",
  });

  // change password
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confNewPass, setConfNewPass] = useState("");

  let state = {
    data,
    setData,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    image_url,
    setImageUrl,
    pesan,
    setPesan,
    fetchStatus,
    setFetchStatus,
    currentID,
    setCurrentId,
    oldPass,
    setOldPass,
    newPass,
    setNewPass,
    confNewPass,
    setConfNewPass,
    query,
    setQuery,
    filter,
    setFilter,
  };

  // state DataForm
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [qualify, setQualify] = useState("");
  const [type, setType] = useState("");
  const [tenure, setTenure] = useState("");
  const [jobStatus, setJobStatus] = useState("");
  const [company, setCompany] = useState("");
  const [companyImg, setCompanyImg] = useState("");
  const [city, setCity] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");

  let stateData = {
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
  };

  // Handle Auth
  const handleRegister = (event) => {
    event.preventDefault();
    try {
      registerUser(name, email, password, image_url);
      navigate("/login");
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) {
        setPesan("Masukkan data yang valid!");
      }
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();

    loginUser(email, password)
      .then((res) => {
        let { token } = res.data;
        Cookies.set("token", token, { expires: 1 });
        Cookies.set("user", JSON.stringify(res.data), { expires: 1 });
        navigate("/dashboard");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setPesan("Email atau password salah!");
          alert(pesan);
        }
      });
  };

  const deleteInput = () => {
    setTitle("");
    setDescription("");
    setQualify("");
    setType("");
    setTenure("");
    setJobStatus("");
    setCompany("");
    setCompanyImg("");
    setCity("");
    setSalaryMin("");
    setSalaryMax("");
  };

  const handleLogOut = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    navigate("/login");
  };

  // Handle Data Form
  const handleSubmit = (event) => {
    event.preventDefault();

    if (currentID === -1) {
      submitPost(
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
      );
      try {
        setFetchStatus(true);
        navigate("/dashboard/list-job-vacancy");
      } catch (err) {
        console.log(err);
      }
    } else {
      editPost(
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
      );
      try {
        setFetchStatus(true);
        navigate("/dashboard/list-job-vacancy");
      } catch (err) {
        console.log(err);
      }
    }
    setCurrentId(-1);

    // Hapus inputan
    deleteInput();
  };

  const handleDelete = (event) => {
    let idData = parseInt(event.target.value);

    deletePost(idData).then((res) => {
      if (window.confirm("Apakah yakin Menghapus Data?")) {
        setFetchStatus(true);
      }
    });
  };

  const handleEdit = (event) => {
    let idData = parseInt(event.target.value);
    setCurrentId(idData);

    navigate(`/dashboard/list-job-vacancy/edit/${idData}`);
  };

  const handleChangePassword = (event) => {
    event.preventDefault();

    changePassword(oldPass, newPass, confNewPass)
      .then(() => {
        navigate("/dashboard");
      })
      .catch((err) => {
        alert("Periksa lagi password yang Anda input!");
        console.log(err);
      });
  };

  const handleFilter = (event) => {
    event.preventDefault();

    let fetchData = async () => {
      let dataJob = await getJobData();

      let filterData = dataJob.filter((res) => {
        return (
          res.company_city === filter.company_city ||
          res.title === filter.title ||
          res.job_type === filter.job_type
        );
      });

      setData(filterData);
    };

    fetchData();
    // setFilter({ company_city: "", job_type: "", title: "" });
  };

  const handleChangeFilter = (event) => {
    setFilter({ ...filter, [event.target.name]: event.target.value });
  };

  const search = (item) => {
    if (query !== undefined) {
      return item.filter((thing) =>
        Object.values(thing)
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase())
      );
    }
  };

  const handleReset = () => {
    let fetchData = async () => {
      let dataJob = await getJobData();
      setData(dataJob);
    };
    fetchData();
    setQuery("");
    setFilter({ company_city: "", job_type: "", title: "" });
  };

  // Function Convert to Rupiah
  const formatRupiah = (bilangan) => {
    let number_string = bilangan.toString(),
      sisa = number_string.length % 3,
      rupiah = number_string.substr(0, sisa),
      ribuan = number_string.substr(sisa).match(/\d{3}/g);

    if (ribuan) {
      let separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    return "Rp. " + rupiah;
  };

  let handleFunction = {
    handleRegister,
    handleLogin,
    handleSubmit,
    handleDelete,
    formatRupiah,
    handleEdit,
    deleteInput,
    handleChangePassword,
    handleLogOut,
    handleFilter,
    handleChangeFilter,
    search,
    handleReset,
  };

  return (
    <GlobalContext.Provider
      value={{
        state,
        handleFunction,
        stateData,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
