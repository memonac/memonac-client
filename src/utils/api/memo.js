import axios from "./axiosInstance";

const memoApi = {};

memoApi.getMemoList = async (userId, memoRoomId) => {
  const response = await axios.get(`/users/${userId}/memorooms/${memoRoomId}`);

  console.log(response.data);

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

  console.log(new Date(`${alarmDate} ${alarmTime}`));

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

  return response.data;
};

export default memoApi;
