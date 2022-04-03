import axios from "./axiosInstance";

const mainApi = {};

mainApi.getMemoRoomList = async (userId) => {
  const response = await axios.get(`/users/${userId}/memorooms/`);

  return response.data;
};

mainApi.postNewMemoRoom = async ({ userId, name }) => {
  const response = await axios.post(`/users/${userId}/memorooms/`, {
    name,
  });

  return response.data;
};

mainApi.putMemoRoomTitle = async ({ userId, memoRoomId, name }) => {
  const response = await axios.put(`/users/${userId}/memorooms/${memoRoomId}`, {
    memoRoomId,
    name,
  });

  return response.data;
};

mainApi.deleteMemoRoomTitle = async ({ userId, memoRoomId }) => {
  const response = await axios.delete(
    `/users/${userId}/memorooms/${memoRoomId}`,
    {
      memoRoomId,
    }
  );

  return response.data;
};

export default mainApi;
