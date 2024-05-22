import axios from "axios";

const apiUrl = "http://192.168.1.9:4000";

export const getAllPost = async () => {
    const { data: apiRes } = await axios.get(
      `${apiUrl}/v1/post`
    );
    return apiRes;
  };

  export const getPost = async (id) => {
    const { data: apiRes } = await axios.get(
      `${apiUrl}/v1/post/${id}`
    );
    return apiRes;
  };