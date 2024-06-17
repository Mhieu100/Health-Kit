import axios from "axios";

// import IP_Address from "../components/util/network"
// const apiUrl = `http://${IP_Address}:4000`;
import API_URL from "./../components/util/network";
const apiUrl = API_URL;

export const getBloodPressure = async (id) => {
  const { data: apiRes } = await axios.get(
    `${apiUrl}/api/bloodpressures/${id}/`
  );
  return apiRes;
};

export const getBMI = async (id) => {
  const { data: apiRes } = await axios.get(
    `${apiUrl}/api/bmis/${id}/`
  );
  return apiRes;
};


export const getBloodSugar = async (id) => {
  const { data: apiRes } = await axios.get(
    `${apiUrl}/api/bloodsugars/${id}/`
  );
  return apiRes;
};

export const addBloodPressure = async (payload) => {
  const { data: apiRes } = await axios.post(
    `${apiUrl}/api/bloodpressures/`,
    payload
  );
  return apiRes;
};

export const addBMI = async (payload) => {
  const { data: apiRes } = await axios.post(
    `${apiUrl}/api/bmis/`,
    payload
  );
  return apiRes;
};

export const addBloodSugar = async (payload) => {
  const { data: apiRes } = await axios.post(
    `${apiUrl}/api/bloodsugars/`,
    payload
  );
  return apiRes;
};
