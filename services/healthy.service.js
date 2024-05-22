import axios from "axios";

const apiUrl = "http://192.168.1.9:4000";

export const getBloodPressure = async (id) => {
  const { data: apiRes } = await axios.get(
    `${apiUrl}/v1/healthy/bloodPressure/${id}`
  );
  return apiRes;
};

export const getBMI = async (id) => {
  const { data: apiRes } = await axios.get(
    `${apiUrl}/v1/healthy/bmi/${id}`
  );
  return apiRes;
};


export const getBloodSugar = async (id) => {
  const { data: apiRes } = await axios.get(
    `${apiUrl}/v1/healthy/bloodSugar/${id}`
  );
  return apiRes;
};

export const addBloodPressure = async (payload) => {
  const { data: apiRes } = await axios.post(
    `${apiUrl}/v1/healthy/bloodPressure`,
    payload
  );
  return apiRes;
};

export const addBMI = async (payload) => {
  const { data: apiRes } = await axios.post(
    `${apiUrl}/v1/healthy/bmi`,
    payload
  );
  return apiRes;
};

export const addBloodSugar = async (payload) => {
  const { data: apiRes } = await axios.post(
    `${apiUrl}/v1/healthy/bloodSugar`,
    payload
  );
  return apiRes;
};
