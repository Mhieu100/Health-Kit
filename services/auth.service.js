import axios from "axios";
// import IP_Address from "../components/util/network"
// const apiUrl = `http://${IP_Address}:4000`;
import API_URL from './../components/util/network';
const apiUrl = API_URL;


export const login = async (payload) => {
  // const { data: apiRes } = await axios.post(`${apiUrl}/v1/auth/login`, payload);
  const { data: apiRes } = await axios.post(`${apiUrl}/api/login/`, payload); // Nhat
  return apiRes;
};

export const register = async (formData) => {
  // const { data: apiRes } = await axios.post(
  //   `${apiUrl}/v1/auth/register`,
  //   payload
  // );

  const { data: apiRes } = await axios.post(
    `${apiUrl}/api/face-id/register/`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return apiRes;
};

export const editUser = async (id, payload) => {
  const { data: apiRes } = await axios.patch(
    `${apiUrl}/api/users/${id}/update-user/`,
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return apiRes;
};
