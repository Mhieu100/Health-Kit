import axios from "axios";

const apiUrl = "http://192.168.1.9:4000";

export const login = async (payload) => {
  const { data: apiRes } = await axios.post(`${apiUrl}/v1/auth/login`, payload);
  console.log(apiRes);
  return apiRes;
};

export const register = async (payload) => {
  const { data: apiRes } = await axios.post(
    `${apiUrl}/v1/auth/register`,
    payload
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
