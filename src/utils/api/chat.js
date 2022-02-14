import axios from "./axiosInstance";

const chatApi = {};

chatApi.getNextChatInfo = async ({ userId, memoroomId, chatLastIndex }) => {
  const response = await axios.get(
    `users/${userId}/memorooms/${memoroomId}/chats/${chatLastIndex}`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export default chatApi;
