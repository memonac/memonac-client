import axios from "./axiosInstance";

const memoApi = {};

memoApi.getMemoList = async ({ userId, memoroomId }) => {
  const response = await axios.get(`users/${userId}/memorooms/${memoroomId}`);

  return response.data;
};

memoApi.addNewMemo = async ({
  memoRoomId,
  alarmDate,
  alarmTime,
  author,
  imageFile,
  memoColor,
  memoTags,
  memoType,
}) => {
  const response = await axios.post(
    `users/${author}/memorooms/${memoRoomId}/memo/`,
    {
      alarmDateInfo: new Date(`${alarmDate} ${alarmTime}`),
      imageFile,
      memoColor,
      memoTags,
      memoType,
    },
    {
      withCredentials: true,
    }
  );
};

export default memoApi;
