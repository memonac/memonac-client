import axios from "./axiosInstance";

const memoApi = {};

memoApi.getMemoList = async (userId, memoRoomId) => {
  const response = await axios.get(`users/${userId}/memorooms/${memoRoomId}`);

  return response.data;
};

export default memoApi;
