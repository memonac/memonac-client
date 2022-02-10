import axios from "./axiosInstance";

const memoApi = {};

memoApi.getMemoList = async ({ userId, memoroomId }) => {
  const response = await axios.get(`users/${userId}/memorooms/${memoroomId}`);

  return response.data;
};

export default memoApi;
