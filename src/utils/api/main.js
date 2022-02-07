import axios from "./axiosInstance";

const mainApi = {};

mainApi.getMemoRoomList = async (userId) => {
  const response = await axios.get(`/users/${userId}/memorooms/`, {
    withCredentials: true,
  });

  return response.data;
};

mainApi.postNewMemoRoom = async ({ userId, name }) => {
  const response = await axios.post(
    `/users/${userId}/memorooms`,
    {
      name,
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export default mainApi;
