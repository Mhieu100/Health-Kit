import axios from "axios";
import IP_Address from "../components/util/network"
const apiUrl = `http://${IP_Address}:4000`;

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