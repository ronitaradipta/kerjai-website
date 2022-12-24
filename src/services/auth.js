import axios from "axios";

export async function registerUser(name, email, password, image_url) {
  const ROOT_API = process.env.REACT_APP_API_ENDPOINT;
  const URL = "register";

  const response = await axios.post(`${ROOT_API}/${URL}`, {
    name,
    email,
    password,
    image_url,
  });
  return response;
}

export async function loginUser(email, password) {
  const ROOT_API = process.env.REACT_APP_API_ENDPOINT;
  const URL = "login";
  const response = await axios.post(`${ROOT_API}/${URL}`, {
    email,
    password,
  });
  return response;
}
