import axios from "./axiosInstance";

const memoApi = {};

memoApi.getMemoList = async ({ userId, memoroomId }) => {
  const response = await axios.get(`users/${userId}/memorooms/${memoroomId}`);

  return response.data;
};

memoApi.addNewMemo = async (formData) => {
  const author = formData.get("author");
  const memoroomId = formData.get("memoRoomId");

  const response = await axios.post(
    `users/${author}/memorooms/${memoroomId}/memo/`,
    formData,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

memoApi.removeMemo = async ({ userId, memoroomId, memoId }) => {
  const response = await axios.delete(
    `users/${userId}/memorooms/${memoroomId}/memos/${memoId}`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

memoApi.updateMemoText = async ({ userId, memoroomId, memoId, text }) => {
  const response = await axios.put(
    `users/${userId}/memorooms/${memoroomId}/memos/${memoId}/text`,
    {
      text,
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};

memoApi.updateMemoStyle = async ({
  userId,
  memoroomId,
  memoId,
  memoColor,
  alarmDate,
  memoTags,
}) => {
  const response = await axios.put(
    `users/${userId}/memorooms/${memoroomId}/memos/${memoId}/style`,
    {
      memoColor,
      alarmDate,
      memoTags,
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};

memoApi.updateMemoLocation = async ({
  userId,
  memoroomId,
  memoId,
  left,
  top,
}) => {
  const response = await axios.put(
    `users/${userId}/memorooms/${memoroomId}/memos/${memoId}/location`,
    {
      left,
      top,
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};

memoApi.updateMemoSize = async ({
  userId,
  memoroomId,
  memoId,
  width,
  height,
}) => {
  const response = await axios.put(
    `users/${userId}/memorooms/${memoroomId}/memos/${memoId}/size`,
    {
      width,
      height,
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};

memoApi.addAudioFile = async ({ userId, memoroomId, memoId, formData }) => {
  const response = await axios.post(
    `users/${userId}/memorooms/${memoroomId}/memos/${memoId}/sound`,
    formData,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export default memoApi;
