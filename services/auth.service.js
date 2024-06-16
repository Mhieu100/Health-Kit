import axios from "axios";
// import IP_Address from "../components/util/network"
// const apiUrl = `http://${IP_Address}:4000`;

const apiUrl = `https://4d79-171-225-185-35.ngrok-free.app/api/`


export const login = async (payload) => {
  // const { data: apiRes } = await axios.post(`${apiUrl}/v1/auth/login`, payload);
  const { data: apiRes } = await axios.post(`${apiUrl}login/`, payload); // Nhat
  return apiRes;
};

export const register = async (formData) => {
  // const { data: apiRes } = await axios.post(
  //   `${apiUrl}/v1/auth/register`,
  //   payload
  // );

  const { data: apiRes } = await axios.post(
    `${apiUrl}face-id/register/`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return apiRes;
};

export const editUser = async (id, payload, accessToken) => {
  const { data: apiRes } = await axios.put(`${apiUrl}/v1/user/${id}`, payload, {
    headers: {
      token: `Bearer ${accessToken}`,
    },
  });
  return apiRes;
};
