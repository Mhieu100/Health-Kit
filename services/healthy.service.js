import axios from "axios";

// import IP_Address from "../components/util/network"
// const apiUrl = `http://${IP_Address}:4000`;

const apiUrl = `https://66e6-2402-800-6205-efa9-b935-abad-b46a-2efc.ngrok-free.app/api/`

export const getBloodPressure = async (id) => {
  const { data: apiRes } = await axios.get(
    `${apiUrl}bloodpressures/${id}/`
  );
  return apiRes;
};

export const getBMI = async (id) => {
  const { data: apiRes } = await axios.get(
    `${apiUrl}bmis/${id}/`
  );
  return apiRes;
};


export const getBloodSugar = async (id) => {
  const { data: apiRes } = await axios.get(
    `${apiUrl}bloodsugars/${id}/`
  );
  return apiRes;
};

export const addBloodPressure = async (payload) => {
  const { data: apiRes } = await axios.post(
    `${apiUrl}bloodpressures/`,
    payload
  );
  return apiRes;
};

export const addBMI = async (payload) => {
  const { data: apiRes } = await axios.post(
    `${apiUrl}bmis/`,
    payload
  );
  return apiRes;
};

export const addBloodSugar = async (payload) => {
  const { data: apiRes } = await axios.post(
    `${apiUrl}bloodsugars/`,
    payload
  );
  return apiRes;
};
