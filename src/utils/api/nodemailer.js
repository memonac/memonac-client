import axios from "./axiosInstance";

const nodemailerApi = {};

nodemailerApi.postSendMail = async ({ userId, memoroomId, email }) => {
  const response = await axios.post(
    `/users/${userId}/memorooms/${memoroomId}/invite`,
    {
      email,
    },
    {
      withCredential: true,
    }
  );

  return response.data;
};

nodemailerApi.postVerifyToken = async ({ memoroomId, token }) => {
  const response = await axios.post(
    `users/${memoroomId}/invite`,
    {
      token,
    },
    {
      withCredential: true,
    }
  );

  return response.data;
};

export default nodemailerApi;
